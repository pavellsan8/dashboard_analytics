const sequelize = require('../config/database');
const Location = require('./location');
const Customer = require('./customer');
const Product = require('./product');
const Transaction = require('./transaction');

// Define associations
Location.hasMany(Customer, { foreignKey: 'postal_code' });
Customer.belongsTo(Location, { foreignKey: 'postal_code' });

Customer.hasMany(Transaction, { foreignKey: 'customer_id' });
Transaction.belongsTo(Customer, { foreignKey: 'customer_id' });

Product.hasMany(Transaction, { foreignKey: 'product_id' });
Transaction.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = {
  sequelize,
  Location,
  Customer,
  Product,
  Transaction
};