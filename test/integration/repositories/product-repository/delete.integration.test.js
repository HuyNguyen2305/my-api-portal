import { sequelize } from '#configs/database';
import { seedWithTransaction } from '#test/helpers/seed-fixtures.js';
import productsFixture from '#test/fixtures/products.cjs';

const { ProductRepository } = await import('#repositories/product.repository');

describe('ProductRepository.delete (integration)', () => {
  let rollback;
  const repo = new ProductRepository();

  afterEach(async () => {
    if (rollback) await rollback();
  });

  afterAll(() => sequelize.close());

  it('removes an existing product', async () => {
    const ctx = await seedWithTransaction([{ table: 'products', rows: productsFixture.products }]);
    rollback = ctx.rollback;

    await ctx.run(async () => {
      const [seeded] = productsFixture.products;
      const deletedCount = await repo.delete({ id: seeded.id }, { transaction: ctx.transaction });
      expect(deletedCount).toBe(1);

      const remaining = await repo.getOne({ id: seeded.id }, { transaction: ctx.transaction });
      expect(remaining).toBeNull();
    });
  });
});
