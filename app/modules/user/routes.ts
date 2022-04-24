import { Router } from 'express';

import controller from './controller';

const { UserController } = controller;

const userRouters = Router();
const userController = new UserController();

userRouters.post('/', userController.create);

export default userRouters;
