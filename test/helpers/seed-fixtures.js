import { sequelize } from '#configs/database';

export async function seedWithTransaction(tables) {
  const transaction = await sequelize.transaction();
  const queryInterface = sequelize.getQueryInterface();

  try {
    for (const { table, rows } of tables) {
      if (rows.length > 0) {
        await queryInterface.bulkInsert(table, rows, { transaction });
      }
    }
  } catch (error) {
    await transaction.rollback();
    throw error;
  }

  return {
    transaction,
    run: (fn) => fn(),
    rollback: () => transaction.rollback()
  };
}
