import { compare } from 'bcryptjs';

async function checkPassword(password: string, hash: string) {
  return await compare(password, hash);
}

export default checkPassword;
