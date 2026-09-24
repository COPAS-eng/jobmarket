import { Router } from 'express';
import { validate } from '@/middlewares';
import { updateProfileSchema, professionalQuerySchema, adminUserQuerySchema, adminUpdateUserSchema } from '@jobmarket/shared/validators';
import { userController } from '@/controllers/userController';
import { authenticate, authorize } from '@/middlewares/auth';

const router = Router();

// Profile (own)
router.get('/profile', authenticate, userController.getProfile);
router.patch('/profile', authenticate, validate({ body: updateProfileSchema.shape.body }), userController.updateProfile);

// Professionals directory (public)
router.get('/profissionais', validate({ query: professionalQuerySchema.shape.query }), userController.listProfessionals);
router.get('/profissionais/:id', userController.getProfessionalPublic);

// Admin routes
router.get('/admin/users', authenticate, authorize('ADMIN'), validate({ query: adminUserQuerySchema.shape.query }), userController.adminListUsers);
router.patch('/admin/users/:id', authenticate, authorize('ADMIN'), validate({ params: adminUpdateUserSchema.shape.params, body: adminUpdateUserSchema.shape.body }), userController.adminUpdateUser);

export { router };