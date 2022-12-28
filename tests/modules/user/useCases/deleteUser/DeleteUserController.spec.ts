/* eslint-disable @typescript-eslint/no-explicit-any */
import { mock, MockProxy } from 'jest-mock-extended';
import { container } from 'tsyringe';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { DeleteUserController } from '@modules/user/useCases/deleteUser/DeleteUserController';
import { DeleteUserUseCase } from '@modules/user/useCases/deleteUser/DeleteUserUseCase';

const tsringeContainerMock = jest.spyOn(container, 'resolve');
describe('DeleteUserController', () => {
  let userRepository: MockProxy<IUserRepository>;
  let sut: DeleteUserController;

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
    userRepository.delete.mockResolvedValue();
    tsringeContainerMock.mockImplementation(() => ({
      execute: (id: string) => {
        const deleteUserUseCase = new DeleteUserUseCase(userRepository);
        return deleteUserUseCase.execute(id);
      },
    }));
    sut = new DeleteUserController();
  });
  it('should be able execute controller for delete', async () => {
    const request: any = {
      user: jest.fn(),
    };

    const statusResponse = {
      json: jest.fn(),
    };

    const response: any = {
      json: jest.fn(),
      status: jest.fn(() => statusResponse),
    };

    await sut.handle(request, response);
    expect(response.status).toBeCalledWith(200);
    expect(response.status().json).toBeCalledWith({
      message: 'User deleted success',
    });
  });
});
