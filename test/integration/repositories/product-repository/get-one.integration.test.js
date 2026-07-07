import { sequelize } from '#configs/database';
import { seedWithTransaction } from '#test/helpers/seed-fixtures.js';
import productsFixture from '#test/fixtures/products.cjs';

const { ProductRepository } = await import('#repositories/product.repository');

describe('ProductRepository.getOne (integration)', () => {
  let rollback;
  const repo = new ProductRepository();

  afterEach(async () => {
    if (rollback) await rollback();
  });

  afterAll(() => sequelize.close());

  it('finds a product by id', async () => {
    const ctx = await seedWithTransaction([{ table: 'products', rows: productsFixture.products }]);
    rollback = ctx.rollback;

    await ctx.run(async () => {
      const [seeded] = productsFixture.products;
      const result = await repo.getOne({ id: seeded.id }, { transaction: ctx.transaction });
      expect(result.sku).toBe(seeded.sku);
    });
  });

  it('returns null when no product matches', async () => {
    const ctx = await seedWithTransaction([{ table: 'products', rows: [] }]);
    rollback = ctx.rollback;

    await ctx.run(async () => {
      const result = await repo.getOne({ id: 999 }, { transaction: ctx.transaction });
      expect(result).toBeNull();
    });
  });
});
