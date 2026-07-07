import { DataTypes, Sequelize } from 'sequelize';

export async function up(queryInterface) {
  await queryInterface.createTable('products', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('products');
}
