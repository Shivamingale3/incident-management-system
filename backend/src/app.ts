import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { errorHandler } from './middlewares/errorMiddleware.js';
import { notFoundHandler } from './middlewares/notFoundMiddleware.js';
import { router } from './routes/index.routes.js';
import { morganStream } from './utils/logger.js';

export const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev', { stream: morganStream }));

app.use('/api', router);

app.use(notFoundHandler);
app.use(errorHandler);
