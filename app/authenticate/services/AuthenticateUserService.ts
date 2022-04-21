import { compare } from "bcryptjs"
import { getCustomRepository } from "typeorm"
import { sign } from 'jsonwebtoken'

import UserRepository from "../../modules/user/repository/UserRepository"
import { IUserAuthetication } from "../@types"

class AuthenticateUserService{
    async execute(requestUser: IUserAuthetication){
        const { email, password } = requestUser
        const userRepository =  getCustomRepository(UserRepository)

        const user = await userRepository.findOneByEmail(email)

        if (!user) {
            throw new Error('404 - Não encontrado')
        }
        
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error('401 - Dados Incorretos')
        }

        const token = sign({}, process.env.SECRET_KEY, {
            subject: user.id,
            expiresIn: "1d"
        })

        return {
            "access": token,
            status_code: 200
        }
    }
}

export default AuthenticateUserService
