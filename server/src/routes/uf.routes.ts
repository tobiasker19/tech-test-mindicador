import { Router } from 'express';
import { getUF } from '../controllers/uf.controller.ts';
import { protect } from '../middlewares/auth.middleware.ts';

const router = Router();

// Endpoint GET /uf/:date protegido con middleware de autenticación
router.get('/:date', protect, getUF);

export default router;