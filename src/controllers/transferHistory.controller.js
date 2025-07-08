const { Transaction } = require('../models');

exports.getTransactionHistory = async (req, res) => {
  try {
    const { accountNumber } = req.params;
    // Find transactions where the user is either sender or receiver
    const transactions = await Transaction.find({
      $or: [
        { fromAccount: accountNumber },
        { toAccount: accountNumber }
      ]
    }).sort({ createdAt: -1 }); // Most recent first

    res.json({ accountNumber, transactions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};