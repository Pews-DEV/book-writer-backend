import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserUseCase } from './UpdateUserUseCase';

export class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { firstName, lastName, email, userName, password, isAdmin } =
      request.body;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    const user = await updateUserUseCase.execute({
      id,
      firstName,
      lastName,
      email,
      userName,
      password,
      isAdmin,
    });

    return response.status(201).json(user);
  }
}
