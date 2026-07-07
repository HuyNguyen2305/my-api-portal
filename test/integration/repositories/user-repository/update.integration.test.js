import { sequelize } from '#configs/database';
import { seedWithTransaction } from '#test/helpers/seed-fixtures.js';
import usersFixture from '#test/fixtures/users.cjs';

const { UserRepository } = await import('#repositories/user.repository');

describe('UserRepository.update (integration)', () => {
  let rollback;
  const repo = new UserRepository();

  afterEach(async () => {
    if (rollback) await rollback();
  });

  afterAll(() => sequelize.close());

  it('updates an existing user', async () => {
    const ctx = await seedWithTransaction([{ table: 'users', rows: usersFixture.users }]);
    rollback = ctx.rollback;

    await ctx.run(async () => {
      const [seeded] = usersFixture.users;
      const updated = await repo.update(
        { id: seeded.id },
        { name: 'Ada Lovelace' },
        { transaction: ctx.transaction }
      );
      expect(updated.name).toBe('Ada Lovelace');
    });
  });
});
