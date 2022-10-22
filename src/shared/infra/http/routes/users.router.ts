import { Router } from 'express';

import { AuthenticateController } from '@modules/authenticate/useCases/authenticateUser/AuthenticateController';
import { CreateUserController } from '@modules/user/useCases/createUser/CreateUserController';
import { DeleteUserController } from '@modules/user/useCases/deleteUser/DeleteUserController';
import { FindUserByIdController } from '@modules/user/useCases/findUserById/FindUserByIdController';
import { UpdateUserController } from '@modules/user/useCases/updateUser/UpdateUserController';

import { isAuthenticated } from '../middlewares/isAuthenticated';

const userRoutes = Router();

const findUserByIdController = new FindUserByIdController();
const createUserController = new CreateUserController();
const authenticateController = new AuthenticateController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

userRoutes.get('/:id', isAuthenticated, findUserByIdController.handle);
userRoutes.post('/', createUserController.handle);
userRoutes.post('/authenticate', authenticateController.handle);
userRoutes.put('/:id', updateUserController.handle);
userRoutes.delete('/:id', deleteUserController.handle);

export { userRoutes };
