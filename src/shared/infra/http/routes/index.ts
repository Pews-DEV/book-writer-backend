import { Router } from 'express';

import { userRoutes } from './users.router';

const router = Router();

router.use('/users', userRoutes);

export { router };
