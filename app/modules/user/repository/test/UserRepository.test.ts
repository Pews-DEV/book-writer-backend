import { getCustomRepository } from 'typeorm';

import User from '@/src/entities/User';
import UserRepository from '../UserRepository';

let userRepository;

describe('Testing UserRepository', () => {
  beforeAll(async () => {
    const user = {
      first_name: 'Teste',
      last_name: 'Teste',
      email: 'email@teste.com',
      username: 'teste',
      password: 'teste',
    };

    userRepository = getCustomRepository(UserRepository);
    const userBundle = userRepository.create(user);
    await userRepository.save(userBundle);
  });

  afterAll(async () => {
    const createdUsersEmail = [
      'email@teste.com',
      'user@teste.com',
      'user2@teste.com',
    ];

    await userRepository.delete(
      createdUsersEmail.map(email => {
        return {
          email,
        };
      }),
    );
  });

  it('check if return true when a non registred field is passed', async () => {
    const nonExistentEmail = 'nonExistentEmail@email.com';
    const fieldName = 'email';
    const isUnique = await userRepository.checkIsUnique(
      fieldName,
      nonExistentEmail,
    );

    expect(isUnique).toBe(true);
  });

  it('check if pass a non registred email return false', async () => {
    const existentEmail = 'email@teste.com';
    const fieldName = 'email';
    const isUnique = await userRepository.checkIsUnique(
      fieldName,
      existentEmail,
    );

    expect(isUnique).toBe(false);
  });

  it('check if findOneByEmail will return an instance based on email', async () => {
    const existentEmail = 'email@teste.com';

    const userReceived = await userRepository.findOneByEmail(existentEmail);

    expect(userReceived).toBeInstanceOf(User);
  });

  it('check if createAndSave will persist data in db', async () => {
    const userData = {
      first_name: 'Teste',
      last_name: 'Teste',
      email: 'user@teste.com',
      username: 'user',
      password: 'teste',
    };

    await userRepository.createAndSave(userData);
    const userSelected = await userRepository.findOneByEmail(userData.email);

    expect(userSelected).toBeInstanceOf(User);
  });

  it('check if createAndSave will generate a user', async () => {
    const userData = {
      first_name: 'Teste',
      last_name: 'Teste',
      email: 'user2@teste.com',
      username: 'user2',
      password: 'teste',
    };

    const userBundle = await userRepository.createAndSave(userData);

    expect(userBundle).toBeInstanceOf(User);
  });
});
