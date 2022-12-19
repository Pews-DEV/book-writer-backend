/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { mock, MockProxy } from 'jest-mock-extended';
import { container } from 'tsyringe';

import { UserRepository } from '@modules/user/repositories/implementations/UserRepository';

import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';

const tsyringeContainerMock = jest.spyOn(container, 'resolve');

describe('CreateUserController', () => {
  let userRepository: MockProxy<UserRepository>;
  let sut: CreateUserController;

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
    tsyringeContainerMock.mockImplementation(() => ({
      execute: (params: any) => {
        const user = new CreateUserUseCase(userRepository);
        return user.execute(params);
      },
    }));
    sut = new CreateUserController();
  });

  it('shoulbe be able to return to 200 and a client', async () => {
    const bodyRequest = {
      firstName: 'any_first_name',
      lastName: 'any_last_name',
      email: 'any_email',
      userName: 'any_user_name',
      password: 'any_password',
      isAdmin: true,
    };

    const responseJson = {
      id: 'any_id',
      firstName: 'any_first_name',
      lastName: 'any_last_name',
      email: 'any_email',
      userName: 'any_user_name',
      password: 'any_password',
      isAdmin: true,
      created_at: new Date('2022-08-23T17:33:38.232Z'),
      updated_at: new Date('2022-08-23T17:33:38.232Z'),
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

    expect(response.status).toBeCalledWith(200);
    expect(response.status().json()).toEqual({
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
    expect(request.body).toEqual(bodyRequest);
  });
});
