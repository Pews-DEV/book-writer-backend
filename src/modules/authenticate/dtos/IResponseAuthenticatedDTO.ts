import { User } from '@prisma/client';

export type IResponseAuthenticatedDTO = {
  token: string;
  user: User;
};
