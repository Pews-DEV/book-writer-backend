import { EntityRepository, Repository } from 'typeorm'

import hash_password from 'app/utils/becrypt/hashPassword'
import User from 'app/src/entities/User'

import { ICreateUser } from '../@types'


@EntityRepository(User)
class UserRepository extends Repository<User> {
    async createAndSave(user: ICreateUser) {
        const passwordHash = await hash_password(user.password)
        
        this.handleValidation(user.email, user.username)

        const newUser = this.create({
          ...user,
          password: passwordHash,
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
