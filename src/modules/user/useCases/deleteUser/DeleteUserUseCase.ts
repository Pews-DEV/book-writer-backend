import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found');
    }

    await this.userRepository.delete(user.id);
  }
}
