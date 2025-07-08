const { User } = require('../models');

exports.lookupAccount = async (req, res) => {
  try {
    const { accountNumber } = req.body;

    const user = await User.findOne({ accountNumber });
    if (!user) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // Return minimal user info for security
    res.json({
      balance: user.balance
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};