/**
 *Handle HTTP request & serve responses 
 * @express.json() & @express.urlencoded() - parsing streamdable request objects
 * @cookie-parser: parsing and set cookies in request objects
 * @compression : to compress response bodies for all requests that traverse through middlewares
 * @helmet : setting various HTTP headers to secure app.
 * @cors : enable sharing resource from the different origins.
 */

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import apiRouter from './src/routes';

const app = express();

/**Middlewares */
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // option extended-true to enable qs library to parse the deep body requests

app.use('/', apiRouter)
export default app;





