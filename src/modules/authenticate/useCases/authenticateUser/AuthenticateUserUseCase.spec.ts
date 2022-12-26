/* eslint-disable no-return-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { mock, MockProxy } from 'jest-mock-extended';
import jsonwebtoken from 'jsonwebtoken';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import Encrypt from '@shared/utils/crypto/Encrypt';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

const tokenMock = jest.spyOn(jsonwebtoken, 'sign');
describe('AuthenticateUserUseCase', () => {
  let userRepository: MockProxy<IUserRepository>;
  let sut: AuthenticateUserUseCase;
  const passwordEncrypted = Encrypt({ password: 'any_password' });

  beforeEach(() => {
    userRepository = mock();
    userRepository.findByEmail.mockResolvedValue({
      id: 'any_id',
      firstName: 'any_first_name',
      lastName: 'any_last_name',
      email: 'any_email',
      userName: 'any_user_name',
      password: passwordEncrypted,
      isAdmin: true,
      created_at: new Date('2022-08-23T17:33:38.232Z'),
      updated_at: new Date('2022-08-23T17:33:38.232Z'),
    });
    tokenMock.mockImplementation(() => 'any_token');
    sut = new AuthenticateUserUseCase(userRepository);
  });

  it('should be able to authenticate the user', async () => {
    const request = await sut.execute({
      email: 'any_email',
      password: 'any_password',
    });

    expect(request).toStrictEqual({
      token: 'any_token',
      user: {
        id: 'any_id',
        firstName: 'any_first_name',
        lastName: 'any_last_name',
        email: 'any_email',
        userName: 'any_user_name',
        password: passwordEncrypted,
        isAdmin: true,
        created_at: new Date('2022-08-23T17:33:38.232Z'),
        updated_at: new Date('2022-08-23T17:33:38.232Z'),
      },
    });
  });

  it('should be able to throw AppError', async () => {
    const request = async () => {
      return await sut.execute({
        email: 'any_email',
        password: 'any_email',
      });
    };
    expect(request()).rejects.toEqual({
      message: 'User or password incorrect',
      statusCode: 400,
    });
  });
});
