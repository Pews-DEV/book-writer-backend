import { hash } from 'bcryptjs'
import { EntityRepository, Repository } from 'typeorm'

import User from '../../src/entities/User'
import { ICreateUser } from '../@types'


@EntityRepository(User)
class UserRepository extends Repository<User> {
    async createAndSave(user: ICreateUser) {
        const passwordHash = await hash(user.password, 8)
        
        this.handleValidation(user.email, user.username)

        const newUser = this.create({
          password: passwordHash,
          first_name: user.first_name, 
          last_name: user.last_name, 
          email: user.email, 
          username: user.username, 
          is_admin: user.is_admin
        })
        
        await this.save(newUser)

        return newUser
    }

    async handleValidation(email: string, username: string) {
        const isUsernameUnique = await this.findOne({ where: { username }})
        const isEmailUnique = await this.findOne({ where: { email }})

        if (isEmailUnique || isUsernameUnique) {
            throw new Error('existing username or email')
        }
    }

    async findOneByEmail(email: string) {
        const user = await this.findOne({ where: { email}})
        return user
    }

}

export default UserRepository;
