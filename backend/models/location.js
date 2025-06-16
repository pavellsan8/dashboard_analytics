const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Location = sequelize.define('Location', {
  postal_code: {
    type: DataTypes.STRING(10),
    primaryKey: true,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  state: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  region: {
    type: DataTypes.STRING(20),
    allowNull: false
  }
}, {
  tableName: 'locations',
  timestamps: false,
  freezeTableName: true
});

module.exports = Location;