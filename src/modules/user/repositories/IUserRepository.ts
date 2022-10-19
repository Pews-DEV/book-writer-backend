import { User } from '@prisma/client';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO';

export type IUserRepository = {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(params: ICreateUserDTO): Promise<User>;
  update(params: IUpdateUserDTO): Promise<User>;
  delete(id: string): Promise<void>;
};
