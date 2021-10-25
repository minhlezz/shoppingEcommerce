import express from 'express';
import userRouter from './user.routes';
import authRouter from './auth.routes';
import productRouter from './product.routes';

const Router = express();

Router.use('/', authRouter);
Router.use('/', userRouter);
// router.use('/', productRouter);

export default Router;