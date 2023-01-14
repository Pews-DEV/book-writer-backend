import { ICreateUserDTO } from '@modules/user/dtos/ICreateUserDTO';
import { IUpdateUserDTO } from '@modules/user/dtos/IUpdateUserDTO';
import { UserRepository } from '@modules/user/repositories/implementations/UserRepository';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import {
  Context,
  createMockContext,
  MockContext,
} from '@shared/infra/database/context';

describe('', () => {
  let mockCtx: MockContext;
  let ctx: Context;

  let sut: IUserRepository;

  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
    sut = new UserRepository(ctx);
  });

  describe('Create', () => {
    it('should be create a new user ', async () => {
      const user = {
        id: 'any_id',
        firstName: 'any_first_name',
        lastName: 'any_last_name',
        email: 'any_email',
        userName: 'any_user_name',
        password: 'any_password',
        isAdmin: true,
        created_at: new Date('2022-08-23T17:33:38.232Z'),
        updated_at: new Date('2022-08-23T17:33:38.232Z'),
      };

      mockCtx.prisma.user.create.mockResolvedValueOnce(user);

      const data: ICreateUserDTO = {
        firstName: 'any_first_name',
        lastName: 'any_last_name',
        email: 'any_email',
        userName: 'any_user_name',
        password: 'any_password',
        isAdmin: true,
      };

      const request = await sut.create(data);

      expect(request).toEqual(user);
    });
  });

  describe('Update', () => {
    it('Should be update user', async () => {
      const user = {
        id: 'any_id',
        firstName: 'any_first_name',
        lastName: 'any_last_name',
        email: 'any_email',
        userName: 'any_user_name',
        password: 'any_password',
        isAdmin: true,
        created_at: new Date('2022-08-23T17:33:38.232Z'),
        updated_at: new Date('2022-08-23T17:33:38.232Z'),
      };

      mockCtx.prisma.user.update.mockResolvedValueOnce(user);

      const data: IUpdateUserDTO = {
        id: 'any_id',
        firstName: 'any_first_name',
        lastName: 'any_last_name',
        email: 'any_email',
        userName: 'any_user_name',
        password: 'any_password',
        isAdmin: true,
      };

      const request = await sut.update(data);

      expect(request).toEqual(user);
    });
  });

  describe('Find by Id', () => {
    it('Should be return user by id', async () => {
      const user = {
        id: 'any_id',
        firstName: 'any_first_name',
        lastName: 'any_last_name',
        email: 'any_email',
        userName: 'any_user_name',
        password: 'any_password',
        isAdmin: true,
        created_at: new Date('2022-08-23T17:33:38.232Z'),
        updated_at: new Date('2022-08-23T17:33:38.232Z'),
      };

      mockCtx.prisma.user.findUnique.mockResolvedValueOnce(user);

      const request = await sut.findById('any_id');

      expect(request).toEqual(user);
    });
  });

  describe('Find by Email', () => {
    it('Should be return user by Email', async () => {
      const user = {
        id: 'any_id',
        firstName: 'any_first_name',
        lastName: 'any_last_name',
        email: 'any_email',
        userName: 'any_user_name',
        password: 'any_password',
        isAdmin: true,
        created_at: new Date('2022-08-23T17:33:38.232Z'),
        updated_at: new Date('2022-08-23T17:33:38.232Z'),
      };

      mockCtx.prisma.user.findUnique.mockResolvedValueOnce(user);

      const request = await sut.findByEmail('any_email');

      expect(request).toEqual(user);
    });
  });

  describe('Delete', () => {
    it('Should be delete user by Id', async () => {
      const user = {
        id: 'any_id',
        firstName: 'any_first_name',
        lastName: 'any_last_name',
        email: 'any_email',
        userName: 'any_user_name',
        password: 'any_password',
        isAdmin: true,
        created_at: new Date('2022-08-23T17:33:38.232Z'),
        updated_at: new Date('2022-08-23T17:33:38.232Z'),
      };

      mockCtx.prisma.user.findUnique.mockResolvedValueOnce(user);

      const request = await sut.findByEmail('any_email');

      expect(request).toEqual(user);
    });
  });
});
