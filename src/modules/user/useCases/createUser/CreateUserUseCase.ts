import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/user/dtos/ICreateUserDTO';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { User } from '@prisma/client';
import { AppError } from '@shared/errors/AppError';
import Encrypt from '@shared/utils/crypto/Encrypt';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({
    firstName,
    lastName,
    email,
    userName,
    password,
    isAdmin,
  }: ICreateUserDTO): Promise<User> {
    const emailAlreadyExists = await this.userRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new AppError('Email already exists', 400);
    }

    const encryptPassword = Encrypt({ password });

    const user = await this.userRepository.create({
      firstName,
      lastName,
      email,
      userName,
      password: encryptPassword,
      isAdmin,
    });

    return user;
  }
}
