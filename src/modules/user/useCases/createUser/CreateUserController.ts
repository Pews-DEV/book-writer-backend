import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { firstName, lastName, email, userName, password, isAdmin } =
      request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      firstName,
      lastName,
      email,
      userName,
      password,
      isAdmin,
    });

    return response.status(200).json(user);
  }
}
