import { Router } from 'express';
import controller from '../controller';

const userRouters = Router();
const userController = new controller.UserController();

userRouters.post('/', userController.create);

export default userRouters;
