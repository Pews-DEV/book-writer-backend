import { Request, Response } from 'express';

import getResult from '@/utils/express-validator/getResult';
import validations from '../validations';
import UserServices from '../services';

export default class UserController {
  public static readonly VALIDATIONS = [
    validations.firstNameValidation,
    validations.lastNameValidation,
    validations.emailValidations,
    validations.usernameValidations,
    validations.passwordValidation,
  ];

  async create(request: Request, response: Response): Promise<Response> {
    const errors = getResult(request);

    if (!errors.isEmpty()) {
      return response.status(422).json({
        status_code: 422,
        success: false,
        errors: errors.array({
          onlyFirstError: true,
        }),
      });
    }

    try {
      const userData = request.body;
      const createUser = new UserServices.CreateUserService();
      const user = await createUser.execute(userData);

      return response.json({
        status_code: 201,
        success: true,
        data: user,
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}
