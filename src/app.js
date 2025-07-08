const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const logger = require('./utils/logger');
    



// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Load all middleware
require('./middleware')(app);


// Routes
const authRoutes = require('./routes/auth.routes');
const transactionRoutes = require('./routes/transaction.routes');
const accountLookupRoutes = require('./routes/lookupaccount.routes');
const transferHistoryRoutes = require('./routes/transferHistory.routes');
const lookupRoutes = require('./routes/lookup.routes');


app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/transactions', transferHistoryRoutes); // history endpoint
app.use('/api/lookup', lookupRoutes);
app.use('/api/lookupaccount', accountLookupRoutes);

app.use((req, res, next) => {
  logger.info(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Add 404 handler
app.use((req, res) => {
  logger.warn(`[404] Route not found: ${req.method} ${req.path}`);
  res.status(404).json({ message: 'Route not found' });
});


// Root endpoint
app.get('/', (req, res) => {
  res.send('Paylinkd Backend API is running');
});

module.exports = app;