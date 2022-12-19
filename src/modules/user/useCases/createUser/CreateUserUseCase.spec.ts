/* eslint-disable no-return-await */
import { mock, MockProxy } from 'jest-mock-extended';

import { UserRepository } from '@modules/user/repositories/implementations/UserRepository';
import Encrypt from '@shared/utils/crypto/Encrypt';

import { CreateUserUseCase } from './CreateUserUseCase';

describe('CreateUserUseCase', () => {
  let userRepository: MockProxy<UserRepository>;
  let sut: CreateUserUseCase;

  beforeEach(() => {
    userRepository = mock<UserRepository>();
    userRepository.create.mockResolvedValue({
      id: 'any_id',
      firstName: 'any_first_name',
      lastName: 'any_last_name',
      email: 'any_email',
      userName: 'any_user_name',
      password: 'any_password',
      isAdmin: true,
      created_at: new Date('2022-08-23T17:33:38.232Z'),
      updated_at: new Date('2022-08-23T17:33:38.232Z'),
    });
    userRepository.findByEmail.mockResolvedValue(null);
    sut = new CreateUserUseCase(userRepository);
  });

  it('shoulbe able to create a new user', async () => {
    const request = await sut.execute({
      firstName: 'any_first_name',
      lastName: 'any_last_name',
      email: 'any_email',
      userName: 'any_user_name',
      password: 'any_password',
      isAdmin: true,
    });
    expect(Encrypt({ password: request.password })).toBeTruthy();
    expect(request).toStrictEqual({
      id: 'any_id',
      firstName: 'any_first_name',
      lastName: 'any_last_name',
      email: 'any_email',
      userName: 'any_user_name',
      password: 'any_password',
      isAdmin: true,
      created_at: new Date('2022-08-23T17:33:38.232Z'),
      updated_at: new Date('2022-08-23T17:33:38.232Z'),
    });
  });

  it('shoulbe be able to throw AppError', async () => {
    userRepository.findByEmail.mockResolvedValue({
      id: 'any_id',
      firstName: 'any_first_name',
      lastName: 'any_last_name',
      email: 'any_email',
      userName: 'any_user_name',
      password: 'any_password',
      isAdmin: true,
      created_at: new Date('2022-08-23T17:33:38.232Z'),
      updated_at: new Date('2022-08-23T17:33:38.232Z'),
    });

    const request = async () => {
      return await sut.execute({
        firstName: 'any_first_name',
        lastName: 'any_last_name',
        email: 'any_email',
        userName: 'any_user_name',
        password: 'any_password',
        isAdmin: true,
      });
    };

    expect(request()).rejects.toEqual({
      message: 'Email already exists',
      statusCode: 400,
    });
  });
});
