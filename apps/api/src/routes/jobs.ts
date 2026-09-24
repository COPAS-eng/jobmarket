import { Router } from 'express';
import { validate } from '@/middlewares';
import { createJobSchema, updateJobSchema, jobQuerySchema, jobIdSchema } from '@jobmarket/shared/validators';
import { jobController } from '@/controllers/jobController';
import { authenticate, authorize } from '@/middlewares/auth';

const router = Router();

// Public routes
router.get('/', validate({ query: jobQuerySchema.shape.query }), jobController.list);
router.get('/:id', validate({ params: jobIdSchema.shape.params }), jobController.getById);

// Protected routes (Employer + Admin)
router.post('/', authenticate, authorize('EMPREGADOR', 'ADMIN'), validate({ body: createJobSchema.shape.body }), jobController.create);
router.patch('/:id', authenticate, authorize('EMPREGADOR', 'ADMIN'), validate({ params: jobIdSchema.shape.params, body: updateJobSchema.shape.body }), jobController.update);
router.delete('/:id', authenticate, authorize('EMPREGADOR', 'ADMIN'), validate({ params: jobIdSchema.shape.params }), jobController.delete);

export { router };