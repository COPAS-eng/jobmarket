import { Router } from 'express';
import { validate } from '@/middlewares';
import { createPaymentIntentSchema, commissionConfigSchema } from '@jobmarket/shared/validators';
import { stripeController } from '@/controllers/stripeController';
import { authenticate, authorize } from '@/middlewares/auth';

const router = Router();

// Stripe Connect onboarding
router.get('/connect/authorize', authenticate, stripeController.authorizeConnect);
router.get('/connect/callback', stripeController.connectCallback);
router.get('/connect/status', authenticate, stripeController.connectStatus);
router.post('/connect/disconnect', authenticate, stripeController.disconnectConnect);

// Payments
router.post('/payment-intent', authenticate, validate({ body: createPaymentIntentSchema.shape.body }), stripeController.createPaymentIntent);
router.post('/webhook', stripeController.handleWebhook);

// Subscriptions
router.get('/subscription', authenticate, stripeController.getSubscription);
router.post('/subscription/checkout', authenticate, stripeController.createCheckoutSession);
router.post('/subscription/portal', authenticate, stripeController.createPortalSession);

// Admin
router.get('/admin/commission', authenticate, authorize('ADMIN'), stripeController.getCommissionConfig);
router.patch('/admin/commission', authenticate, authorize('ADMIN'), validate({ body: commissionConfigSchema.shape.body }), stripeController.updateCommissionConfig);

export { router };