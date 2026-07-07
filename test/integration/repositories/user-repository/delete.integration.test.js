import { sequelize } from '#configs/database';
import { seedWithTransaction } from '#test/helpers/seed-fixtures.js';
import usersFixture from '#test/fixtures/users.cjs';

const { UserRepository } = await import('#repositories/user.repository');

describe('UserRepository.delete (integration)', () => {
  let rollback;
  const repo = new UserRepository();

  afterEach(async () => {
    if (rollback) await rollback();
  });

  afterAll(() => sequelize.close());

  it('removes an existing user', async () => {
    const ctx = await seedWithTransaction([{ table: 'users', rows: usersFixture.users }]);
    rollback = ctx.rollback;

    await ctx.run(async () => {
      const [seeded] = usersFixture.users;
      const deletedCount = await repo.delete({ id: seeded.id }, { transaction: ctx.transaction });
      expect(deletedCount).toBe(1);

      const remaining = await repo.getOne({ id: seeded.id }, { transaction: ctx.transaction });
      expect(remaining).toBeNull();
    });
  });
});
