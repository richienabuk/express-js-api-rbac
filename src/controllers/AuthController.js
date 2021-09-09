import {Op} from 'sequelize';
import model from '../models';
import {sendErrorResponse, sendSuccessResponse} from "../utils/sendResponse";
import {hash, hash_compare} from "../utils/hashing";
import constants from "../utils/constants";

const {User} = model;

export default {
    async signUp(req, res) {
        const {email, password, name, phone, role} = req.body;
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

            const userRole = await Role.findOne({ where: { name: constants.ROLE_AUTHENTICATED } });
            newUser.addRole(userRole);

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
    },

    async login(req, res) {
        const { login, password, device_name } = req.body;

        try {
            const user = await User.findOne({ where: { email: login } });

            if (!user) return sendErrorResponse(res, 404, 'Incorrect login credentials. Kindly check and try again');
            const checkPassword = hash_compare(hash(password), user.password);
            if (!checkPassword) {
                return sendErrorResponse(res, 400, 'Incorrect login credentials. Kindly check and try again');
            }

            if (user.status !== 'active') {
                return sendErrorResponse(res, 401, 'Your account has been suspended. Contact admin');
            }

            const token = await user.newToken();
            return sendSuccessResponse(res, 200, {
                token: token.plainTextToken,
                user: {
                    name: user.name,
                    id: user.id,
                    email: user.email,
                },
            }, 'Login successfully');
        } catch (e) {
            console.error(e);
            return sendErrorResponse(res, 500, 'Server error, contact admin to resolve issue', e);
        }
    }
}
