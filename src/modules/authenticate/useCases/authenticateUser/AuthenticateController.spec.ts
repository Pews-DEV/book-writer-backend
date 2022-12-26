/* eslint-disable @typescript-eslint/no-unused-vars */
import { mock, MockProxy } from 'jest-mock-extended';
import jsonwebtoken from 'jsonwebtoken';
import { container } from 'tsyringe';

import { IAuthenticateUserDTO } from '@modules/authenticate/dtos/IAuthenticateUserDTO';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import Encrypt from '@shared/utils/crypto/Encrypt';

import { AuthenticateController } from './AuthenticateController';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

const tsyringeContainerMock = jest.spyOn(container, 'resolve');
const passwordEncrypted = Encrypt({ password: 'any_password' });
const tokenMock = jest.spyOn(jsonwebtoken, 'sign');

describe('AuthenticateController', () => {
  let userRepository: MockProxy<IUserRepository>;
  let sut: AuthenticateController;
  beforeAll(() => {
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
    tsyringeContainerMock.mockImplementation(() => ({
      execute: ({ email, password }) => {
        const user = new AuthenticateUserUseCase(userRepository);
        return user.execute({ email, password });
      },
    }));
    tokenMock.mockImplementation(() => 'any_token');

    sut = new AuthenticateController();
  });
  it('', async () => {
    const bodyRequest: IAuthenticateUserDTO = {
      email: 'any_email',
      password: 'any_password',
    };

    const responseJson = {
      token: 'any_token',
      user: {
        id: 'any_id',
        firstName: 'any_first_name',
        lastName: 'any_last_name',
        email: 'any_email',
        userName: 'any_user_name',
        password: 'any_password',
        isAdmin: true,
        created_at: new Date('2022-08-23T17:33:38.232Z'),
        updated_at: new Date('2022-08-23T17:33:38.232Z'),
      },
    };

    const request: any = {
      body: bodyRequest,
    };

    const statusResponse = {
      json: jest.fn().mockReturnValue(responseJson),
    };

    const response: any = {
      json: jest.fn(),
      status: jest.fn(() => statusResponse),
    };

    await sut.handle(request, response);

    expect(response.status).toBeCalledWith(201);
    expect(response.status().json()).toEqual({
      token: 'any_token',
      user: {
        id: 'any_id',
        firstName: 'any_first_name',
        lastName: 'any_last_name',
        email: 'any_email',
        userName: 'any_user_name',
        password: 'any_password',
        isAdmin: true,
        created_at: new Date('2022-08-23T17:33:38.232Z'),
        updated_at: new Date('2022-08-23T17:33:38.232Z'),
      },
    });
  });
});
