import { body } from 'express-validator';

function getBodyField(name: string) {
  return body(name);
}

export default getBodyField;
