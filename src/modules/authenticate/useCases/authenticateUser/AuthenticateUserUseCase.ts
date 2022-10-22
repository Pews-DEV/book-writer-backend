import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import { jwtConfig } from '@config/jwtConfig';
import { IAuthenticateUserDTO } from '@modules/authenticate/dtos/IAuthenticateUserDTO';
import { IResponseAuthenticatedDTO } from '@modules/authenticate/dtos/IResponseAuthenticatedDTO';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { AppError } from '@shared/errors/AppError';
import Encrypt from '@shared/utils/crypto/Encrypt';

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateUserDTO): Promise<IResponseAuthenticatedDTO> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found');
    }

    const passwordHash = user.password.split('$');

    const encryptPassword = Encrypt({
      password,
      saltPassword: passwordHash[0],
    });

    if (encryptPassword !== user.password) {
      throw new AppError('User or password incorrect');
    }

    const token = sign(
      { name: user.userName, email: user.email },
      jwtConfig.secretKey,
      { subject: user.id, expiresIn: jwtConfig.expiresIn },
    );

    return { token, user };
  }
}
