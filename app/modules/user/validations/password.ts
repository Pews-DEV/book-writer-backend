import getBodyField from '@/utils/express-validator/getBodyField'
import UserRepository from '../repository/UserRepository'

import { FIELD_VAR, LENGTH_VAR } from '../repository/defaults'

const PASSWORD_LENGTH_ERROR_MESSAGE = UserRepository.LENGTH_ERROR_MESSAGE
  .replace(FIELD_VAR, 'password')
  .replace(LENGTH_VAR, '8')

const password = getBodyField('password')

const passwordValidation = password
  .isLength({ min: 8 }).withMessage(PASSWORD_LENGTH_ERROR_MESSAGE)

export default passwordValidation
