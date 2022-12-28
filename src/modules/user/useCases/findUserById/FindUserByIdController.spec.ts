import { MockProxy, mock } from 'jest-mock-extended';
import { container } from 'tsyringe';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';

import { FindUserByIdController } from './FindUserByIdController';
import { FindUserByIdUseCase } from './FindUserByIdUseCase';

const tsyringeContainerMock = jest.spyOn(container, 'resolve');
describe('FindUserByIdController', () => {
  let userRepository: MockProxy<IUserRepository>;
  let sut: FindUserByIdController;

  beforeEach(() => {
    userRepository = mock();
    userRepository.findById.mockResolvedValue({
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
    tsyringeContainerMock.mockImplementation(() => ({
      execute: (id: string) => {
        const user = new FindUserByIdUseCase(userRepository);
        return user.execute(id);
      },
    }));
    sut = new FindUserByIdController();
  });
  it('should be able to return 200 and one user', async () => {
    const paramsRequest = {
      id: 'any_id',
    };

    const request: any = {
      params: paramsRequest,
    };

    const statusResponse = {
      json: jest.fn(),
    };

    const response: any = {
      json: jest.fn(),
      status: jest.fn(() => statusResponse),
    };

    await sut.handle(request, response);

    expect(response.status).toBeCalledWith(201);
    expect(response.status().json).toBeCalledWith({
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
});
