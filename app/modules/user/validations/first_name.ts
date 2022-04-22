import getBodyField from '@/utils/express-validator/getBodyField'
import UserRepository from '../repository/UserRepository'

import { FIELD_VAR, LENGTH_VAR } from '../defaults'

const FIRST_NAME_LENGTH_ERROR_MESSAGE = UserRepository.LENGTH_ERROR_MESSAGE
  .replace(FIELD_VAR, 'first_name')
  .replace(LENGTH_VAR, '6')

const firstName = getBodyField('first_name')

const firstNameValidation = firstName
  .isLength({ min: 6 }).withMessage(FIRST_NAME_LENGTH_ERROR_MESSAGE)

export default firstNameValidation
 