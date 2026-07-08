import { sequelize } from '#configs/database';
import { seedWithTransaction } from '#test/helpers/seed-fixtures.js';

const { UserRepository } = await import('#repositories/user.repository');

describe('UserRepository.create (integration)', () => {
  let rollback;
  const repo = new UserRepository();

  afterEach(async () => {
    if (rollback) await rollback();
  });

  afterAll(() => sequelize.close());

  it('creates a new user', async () => {
    const ctx = await seedWithTransaction([{ table: 'users', rows: [] }]);
    rollback = ctx.rollback;

    await ctx.run(async () => {
      const created = await repo.create(
        { name: 'Grace Hopper', email: 'grace@example.com', token: 'test-token-grace' },
        { transaction: ctx.transaction }
      );
      expect(created.id).toBeDefined();
      expect(created.email).toBe('grace@example.com');
    });
  });
});
