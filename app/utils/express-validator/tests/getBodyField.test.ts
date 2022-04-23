import getBodyField from '../getBodyField';

describe('Testing getBodyField function', () => {
  it('checks if returned field is a function', () => {
    const bodyField = getBodyField('Foo');

    expect(typeof bodyField).toBe('function');
  });
});
