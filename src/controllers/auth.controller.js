const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const { generateAccountNumber } = require('../utils/account');
const logger = require('../utils/logger');

// OTP controller (for future use, currently not implemented)

// Signup controller (no OTP)
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, bvn, password } = req.body;

    // Input validation
    if (!firstName || !lastName || !phone || !email || !bvn || !password) {
      return res.status(400).json({
        message: 'All fields are required',
        required: ['firstName', 'lastName', 'phone', 'email', 'bvn', 'password']
      });
    }

    // Check if user exists with more specific error messages
    const existingUser = await User.findOne({ $or: [{ email }, { phone }, { bvn }] });
    if (existingUser) {
      let message = 'User already exists: ';
      if (existingUser.email === email) message += 'Email is already registered';
      if (existingUser.phone === phone) message += 'Phone number is already registered';
      if (existingUser.bvn === bvn) message += 'BVN is already registered';
      
      return res.status(400).json({ message });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate account number
    const accountNumber = generateAccountNumber();

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      phone,
      email,
      bvn,
      password: hashedPassword,
      accountNumber,
      balance: 0
    });

    // Send welcome email
    await sendEmail(
      email,
      'Welcome to Paylinkd',
      `Dear ${firstName} ${lastName},\n\nYour account has been created successfully.\nYour account number is: ${accountNumber}`
    );

    res.status(201).json({
      message: 'Signup successful',
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        accountNumber: user.accountNumber,
        phone: user.phone
      }
    });

  } catch (error) {
    logger.error('Signup Error:', error);
    res.status(500).json({ 
      message: 'Signup failed',
      error: error.message 
    });
  }
};

// Login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Send login notification email
    await sendEmail(
      user.email,
      'New Login to Your Account',
      `Dear ${user.firstName},\n\nA new login was detected on your Paylinkd account.\nTime: ${new Date().toLocaleString()}`
    );

    // Return user data including firstName and lastName
    res.json({
      message: 'Login successful',
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        accountNumber: user.accountNumber,
        phone: user.phone
      }
    });
  } catch (error) {
    logger.error('Login Error:', error);
    res.status(500).json({ 
      message: 'Login failed',
      error: error.message 
    });
  }
};