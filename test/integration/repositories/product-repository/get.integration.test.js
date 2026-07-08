import { sequelize } from '#configs/database';
import { seedWithTransaction } from '#test/helpers/seed-fixtures.js';
import productsFixture from '#test/fixtures/products.cjs';

const { ProductRepository } = await import('#repositories/product.repository');

describe('ProductRepository.get (integration)', () => {
  let rollback;
  const repo = new ProductRepository();

  afterEach(async () => {
    if (rollback) await rollback();
  });

  afterAll(() => sequelize.close());

  it('returns all seeded products', async () => {
    const ctx = await seedWithTransaction([{ table: 'products', rows: productsFixture.products }]);
    rollback = ctx.rollback;

    await ctx.run(async () => {
      const seededIds = productsFixture.products.map((product) => product.id);
      const result = await repo.get({ id: seededIds }, { transaction: ctx.transaction });
      expect(result.map((product) => product.sku).sort()).toEqual(
        productsFixture.products.map((product) => product.sku).sort()
      );
    });
  });
});
