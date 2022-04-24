import { EntityRepository, Repository } from 'typeorm';

import hash_password from '@/utils/bcrypt/hashPassword';
import User from 'app/src/entities/User';

import { ICreateUser } from '../@types';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  async createAndSave(user: ICreateUser) {
    const passwordHash = await hash_password(user.password);
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

  async checkFieldExist(name: string, value: string) {
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
