import { Request, Response } from 'express';

import Error from '@/errors';

function errorHandle(error: Error, _request: Request, response: Response) {
  return response.status(error.statusCode).json({
    message: error.message,
    status: 'error',
  });
}

export default errorHandle;
