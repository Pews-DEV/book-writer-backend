import { Request, Response } from "express";

import UserServices from "../services";

export default class UserController {
    async create(request: Request, response: Response): Promise<Response> {
        try {
            const userData = request.body;
            const createUser = new UserServices.CreateUserService()
            const user = await createUser.execute(userData)

            return response.json({
                data: user,
                status_code: 201,
                success: true
            })

        } catch(err){
            console.log(err)
            throw new Error('Dados inválidos')
        }
    }
}

