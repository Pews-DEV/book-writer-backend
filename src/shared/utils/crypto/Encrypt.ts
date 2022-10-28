import crypto from 'crypto';

type IEncryptDTO = {
  password: string;
  saltPassword?: string | null;
};

export default function Encrypt({
  password,
  saltPassword,
}: IEncryptDTO): string {
  const salt = crypto.randomBytes(16).toString('base64');

  const hash = crypto
    .createHmac('sha512', saltPassword ?? salt)
    .update(password)
    .digest('base64');

  const encryptPassword = `${saltPassword ?? salt}$${hash}`;

  return encryptPassword;
}
