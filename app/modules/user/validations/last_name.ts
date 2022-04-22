import getBodyField from '@/utils/express-validator/getBodyField'
import UserRepository from '../repository/UserRepository'

import { FIELD_VAR, LENGTH_VAR } from '../defaults'

const LAST_NAME_LENGTH_ERROR_MESSAGE = UserRepository.LENGTH_ERROR_MESSAGE
  .replace(FIELD_VAR, 'first_name')
  .replace(LENGTH_VAR, '6')

const lastName = getBodyField('last_name')

const lastNameValidation = lastName
  .isLength({ min: 6 }).withMessage(LAST_NAME_LENGTH_ERROR_MESSAGE)

export default lastNameValidation
