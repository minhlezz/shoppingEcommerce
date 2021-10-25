import express from 'express';
import {
    create,
    list,
    read,
    remove,
    update,
    userById,
} from '../controller/user.controller';
import authController from '../controller/auth.controller';

const userRouter = express.Router();

userRouter.route('/api/users')
    .get(list)
    .post(create)

userRouter.route('/api/users/:userId')
    .get(authController.requiredSignin, read)
    .put(authController.requiredSignin, authController.hasAuthorization, update)
    .delete(authController.requiredSignin, authController.hasAuthorization, remove)

/*Load the matching user's detail */
userRouter.param('userId', userById)

export default userRouter;