import model from '../models';
import {sendErrorResponse, sendSuccessResponse} from "../utils/sendResponse";

const { User } = model;

export default {
    async users(req, res) {
        try {
            return sendSuccessResponse(res, 201, await User.findAll(), 'All registered users');
        } catch (e) {
            console.error(e);
            return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.', e)
        }
    },
}
