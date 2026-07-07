import { sequelize } from '#configs/database';
import { seedWithTransaction } from '#test/helpers/seed-fixtures.js';
import usersFixture from '#test/fixtures/users.cjs';

const { UserRepository } = await import('#repositories/user.repository');

describe('UserRepository.get (integration)', () => {
  let rollback;
  const repo = new UserRepository();

  afterEach(async () => {
    if (rollback) await rollback();
  });

  afterAll(() => sequelize.close());

  it('returns all seeded users', async () => {
    const ctx = await seedWithTransaction([{ table: 'users', rows: usersFixture.users }]);
    rollback = ctx.rollback;

    await ctx.run(async () => {
      const result = await repo.get({}, { transaction: ctx.transaction });
      expect(result.map((user) => user.email).sort()).toEqual(
        usersFixture.users.map((user) => user.email).sort()
      );
    });
  });
});
