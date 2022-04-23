import { EntityRepository, Repository } from 'typeorm';

import hashPassword from '@/utils/bcrypt/hashPassword';
import User from '@/src/entities/User';

import { ICreateUser } from '../@types';
import { FIELD_VAR, LENGTH_VAR } from '../defaults';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public static readonly LENGTH_ERROR_MESSAGE = `O ${FIELD_VAR} necessita ter ao menos ${LENGTH_VAR} caracteres`;
  public static readonly NON_UNIQUE_ERROR_MESSAGE = `${FIELD_VAR} já cadastrado`;
  public static readonly INVALID_EMAIL_MESSAGE = 'Digite um email válido';

  async createAndSave(user: ICreateUser) {
    const passwordHash = await hashPassword(user.password);
    const newUser = this.create({
      ...user,
      password: passwordHash,
    });

    await this.save(newUser);
    return newUser;
  }

  async findOneByEmail(email: string) {
    const user = await this.findOne({ where: { email } });
    return user;
  }

  async checkIsUnique(name: string, value: string) {
    const where = {};
    where[name] = value;
    const data = await this.findOne({ where });

    if (data) {
      return false;
    }

    return true;
  }
}

export default UserRepository;
