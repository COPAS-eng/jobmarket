import { Router } from 'express';
import { validate } from '@/middlewares';
import { createProposalSchema, updateProposalStatusSchema, proposalIdSchema } from '@jobmarket/shared/validators';
import { proposalController } from '@/controllers/proposalController';
import { authenticate, authorize } from '@/middlewares/auth';

const router = Router();

router.post('/', authenticate, authorize('PROFISSIONAL'), validate({ body: createProposalSchema.shape.body }), proposalController.create);
router.get('/:id', authenticate, validate({ params: proposalIdSchema.shape.params }), proposalController.getById);
router.get('/', authenticate, proposalController.listMine);
router.patch('/:id/status', authenticate, authorize('EMPREGADOR', 'ADMIN'), validate({ params: proposalIdSchema.shape.params, body: updateProposalStatusSchema.shape.body }), proposalController.updateStatus);

export { router };