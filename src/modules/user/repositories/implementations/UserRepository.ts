import { ICreateUserDTO } from '@modules/user/dtos/ICreateUserDTO';
import { User } from '@prisma/client';
import prismaClient from '@shared/infra/database';

import { IUserRepository } from '../IUserRepository';

export class UserRepository implements IUserRepository {
  async create({
    firstName,
    lastName,
    email,
    userName,
    password,
    isAdmin = false,
  }: ICreateUserDTO): Promise<User> {
    const user = await prismaClient.user.create({
      data: { firstName, lastName, email, userName, password, isAdmin },
    });

    return user;
  }
}
