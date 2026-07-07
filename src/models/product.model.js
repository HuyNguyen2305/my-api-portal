import { DataTypes, Model } from 'sequelize';
import { sequelize } from '#configs/database';

export class Product extends Model {}

Product.init(
  {
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
    }
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    underscored: true,
    timestamps: true
  }
);
