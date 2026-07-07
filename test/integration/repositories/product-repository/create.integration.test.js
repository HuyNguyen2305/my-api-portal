import { sequelize } from '#configs/database';
import { seedWithTransaction } from '#test/helpers/seed-fixtures.js';

const { ProductRepository } = await import('#repositories/product.repository');

describe('ProductRepository.create (integration)', () => {
  let rollback;
  const repo = new ProductRepository();

  afterEach(async () => {
    if (rollback) await rollback();
  });

  afterAll(() => sequelize.close());

  it('creates a new product', async () => {
    const ctx = await seedWithTransaction([{ table: 'products', rows: [] }]);
    rollback = ctx.rollback;

    await ctx.run(async () => {
      const created = await repo.create(
        { name: 'Gadget', price: 19.99, sku: 'GAD-2', stock: 3 },
        { transaction: ctx.transaction }
      );
      expect(created.id).toBeDefined();
      expect(created.sku).toBe('GAD-2');
    });
  });
});
