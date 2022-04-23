import { createNewConnection } from '../app/src/database'

beforeAll(async () => {
  await createNewConnection()
})
