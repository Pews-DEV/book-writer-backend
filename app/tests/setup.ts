import { createNewConnection } from '@/src/database';

beforeAll(async () => {
  await createNewConnection();
});
