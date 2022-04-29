import { Request, Response } from 'express';

import Error from '@/errors';

function errorHandle(error: Error, _request: Request, response: Response) {
  if (error instanceof Error) {
    return response.status(error.statusCode).json({
      message: error.message,
      status: 'error',
    });
  }

  return response.status(500).json({
    message: `Internal Server Error: ${error}`,
    status: 'error',
  });
}

export default errorHandle;
