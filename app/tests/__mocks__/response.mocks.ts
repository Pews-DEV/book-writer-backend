import { Response } from 'express';

const getMockedResponse = () => {
  const res = {
    req: {},
  } as Response;

  res.status = jest.fn().mockImplementation((status: number) => {
    res.statusCode = status;
    return res;
  });
  res.json = jest.fn().mockImplementation((payload: unknown) => {
    res.req.body = payload;
    return res;
  });

  return res;
};

export default getMockedResponse;
