import { mock, MockProxy } from 'jest-mock-extended';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { DeleteUserUseCase } from '@modules/user/useCases/deleteUser/DeleteUserUseCase';

describe('DeleteUserUseCase', () => {
  let userRepository: MockProxy<IUserRepository>;
  let sut: DeleteUserUseCase;

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
    sut = new DeleteUserUseCase(userRepository);
  });
  it('should be able delete user', async () => {
    await sut.execute('any_id');
    expect(userRepository.delete).toHaveBeenCalledWith('any_id');
    expect(userRepository.delete).toHaveBeenCalledTimes(1);
  });

  it('should be able to return error when user does not exist', async () => {
    userRepository.findById.mockResolvedValue(null);
    const request = async () => {
      await sut.execute('any_id');
    };
    expect(request).rejects.toEqual({
      message: 'User not found',
      statusCode: 400,
    });
  });
});
