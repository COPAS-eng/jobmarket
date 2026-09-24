import { Router } from 'express';
import { validate } from '@/middlewares';
import { registerSchema, loginSchema, refreshTokenSchema } from '@jobmarket/shared/validators';
import { authController } from '@/controllers/authController';

const router = Router();

router.post('/register', validate({ body: registerSchema.shape.body }), authController.register);
router.post('/login', validate({ body: loginSchema.shape.body }), authController.login);
router.post('/refresh', validate({ cookies: refreshTokenSchema.shape.cookies }), authController.refresh);
router.post('/logout', authController.logout);
router.get('/me', authController.me);

export { router };