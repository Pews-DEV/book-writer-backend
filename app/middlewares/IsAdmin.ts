import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import UserRepository from "../modules/user/repository/UserRepository";

export async function IsAdmin(request: Request, response: Response, next: NextFunction){
    const user_id = request.userID;
    const userRepository = getCustomRepository(UserRepository)
    const { is_admin } = await userRepository.findOne(user_id);
    
    if(is_admin){
        next()
    }
    return response.status(401).json({
        error:"Unauthorized",
    });
}
