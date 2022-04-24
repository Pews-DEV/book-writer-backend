import { Router } from 'express';

import AuthenticateUserController from './controller/AuthenticateUserController';
import UserController from './controller/UserController';

const userRouters = Router();

const userController = new UserController();
const authenticationController = new AuthenticateUserController();

userRouters.post('/', userController.create);
userRouters.post('/login/', authenticationController.handleLogin);

export default userRouters;
