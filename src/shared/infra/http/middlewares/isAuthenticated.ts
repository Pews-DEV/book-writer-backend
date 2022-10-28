import { NextFunction, Request } from 'express';
import { verify } from 'jsonwebtoken';

import { jwtConfig } from '@config/jwtConfig';
import { AppError } from '@shared/errors/AppError';

type ITokenPayload = {
  userName: string;
  email: string;
  sub: string;
};
export function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authenticate = request.headers.authorization;

  if (!authenticate) {
    throw new AppError('Token in missing');
  }

  const [, token] = authenticate.split(' ');

  try {
    const {
      sub: user,
      userName,
      email,
    } = verify(token, jwtConfig.secretKey) as ITokenPayload;

    request.user = {
      id: user,
      email,
      userName,
    };

    return next();
  } catch {
    throw new AppError('Invalid token');
  }
}
