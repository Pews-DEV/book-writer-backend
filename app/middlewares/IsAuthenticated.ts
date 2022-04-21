import { NextFunction, Request, Response } from "express";

import { verify } from 'jsonwebtoken';
import { getCustomRepository } from "typeorm";
import UserRepository from "../user/repository/UserRepository";
import { IPayload } from "./@types/authentication";


export async function isAuthenticated(request: Request, response: Response, next: NextFunction){
    const authHeader = request.headers.authorization

    const [prefix, token] = authHeader[0].split(' ')

    if(!authHeader || prefix !== 'Bearer'){
        throw new Error('Not Unauthorized')
    }

    try{ 
        const { sub } = verify(token, process.env.SECRET_KEY) as IPayload
        const userRepository = getCustomRepository(UserRepository)

        const user = await userRepository.findOne(sub)
        
        if(!user){
          throw new Error('Not Found')
        } else {
          request.userID = sub
        }

        next()
    } catch {
        throw new Error('invalid token')
    }
}
