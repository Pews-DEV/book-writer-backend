import { getCustomRepository } from 'typeorm';

import User from 'app/src/entities/User';

import UserRepository from '../repository/UserRepository';
import { ICreateUser } from '../@types';

class CreateUserService {
  async execute(user: ICreateUser): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    return await userRepository.createAndSave(user);
  }
}

export default CreateUserService;
