import { injectable, inject } from 'tsyringe';

import { IUpdateUserDTO } from '@modules/user/dtos/IUpdateUserDTO';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { User } from '@prisma/client';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({
    id,
    firstName,
    lastName,
    email,
    userName,
    password,
    isAdmin,
  }: IUpdateUserDTO): Promise<User> {
    const userAlreadyExists = await this.userRepository.findById(id);

    if (!userAlreadyExists) {
      throw new AppError('User not found');
    }

    const user = await this.userRepository.update({
      id,
      firstName,
      lastName,
      email,
      userName,
      password,
      isAdmin,
    });

    return user;
  }
}
