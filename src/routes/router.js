import express from 'express';
import productRouter from './product.routes';

const routerAPI = express();


routerAPI.use('/products', productRouter);



export default routerAPI;