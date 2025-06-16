const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaction = sequelize.define('Transaction', {
  row_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  order_id: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  order_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  ship_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  ship_mode: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  customer_id: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  product_id: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  sales: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'transactions',
  timestamps: false
});

module.exports = Transaction;