const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  product_id: {
    type: DataTypes.STRING(50),
    primaryKey: true,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  sub_category: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  product_name: {
    type: DataTypes.STRING(200),
    allowNull: false
  }
}, {
  tableName: 'products',
  timestamps: false
});

module.exports = Product;