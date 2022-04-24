import { Request, Response } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';
import { IUserAuthetication } from '../@types';

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user: IUserAuthetication = request.body;
    const authenticateUserService = new AuthenticateUserService();
    const token = await authenticateUserService.execute(user);

    return response.status(200).json(token);
  }
}

export default AuthenticateUserController;
