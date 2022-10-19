import express from 'express';

import { getErrors } from '@shared/errors/getErrors';
import { logger } from '@shared/providers/logger/implementations/LoggerProvider';

const app = express();

app.use(express.json());
app.use(getErrors);

app.listen(3333, () => logger.info('Server is running on port 3333'));
