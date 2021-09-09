import { sendErrorResponse } from '../utils/sendResponse';
import model from '../models';

const { PersonalAccessToken } = model;

export default async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return sendErrorResponse(res, 401, 'Authentication required');
        }

        const bearerToken = req.headers.authorization.split(' ')[1] || req.headers.authorization;

        const { user, currentAccessToken } = await PersonalAccessToken.findToken(bearerToken);

        if (!user) {
            return sendErrorResponse(res, 401, 'Authentication Failed');
        }
        if (user.status !== 'active') return sendErrorResponse(res, 403, 'Your account is either suspended or inactive. Contact admin to re-activate your account.');

        req.currentAccessToken = currentAccessToken;
        req.userData = user;
        next();
    } catch (e) {
        console.error(e);
        return sendErrorResponse(res, 401, 'Authentication Failed', e);
    }
};
