import CreateUserService from '../CreateUser';
import { ICreateUser } from '@/modules/user/@types';
import User from '@/src/entities/User';

describe('Create new user', () => {
  it('should be able to create a new user', async () => {
    const userService = new CreateUserService();
    const userData: ICreateUser = {
      first_name: 'any first name',
      last_name: 'any last name',
      email: 'any_mail@email.com',
      username: 'any_name',
      password: 'any_password',
    };
    const newUser = await userService.execute(userData);

    expect(newUser).toBeInstanceOf(User);
  });
});
