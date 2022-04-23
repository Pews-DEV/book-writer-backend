import CustomError from '@/errors';
import requestMock from '@/tests/__mocks__/request.mocks';
import getMockedResponse from '@/tests/__mocks__/response.mocks';
import errorHandle from '../errorConfig';

const response = getMockedResponse();
const request = requestMock;

describe('Testing ErrorConfig function', () => {
  it('checks if Error return correctly response', () => {
    const statusCode = 400;
    const errorMessage = 'test message error';
    const error = new CustomError(errorMessage, statusCode);

    const receivedResponse = errorHandle(error, request, response);

    expect(receivedResponse.req.body).toEqual({
      status: 'error',
      message: errorMessage,
    });
  });

  it('checks if Error assigns status code correctly in response', () => {
    const statusCode = 402;
    const errorMessage = 'test message error';
    const error = new CustomError(errorMessage, statusCode);

    const receivedResponse = errorHandle(error, request, response);

    expect(receivedResponse.statusCode).toEqual(statusCode);
  });
});
