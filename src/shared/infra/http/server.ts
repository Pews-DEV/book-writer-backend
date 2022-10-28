import 'reflect-metadata';
import 'express-async-errors';
import cors from 'cors';
import express from 'express';

import { getErrors } from '@shared/errors/getErrors';
import { logger } from '@shared/providers/logger/implementations/LoggerProvider';

import '../../containers';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(getErrors);
app.use(router);

app.listen(process.env.PORT, () =>
  logger.info('Server is running on port 8080'),
);
