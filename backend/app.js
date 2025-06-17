const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './config/.env' });

const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const apiRoutes = require('./routes');
app.use('/api/v1', apiRoutes);

// Start server
async function startServer() {
  try {
    await sequelize.authenticate();
    app.listen(PORT, () => {
      console.log(`📊 Dashboard API: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to database:', error);
    process.exit(1);
  }
}

startServer();