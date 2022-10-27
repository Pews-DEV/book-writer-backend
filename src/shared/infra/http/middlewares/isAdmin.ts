import { NextFunction, Request, Response } from 'express';

import { UserRepository } from '@modules/user/repositories/implementations/UserRepository';

export async function isAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const userId = request.user.id;

  const userRepository = new UserRepository();

  const user = await userRepository.findById(userId);

  if (user && user.isAdmin) {
    return next();
  }

  return response.status(401).json({
    error: 'Unauthorized',
  });
}
