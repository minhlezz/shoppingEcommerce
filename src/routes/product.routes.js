import express from 'express';
import authController from '../controller/auth.controller';
// import productController from '../controller/product.controller';

const productRouter = express.Router();

// productRouter.route('/api/products')
//     .get(productController.list)
//     .post(authController.requiredSignin, productController.create)


export default productRouter