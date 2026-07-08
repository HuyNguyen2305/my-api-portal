import { jest } from '@jest/globals';

const sequelizeMock = { query: jest.fn() };
jest.unstable_mockModule('#configs/database', () => ({ sequelize: sequelizeMock }));

const { promoteAdmin } = await import('#src/db/promote-admin');

describe('promoteAdmin', () => {
  it('promotes a user to admin and returns the updated row', async () => {
    const updated = { id: 2, email: 'carol@example.com', role: 'admin' };
    sequelizeMock.query.mockResolvedValue([updated]);

    const result = await promoteAdmin('carol@example.com');

    expect(sequelizeMock.query).toHaveBeenCalledWith(
      expect.stringContaining('UPDATE users SET role'),
      expect.objectContaining({
        replacements: { role: 'admin', email: 'carol@example.com' }
      })
    );
    expect(result).toEqual(updated);
  });

  it('returns null when no user matches the email', async () => {
    sequelizeMock.query.mockResolvedValue([]);

    const result = await promoteAdmin('missing@example.com');

    expect(result).toBeNull();
  });
});
