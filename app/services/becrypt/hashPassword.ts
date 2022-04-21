import { hash } from 'bcryptjs'

async function hash_password(password: string): Promise<string> {
  return await hash(password, 8)
}

export default hash_password
