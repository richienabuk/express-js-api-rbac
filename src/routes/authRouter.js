import express from 'express';
import AuthController from '../controllers/AuthController';

const router = express.Router();

router.post('/register', AuthController.signUp);
router.post('/login', AuthController.login);

export default router;
