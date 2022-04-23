import User from '@/src/entities/User';
import { ICreateUser } from '../../@types';
import services from '../../services';

const userData: ICreateUser = {
  first_name: 'any first name',
  last_name: 'any last name',
  email: 'any_email@email.com',
  username: 'any name',
  password: 'any_password',
};

describe('', () => {
  it('should', async () => {
    const createUser = new services.CreateUserService();
    const user = await createUser.execute(userData);
    expect(user).toBeInstanceOf(User);
  });
});
