import { Router } from 'express';

import { CreateUserController } from '@modules/user/useCases/createUser/CreateUserController';
import { DeleteUserController } from '@modules/user/useCases/deleteUser/DeleteUserController';
import { FindUserByIdController } from '@modules/user/useCases/findUserById/FindUserByIdController';
import { UpdateUserController } from '@modules/user/useCases/updateUser/UpdateUserController';

const userRoutes = Router();

const findUserByIdController = new FindUserByIdController();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

userRoutes.get('/:id', findUserByIdController.handle);
userRoutes.post('/', createUserController.handle);
userRoutes.put('/:id', updateUserController.handle);
userRoutes.delete('/:id', deleteUserController.handle);

export { userRoutes };
