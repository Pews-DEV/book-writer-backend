import { Router } from 'express';

import userRouter from './modules/user/routes';
import tokenJWTRouter from './modules/authenticate/router/AutheticateUserRouter';

const routers = Router();

routers.use('/user', userRouter);
routers.use('/token', tokenJWTRouter);

export default routers;
