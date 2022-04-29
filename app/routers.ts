import { Router } from 'express';

import userRouter from './modules/user/routes';

const routers = Router();

routers.use('/user', userRouter);

export default routers;
