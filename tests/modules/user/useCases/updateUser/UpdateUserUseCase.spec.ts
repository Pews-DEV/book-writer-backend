/* eslint-disable no-return-await */
import { mock, MockProxy } from 'jest-mock-extended';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { UpdateUserUseCase } from '@modules/user/useCases/updateUser/UpdateUserUseCase';

describe('UpdateUserUseCase', () => {
  let userRepository: MockProxy<IUserRepository>;
  let sut: UpdateUserUseCase;
  beforeEach(() => {
    userRepository = mock();
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
    sut = new UpdateUserUseCase(userRepository);
  });
  it('should be able to update user', async () => {
    const request = await sut.execute({
      id: 'any_id',
      firstName: 'any_first_name',
      lastName: 'any_last_name',
      email: 'any_email',
      userName: 'any_user_name',
      password: 'any_password',
      isAdmin: true,
    });

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

  it('should be able to throw AppError', async () => {
    userRepository.findById.mockResolvedValueOnce(null);
    const request = async () => {
      return await sut.execute({
        id: 'any_id',
        firstName: 'any_first_name',
        lastName: 'any_last_name',
        email: 'any_email',
        userName: 'any_user_name',
        password: 'any_password',
        isAdmin: true,
      });
    };

    expect(request()).rejects.toEqual({
      message: 'User not found',
      statusCode: 400,
    });
  });
});
