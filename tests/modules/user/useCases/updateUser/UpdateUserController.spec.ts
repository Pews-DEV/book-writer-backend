import { mock, MockProxy } from 'jest-mock-extended';
import { container } from 'tsyringe';

import { IUpdateUserDTO } from '@modules/user/dtos/IUpdateUserDTO';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { UpdateUserController } from '@modules/user/useCases/updateUser/UpdateUserController';
import { UpdateUserUseCase } from '@modules/user/useCases/updateUser/UpdateUserUseCase';

const tsyringeContainerMock = jest.spyOn(container, 'resolve');
describe('UpdateUserController', () => {
  let userRepository: MockProxy<IUserRepository>;
  let sut: UpdateUserController;

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
      execute: ({
        id,
        firstName,
        lastName,
        email,
        userName,
        password,
        isAdmin,
      }: IUpdateUserDTO) => {
        const updateUserUseCase = new UpdateUserUseCase(userRepository);

        return updateUserUseCase.execute({
          id,
          firstName,
          lastName,
          email,
          userName,
          password,
          isAdmin,
        });
      },
    }));
    sut = new UpdateUserController();
  });
  it('should be able update user', async () => {
    userRepository.update.mockResolvedValue({
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

    const paramsRequest = {
      id: 'any_id',
    };

    const paramsBody = {
      id: 'any_id',
      firstName: 'any_first_name',
      lastName: 'any_last_name',
      email: 'any_email',
      userName: 'any_user_name',
      password: 'any_password',
      isAdmin: true,
    };

    const request: any = {
      user: jest.fn(() => paramsRequest),
      body: jest.fn(() => paramsBody),
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
