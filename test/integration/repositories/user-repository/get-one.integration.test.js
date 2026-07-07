import { sequelize } from '#configs/database';
import { seedWithTransaction } from '#test/helpers/seed-fixtures.js';
import usersFixture from '#test/fixtures/users.cjs';

const { UserRepository } = await import('#repositories/user.repository');

describe('UserRepository.getOne (integration)', () => {
  let rollback;
  const repo = new UserRepository();

  afterEach(async () => {
    if (rollback) await rollback();
  });

  afterAll(() => sequelize.close());

  it('finds a user by id', async () => {
    const ctx = await seedWithTransaction([{ table: 'users', rows: usersFixture.users }]);
    rollback = ctx.rollback;

    await ctx.run(async () => {
      const [seeded] = usersFixture.users;
      const result = await repo.getOne({ id: seeded.id }, { transaction: ctx.transaction });
      expect(result.email).toBe(seeded.email);
    });
  });

  it('returns null when no user matches', async () => {
    const ctx = await seedWithTransaction([{ table: 'users', rows: [] }]);
    rollback = ctx.rollback;

    await ctx.run(async () => {
      const result = await repo.getOne({ id: 999 }, { transaction: ctx.transaction });
      expect(result).toBeNull();
    });
  });
});
