import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object';
import { ValidateOptions } from 'yup/lib/types';

const DEFAULT_OPTIONS: ValidateOptions = {
  abortEarly: false,
};

const validateSchema = async (
  schema: OptionalObjectSchema<ObjectShape>,
  request: unknown,
  options: ValidateOptions = DEFAULT_OPTIONS,
) => {
  return await schema.validate(request, options);
};

export default validateSchema;
