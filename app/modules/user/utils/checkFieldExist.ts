import { getCustomRepository } from 'typeorm';

import UserRepository from '../repository/UserRepository';

const checkFieldExist = async (columnName: string, value: string) => {
  const userRepository = getCustomRepository(UserRepository);
  return await userRepository.checkFieldExist(columnName, value);
};

export default checkFieldExist;
