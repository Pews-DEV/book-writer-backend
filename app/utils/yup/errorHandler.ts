import { ValidationError } from 'yup';

const yupErrorHandle = (
  error: ValidationError | Error,
  statusCode = 400,
  success = false,
) => {
  const normalBody = {
    status_code: statusCode,
    success,
  };

  if (error instanceof ValidationError) {
    return {
      ...normalBody,
      errors: error.inner.map(errorBundle => ({
        error: errorBundle.errors[0],
        param: errorBundle.path,
      })),
    };
  }

  return {
    ...normalBody,
    message: error.message,
  };
};

export default yupErrorHandle;
