const { User } = require('../models');
const logger = require('../utils/logger');

exports.getAccountName = async (req, res) => {
  try {
    const { accountNumber } = req.query;
    logger.info('Looking up account:', accountNumber);

    //  
    if (!accountNumber) {
      return res.status(400).json({ message: 'Account number is required' });
    }

    // Convert accountNumber to string to ensure type matching
    const accountNumberString = accountNumber.toString();

    // 
    const user = await User.findOne({ accountNumber: accountNumberString });
    logger.info('User found:', user);

    if (!user) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.json({
      firstName: user.firstName,
      lastName: user.lastName
    });
  } catch (error) {
    logger.error('Lookup Error:', error);
    res.status(500).json({ message: error.message });
  }
};