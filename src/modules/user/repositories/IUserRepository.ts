import { User } from '@prisma/client';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

export type IUserRepository = {
  create(params: ICreateUserDTO): Promise<User>;
};
