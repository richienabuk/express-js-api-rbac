import express from 'express';
import AuthController from '../controllers/AuthController';

const router = express.Router();

router.post('/register', AuthController.signUp);

export default router;
