import { Result } from 'express-validator';

import getResult from '../getResult';
import requestMock from '@/tests/__mocks__/request.mocks';

describe('Testing getResult function', () => {
  it('check if getResult return a Result instance', () => {
    const result = getResult(requestMock);

    expect(result).toBeInstanceOf(Result);
  });
});
