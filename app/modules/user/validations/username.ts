import { getCustomRepository } from 'typeorm'

import getBodyField from '@/utils/express-validator/getBodyField'
import UserRepository from '../repository/UserRepository'
import { FIELD_VAR, LENGTH_VAR } from '../repository/defaults'

const NON_UNIQUE_ERROR_MESSAGE = UserRepository.NON_UNIQUE_ERROR_MESSAGE
  .replace(FIELD_VAR, 'username')
const LENGHT_ERROR_MESSAGE = UserRepository.LENGTH_ERROR_MESSAGE
  .replace(FIELD_VAR, 'username')
  .replace(LENGTH_VAR, '1')

const username = getBodyField('username')

const usernameValidation = username
  .isLength({min: 1}).withMessage(LENGHT_ERROR_MESSAGE)
  .custom((value) => {
    const userRepository = getCustomRepository(UserRepository)
    const isUnique = userRepository
      .checkIsUnique('username', value)
      .then(res => {
        if (!res) {
          return Promise.reject()
        }
        return Promise.resolve()
      })

    return isUnique
  }).withMessage(NON_UNIQUE_ERROR_MESSAGE)

export default usernameValidation
