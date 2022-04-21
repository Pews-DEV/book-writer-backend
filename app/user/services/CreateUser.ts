import UserRepository  from '../repository/UserRepository'

import User from '../../src/entities/User'
import { ICreateUser } from '../@types'
import { getCustomRepository } from 'typeorm'

class CreateUserService{
    async execute(user: ICreateUser): Promise<User> {
        const userRepository = getCustomRepository(UserRepository)
        return await userRepository.createAndSave(user)
    }
}

export default CreateUserService
