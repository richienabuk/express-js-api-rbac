import express from 'express';
import Auth from '../middlewares/Auth';
import can from '../middlewares/canAccess';
import Constants from '../utils/constants';
import AdminController from "../controllers/AdminController";
import { sendSuccessResponse } from "../utils/sendResponse";

const router = express.Router();

router.get('/users', Auth, can(Constants.PERMISSION_VIEW_ALL_USERS), AdminController.users);
router.get('/dashboard', Auth, can(Constants.PERMISSION_VIEW_ADMIN_DASHBOARD), (req, res) => {
    return sendSuccessResponse(res, 200, '', 'Admin dashboard access allowed.')
});

export default router;
