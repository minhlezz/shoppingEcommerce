import express from 'express';
import authController from '../controller/auth.controller';

const authRouter = express.Router();

authRouter.route('/auth/signin')
    .post(authController.signin);

authRouter.route('/auth/signout')
    .get(authController.signout);

export default authRouter;