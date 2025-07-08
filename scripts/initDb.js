const mongoose = require('mongoose');
const { User, Transaction } = require('../src/models');
require('dotenv').config();

async function initializeDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to database:', mongoose.connection.db.databaseName);

    // Create a test user
    const testUser = await User.create({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '1234567890',
      bvn: '12345678901',
      password: 'hashedpassword123',
      accountNumber: '1234567890',
      balance: 1000
    });
    console.log('Test user created:', testUser);

    // List collections after initialization
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections created:', collections.map(c => c.name));

  } catch (error) {
    console.error('Database initialization failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

initializeDatabase();