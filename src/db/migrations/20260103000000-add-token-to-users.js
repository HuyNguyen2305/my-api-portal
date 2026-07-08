import { DataTypes } from 'sequelize';

export async function up(queryInterface) {
  await queryInterface.addColumn('users', 'token', {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  });
}

export async function down(queryInterface) {
  await queryInterface.removeColumn('users', 'token');
}
