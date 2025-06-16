const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Customer = sequelize.define('Customer', {
  customer_id: {
    type: DataTypes.STRING(20),
    primaryKey: true,
    allowNull: false
  },
  customer_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  segment: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  postal_code: {
    type: DataTypes.STRING(10),
    allowNull: false
  }
}, {
  tableName: 'customers',
  timestamps: false
});

module.exports = Customer;