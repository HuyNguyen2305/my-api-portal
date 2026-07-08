import { DataTypes } from 'sequelize';

export async function up(queryInterface) {
  await queryInterface.addColumn('users', 'role', {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user'
  });
}

export async function down(queryInterface) {
  await queryInterface.removeColumn('users', 'role');
}
