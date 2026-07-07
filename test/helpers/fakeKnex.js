/**
 * Creates a fake knex-like query builder backed by an in-memory array.
 * Swapped into the Awilix container for integration tests so routes/schema/DI
 * wiring can be exercised via app.inject() without a real database.
 */
function createFakeKnex(seedRows = []) {
  const rows = seedRows.map((row) => ({ ...row }));
  let nextId = rows.reduce((max, row) => Math.max(max, row.id), 0) + 1;

  return function table() {
    return {
      select: async () => rows,

      where: (match) => ({
        first: async () => rows.find((row) => row.id === match.id),
        update: (data) => ({
          returning: async () => {
            const row = rows.find((r) => r.id === match.id);
            if (!row) return [];
            Object.assign(row, data, { updated_at: new Date().toISOString() });
            return [row];
          }
        }),
        del: async () => {
          const index = rows.findIndex((row) => row.id === match.id);
          if (index === -1) return 0;
          rows.splice(index, 1);
          return 1;
        }
      }),

      insert: (data) => ({
        returning: async () => {
          const row = {
            id: nextId++,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            ...data
          };
          rows.push(row);
          return [row];
        }
      })
    };
  };
}

module.exports = createFakeKnex;
