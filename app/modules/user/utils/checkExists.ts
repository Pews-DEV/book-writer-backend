import { getCustomRepository } from 'typeorm';

import UserRepository from '../repository/UserRepository';

const checkExist = async (columnName: string, value: string) => {
  const userRepository = getCustomRepository(UserRepository);
  return await userRepository.checkExist(columnName, value);
};

export default checkExist;
