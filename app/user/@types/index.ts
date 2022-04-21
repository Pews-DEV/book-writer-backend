import User from '../../src/entities/User'

export interface ICreateUser {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  is_admin?: boolean;
}
