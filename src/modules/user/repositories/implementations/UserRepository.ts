import { ICreateUserDTO } from '@modules/user/dtos/ICreateUserDTO';
import { IUpdateUserDTO } from '@modules/user/dtos/IUpdateUserDTO';
import { User } from '@prisma/client';
import prismaClient from '@shared/infra/database';
import { Context } from '@shared/infra/database/context';

import { IUserRepository } from '../IUserRepository';

export class UserRepository implements IUserRepository {
  constructor(private readonly ctx: Context = { prisma: prismaClient }) {}
  async findById(id: string): Promise<User | null> {
    const user = await this.ctx.prisma.user.findUnique({ where: { id } });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.ctx.prisma.user.findUnique({ where: { email } });

    return user;
  }

  async create({
    firstName,
    lastName,
    email,
    userName,
    password,
    isAdmin = false,
  }: ICreateUserDTO): Promise<User> {
    const user = await this.ctx.prisma.user.create({
      data: { firstName, lastName, email, userName, password, isAdmin },
    });

    return user;
  }

  async update({
    id,
    firstName,
    lastName,
    email,
    userName,
    password,
    isAdmin,
  }: IUpdateUserDTO): Promise<User> {
    const user = await this.ctx.prisma.user.update({
      where: { id },
      data: { firstName, lastName, email, userName, password, isAdmin },
    });

    return user;
  }

  async delete(id: string): Promise<void> {
    await this.ctx.prisma.user.delete({ where: { id } });
  }
}
