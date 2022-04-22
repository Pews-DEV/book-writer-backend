import { Router } from 'express';

import controller from './controller';

const { UserController } = controller;

const userRouters = Router();
const userController = new UserController();

userRouters.post('/', UserController.VALIDATIONS, userController.create);

export default userRouters;
