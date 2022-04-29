import { Request, Response } from 'express';
import * as yup from 'yup';

import yupErrorHandle from '@/utils/yup/errorHandler';
import validateSchema from '@/utils/yup/validateSchema';
import CreateUserService from '../services/CreateUser';
import checkFieldExist from '../utils/checkFieldExist';

export default class CreateUserController {
  public static readonly schema = yup.object({
    body: yup.object({
      first_name: yup.string().required('O first_name é obrigatório'),
      last_name: yup.string().required('O last_name é obrigatório'),
      email: yup
        .string()
        .email('Insira um email válido')
        .required('O email é obrigatório')
        .test('exists', '${value} já está em uso', async value =>
          checkFieldExist('email', value),
        ),
      username: yup
        .string()
        .min(4, 'O username deve conter no minimo 3 caracteres')
        .required('O username é obrigatório')
        .test('exists', '${value} já está em uso', async value =>
          checkFieldExist('username', value),
        ),
      password: yup
        .string()
        .min(8, 'O password deve conter no minimo 8 caracteres')
        .required('O password é obrigatório'),
    }),
  });

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      await validateSchema(CreateUserController.schema, request);
      const userData = request.body;
      const createUser = new CreateUserService();
      const user = await createUser.execute(userData);

      return response.json({
        status_code: 201,
        success: true,
        data: user,
      });
    } catch (err) {
      return response.status(422).json(yupErrorHandle(err, 422));
    }
  }
}
