import {Op} from 'sequelize';
import model from '../models';
import {sendErrorResponse, sendSuccessResponse} from "../utils/sendResponse";
import {hash} from "../utils/hashing";

const {User} = model;

export default {
    async signUp(req, res) {
        const {email, password, name, phone} = req.body;
        try {
            let user = await User.findOne({where: {[Op.or]: [{phone}, {email}]}});
            if (user) {
                return sendErrorResponse(res, 422, 'User with that email or phone already exists');
            }
            const settings = {
                notification: {
                    push: true,
                    email: true,
                },
            };
            user = await User.create({
                name,
                email,
                password: hash(password),
                phone,
                settings
            });
            return sendSuccessResponse(res, 201, {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                }
            }, 'Account created successfully');
        } catch (e) {
            console.error(e);
            return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.', e)
        }
    }
}
