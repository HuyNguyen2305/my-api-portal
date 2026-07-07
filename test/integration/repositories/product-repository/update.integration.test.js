import { sequelize } from '#configs/database';
import { seedWithTransaction } from '#test/helpers/seed-fixtures.js';
import productsFixture from '#test/fixtures/products.cjs';

const { ProductRepository } = await import('#repositories/product.repository');

describe('ProductRepository.update (integration)', () => {
  let rollback;
  const repo = new ProductRepository();

  afterEach(async () => {
    if (rollback) await rollback();
  });

  afterAll(() => sequelize.close());

  it('updates an existing product', async () => {
    const ctx = await seedWithTransaction([{ table: 'products', rows: productsFixture.products }]);
    rollback = ctx.rollback;

    await ctx.run(async () => {
      const [seeded] = productsFixture.products;
      const updated = await repo.update(
        { id: seeded.id },
        { stock: 25 },
        { transaction: ctx.transaction }
      );
      expect(updated.stock).toBe(25);
    });
  });
});
