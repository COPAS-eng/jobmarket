import { Request, Response } from 'express';
import Stripe from 'stripe';
import prisma from '@/repositories/prisma';
import { env } from '@/config/env';
import { NotFoundError, ForbiddenError, InternalError } from '@/utils/errors';

const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

export const stripeController = {
  async authorizeConnect(req: Request, res: Response) {
    const userId = req.user!.sub;
    
    const url = stripe.oauth.authorizeUrl({
      client_id: env.STRIPE_CONNECT_CLIENT_ID!,
      response_type: 'code',
      scope: 'read_write',
      redirect_url: `${env.FRONTEND_URL}/dashboard/stripe/callback`,
      state: userId,
    });
    
    res.json({ success: true, data: { url } });
  },
  
  async connectCallback(req: Request, res: Response) {
    const { code, state, error } = req.query;
    
    if (error) {
      return res.redirect(`${env.FRONTEND_URL}/dashboard/stripe/callback?error=${error}`);
    }
    
    if (!code || !state) {
      return res.redirect(`${env.FRONTEND_URL}/dashboard/stripe/callback?error=missing_params`);
    }
    
    try {
      const response = await stripe.oauth.token({
        grant_type: 'authorization_code',
        code: code as string,
      });
      
      const userId = state as string;
      const { stripe_user_id: stripeAccountId, access_token: accessToken, refresh_token: refreshToken } = response;
      
      await prisma.user.update({
        where: { id: userId },
        data: { stripeAccountId },
      });
      
      // Create account link for onboarding
      const accountLink = await stripe.accountLinks.create({
        account: stripeAccountId,
        refresh_url: `${env.FRONTEND_URL}/dashboard/stripe/refresh`,
        return_url: `${env.FRONTEND_URL}/dashboard/stripe/return`,
        type: 'account_onboarding',
      });
      
      res.redirect(accountLink.url);
    } catch (err) {
      console.error('Stripe Connect error:', err);
      res.redirect(`${env.FRONTEND_URL}/dashboard/stripe/callback?error=oauth_failed`);
    }
  },
  
  async connectStatus(req: Request, res: Response) {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.sub },
      select: { stripeAccountId: true },
    });
    
    if (!user?.stripeAccountId) {
      return res.json({ success: true, data: { connected: false } });
    }
    
    const account = await stripe.accounts.retrieve(user.stripeAccountId);
    
    res.json({
      success: true,
      data: {
        connected: true,
        chargesEnabled: account.charges_enabled,
        payoutsEnabled: account.payouts_enabled,
        detailsSubmitted: account.details_submitted,
        requirements: account.requirements,
      },
    });
  },
  
  async disconnectConnect(req: Request, res: Response) {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.sub },
      select: { stripeAccountId: true },
    });
    
    if (!user?.stripeAccountId) {
      throw new NotFoundError('Conta Stripe não conectada');
    }
    
    await stripe.accounts.del(user.stripeAccountId);
    
    await prisma.user.update({
      where: { id: req.user!.sub },
      data: { stripeAccountId: null },
    });
    
    res.json({ success: true, data: { message: 'Conta desconectada' } });
  },
  
  async createPaymentIntent(req: Request, res: Response) {
    const { contractId, milestoneId, amount } = req.body;
    const userId = req.user!.sub;
    
    const contract = await prisma.contract.findUnique({
      where: { id: contractId },
      include: { professional: true, employer: true },
    });
    
    if (!contract) throw new NotFoundError('Contrato não encontrado');
    if (contract.employerId !== userId && contract.professionalId !== userId) {
      throw new ForbiddenError('Não autorizado');
    }
    
    if (!contract.professional.stripeAccountId) {
      throw new ForbiddenError('Profissional não tem conta Stripe conectada');
    }
    
    const platformFee = Math.round(amount * contract.commissionRate);
    const professionalAmount = amount - platformFee;
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'brl',
      automatic_payment_methods: { enabled: true },
      application_fee_amount: platformFee,
      transfer_data: {
        destination: contract.professional.stripeAccountId,
      },
      metadata: {
        contractId,
        milestoneId: milestoneId || '',
        platformFee: platformFee.toString(),
        professionalAmount: professionalAmount.toString(),
      },
    });
    
    // Create payment record
    await prisma.payment.create({
      data: {
        contractId,
        milestoneId,
        amount,
        platformFee,
        professionalAmount,
        status: 'PENDING',
        stripePaymentIntentId: paymentIntent.id,
      },
    });
    
    res.json({
      success: true,
      data: { clientSecret: paymentIntent.client_secret },
    });
  },
  
  async handleWebhook(req: Request, res: Response) {
    const sig = req.headers['stripe-signature'] as string;
    
    let event: Stripe.Event;
    
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return res.status(400).send('Webhook signature verification failed');
    }
    
    try {
      switch (event.type) {
        case 'payment_intent.succeeded':
          await handlePaymentSuccess(event.data.object as Stripe.PaymentIntent);
          break;
        case 'payment_intent.payment_failed':
          await handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
          break;
        case 'account.updated':
          await handleAccountUpdated(event.data.object as Stripe.Account);
          break;
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
          await handleSubscriptionChange(event.data.object as Stripe.Subscription);
          break;
      }
      
      res.json({ received: true });
    } catch (err) {
      console.error('Webhook handler error:', err);
      res.status(500).json({ error: 'Webhook handler failed' });
    }
  },
  
  async getSubscription(req: Request, res: Response) {
    const subscription = await prisma.subscription.findUnique({
      where: { userId: req.user!.sub },
    });
    
    res.json({ success: true, data: subscription });
  },
  
  async createCheckoutSession(req: Request, res: Response) {
    const { plan } = req.body;
    const userId = req.user!.sub;
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { subscription: true },
    });
    
    if (!user) throw new NotFoundError('Usuário não encontrado');
    
    const priceIds: Record<string, string> = {
      PRO: process.env.STRIPE_PRICE_PRO!,
      ENTERPRISE: process.env.STRIPE_PRICE_ENTERPRISE!,
    };
    
    if (!priceIds[plan]) throw new InternalError('Plano inválido');
    
    let customerId = user.stripeCustomerId;
    
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { userId },
      });
      customerId = customer.id;
      await prisma.user.update({ where: { id: userId }, data: { stripeCustomerId: customerId } });
    }
    
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [{ price: priceIds[plan], quantity: 1 }],
      mode: 'subscription',
      success_url: `${env.FRONTEND_URL}/dashboard/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.FRONTEND_URL}/dashboard/subscription/cancel`,
      metadata: { userId, plan },
    });
    
    res.json({ success: true, data: { url: session.url } });
  },
  
  async createPortalSession(req: Request, res: Response) {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.sub },
      select: { stripeCustomerId: true },
    });
    
    if (!user?.stripeCustomerId) throw new NotFoundError('Cliente Stripe não encontrado');
    
    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${env.FRONTEND_URL}/dashboard/subscription`,
    });
    
    res.json({ success: true, data: { url: session.url } });
  },
  
  async getCommissionConfig(req: Request, res: Response) {
    // In production, this would come from database config
    res.json({
      success: true,
      data: {
        free: 0.12,
        pro: 0.08,
        enterprise: 0.05,
      },
    });
  },
  
  async updateCommissionConfig(req: Request, res: Response) {
    // In production, save to database
    res.json({ success: true, data: { message: 'Configuração atualizada' } });
  },
};

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  const { contractId, milestoneId, platformFee, professionalAmount } = paymentIntent.metadata;
  
  await prisma.payment.update({
    where: { stripePaymentIntentId: paymentIntent.id },
    data: {
      status: 'SUCCEEDED',
      paidAt: new Date(),
      stripeTransferId: paymentIntent.transfer_data?.destination as string,
    },
  });
  
  // Update milestone if applicable
  if (milestoneId) {
    await prisma.milestone.update({
      where: { id: milestoneId },
      data: { status: 'PAID', paidAt: new Date() },
    });
  }
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  await prisma.payment.update({
    where: { stripePaymentIntentId: paymentIntent.id },
    data: {
      status: 'FAILED',
      failedAt: new Date(),
      failureReason: paymentIntent.last_payment_error?.message,
    },
  });
}

async function handleAccountUpdated(account: Stripe.Account) {
  const user = await prisma.user.findFirst({
    where: { stripeAccountId: account.id },
  });
  
  if (user) {
    // Could update user with account status
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const userId = subscription.metadata.userId;
  const plan = subscription.metadata.plan as 'PRO' | 'ENTERPRISE' | 'FREE';
  
  const statusMap: Record<string, any> = {
    active: 'ACTIVE',
    canceled: 'CANCELLED',
    past_due: 'PAST_DUE',
    trialing: 'TRIALING',
    incomplete: 'INCOMPLETE',
  };
  
  const commissionDiscount = plan === 'PRO' ? 0.02 : plan === 'ENTERPRISE' ? 0.05 : 0;
  
  await prisma.subscription.upsert({
    where: { userId },
    update: {
      plan,
      status: statusMap[subscription.status] || 'ACTIVE',
      stripeSubscriptionId: subscription.id,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      commissionDiscount,
    },
    create: {
      userId,
      plan,
      status: statusMap[subscription.status] || 'ACTIVE',
      stripeCustomerId: subscription.customer as string,
      stripeSubscriptionId: subscription.id,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      commissionDiscount,
    },
  });
  
  // Update existing contracts commission rates
  if (plan !== 'FREE') {
    await prisma.contract.updateMany({
      where: { professionalId: userId, status: 'ACTIVE' },
      data: { commissionRate: plan === 'PRO' ? 0.08 : 0.05 },
    });
  }
}