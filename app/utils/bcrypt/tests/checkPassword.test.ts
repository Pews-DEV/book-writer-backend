import checkPassword from '../checkPassowrd';
import hash_password from '../hashPassword';

describe('Testing checkPassword function', () => {
  it('check if checkPassword return true when password is equal', async () => {
    const password = 'teste';

    const passowrdHashed = await hash_password(password);
    const isEqual = await checkPassword(password, passowrdHashed);

    expect(isEqual).toBeTruthy();
  });
  it('check if checkPassword return false when password is not equal', async () => {
    const password = 'teste';
    const otherPassword = 'diferentpassowrd';

    const passowrdHashed = await hash_password(password);
    const isEqual = await checkPassword(otherPassword, passowrdHashed);

    expect(isEqual).toBeFalsy();
  });
});
