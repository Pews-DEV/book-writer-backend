import { getCustomRepository } from 'typeorm'

import getBodyField from '@/utils/express-validator/getBodyField'
import { FIELD_VAR, LENGTH_VAR } from '../defaults'
import UserRepository from '../repository/UserRepository'

const INVALID_EMAIL_MESSAGE = UserRepository.INVALID_EMAIL_MESSAGE
const NON_UNIQUE_ERROR_MESSAGE = UserRepository.NON_UNIQUE_ERROR_MESSAGE
  .replace(FIELD_VAR, 'email')
const EMAIL_LENGTH_ERROR_MESSAGE = UserRepository.LENGTH_ERROR_MESSAGE
  .replace(FIELD_VAR, 'email')
  .replace(LENGTH_VAR, '5')

function checkEmailIsUnique(value) {
  const userRepository = getCustomRepository(UserRepository)
  const isUnique = userRepository
    .checkIsUnique('email', value)
    .then(isUnique => {
      if (!isUnique) {
        return Promise.reject()
      }
      return Promise.resolve()
    })
  return isUnique
}

const email = getBodyField('email')
const emailValidation = email
  .isEmail().withMessage(INVALID_EMAIL_MESSAGE)
  .isLength({ min: 5 }).withMessage(EMAIL_LENGTH_ERROR_MESSAGE)
  .custom(checkEmailIsUnique).withMessage(NON_UNIQUE_ERROR_MESSAGE)


export default emailValidation
