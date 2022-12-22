import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteUserUseCase } from './DeleteUserUseCase';

export class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const deleteUserUseCase = container.resolve(DeleteUserUseCase);

    await deleteUserUseCase.execute(id);

    return response.status(200).json({ message: 'User deleted success' });
  }
}
