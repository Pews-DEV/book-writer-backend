import UserRepository  from '../repository/UserRepository'

import User from '../../src/entities/User'
import { ICreateUser } from '../@types'
import { getCustomRepository } from 'typeorm'

class CreateUserService{
    async execute({ 
        first_name, 
        last_name, 
        email, 
        username, 
        password, 
        is_admin=false 
    }: ICreateUser): Promise<User> {
        const userRepository = getCustomRepository(UserRepository)
        return await userRepository.createAndSave({
            first_name, 
            last_name, 
            email, 
            username, 
            password, 
            is_admin
        })
    }
}

export default CreateUserService
