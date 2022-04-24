import { Request, Response } from 'express';
import * as yup from 'yup';

import yupErrorHandle from '@/utils/yup/errorHandler';
import validateSchema from '@/utils/yup/validateSchema';
import AuthenticateUserService from '../services/AuthenticateUserService';
import { IUserAuthetication } from '../@types';

class AuthenticateUserController {
  public static readonly schema = yup.object({
    body: yup.object({
      email: yup.string().required(),
      password: yup.string().required(),
    }),
  });

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      await validateSchema(AuthenticateUserController.schema, request);
      const user: IUserAuthetication = request.body;
      const authenticateUserService = new AuthenticateUserService();
      const token = await authenticateUserService.execute(user);
      return response.status(200).json(token);
    } catch (err) {
      return response.status(422).json(yupErrorHandle(err, 422));
    }
  }
}

export default AuthenticateUserController;
