import { Router } from 'express';
import { validate } from '@/middlewares';
import { createContractSchema, updateContractSchema, contractIdSchema, createMilestoneSchema, updateMilestoneSchema, submitMilestoneSchema, reviewMilestoneSchema } from '@jobmarket/shared/validators';
import { contractController } from '@/controllers/contractController';
import { authenticate, authorize } from '@/middlewares/auth';

const router = Router();

router.post('/', authenticate, authorize('EMPREGADOR', 'ADMIN'), validate({ body: createContractSchema.shape.body }), contractController.create);
router.get('/:id', authenticate, validate({ params: contractIdSchema.shape.params }), contractController.getById);
router.get('/', authenticate, contractController.list);
router.patch('/:id', authenticate, authorize('EMPREGADOR', 'ADMIN'), validate({ params: contractIdSchema.shape.params, body: updateContractSchema.shape.body }), contractController.update);

// Milestones
router.post('/:contractId/milestones', authenticate, authorize('EMPREGADOR', 'ADMIN'), validate({ params: createMilestoneSchema.shape.params, body: createMilestoneSchema.shape.body }), contractController.createMilestone);
router.patch('/:contractId/milestones/:id', authenticate, authorize('EMPREGADOR', 'ADMIN'), validate({ params: updateMilestoneSchema.shape.params, body: updateMilestoneSchema.shape.body }), contractController.updateMilestone);
router.post('/:contractId/milestones/:id/submit', authenticate, authorize('PROFISSIONAL'), validate({ params: submitMilestoneSchema.shape.params, body: submitMilestoneSchema.shape.body }), contractController.submitMilestone);
router.post('/:contractId/milestones/:id/review', authenticate, authorize('EMPREGADOR', 'ADMIN'), validate({ params: reviewMilestoneSchema.shape.params, body: reviewMilestoneSchema.shape.body }), contractController.reviewMilestone);

export { router };