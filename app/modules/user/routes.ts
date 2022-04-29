import { Router } from 'express';

import AuthenticateUserController from './controller/AuthenticateUserController';
import CreateUserController from './controller/CreateUserController';

const userRouters = Router();

const createUserController = new CreateUserController();
const authenticationController = new AuthenticateUserController();

userRouters.post('', createUserController.handle);
userRouters.post('/login', authenticationController.handle);

export default userRouters;
