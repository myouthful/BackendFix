const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');

module.exports = (app) => {
  // CORS Configuration
  app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));

  // Other middleware
  app.use(helmet());
  app.use(hpp());
  app.use(express.json());

  // Mount device-manager middleware (trust proxy, IP, fingerprint)
  require('./device-manager')(app);
};