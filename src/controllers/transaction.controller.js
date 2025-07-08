const { User, Transaction } = require('../models');
const { generateReference } = require('../utils/transaction');
const sendEmail = require('../utils/sendEmail');

exports.transfer = async (req, res) => {
  try {
    const {fromAccount,accountNumber,amount,description} = req.body;
    const toAccount = accountNumber 
    // Validate input
    if (!toAccount || !amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid transfer details' });
    }

    // Find sender and receiver
    const sender = await User.findOne({ accountNumber: fromAccount });
    const receiver = await User.findOne({ accountNumber: toAccount });

    if (!sender) return res.status(404).json({ message: 'Sender account not found' });
    if (!receiver) return res.status(404).json({ message: 'Receiver account not found' });

    if (sender.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Generate reference
    const reference = generateReference();

    // Start transaction
    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    // Create transaction record
    const transaction = await Transaction.create({
      fromAccount,
      toAccount,
      amount,
      status: 'completed',
      reference,
      description,
    });

    // Send email notifications
    await sendEmail(
      sender.email,
      'Debit Alert',
      `You have sent ₦${amount} to account ${toAccount}.\nReference: ${reference}\nDescription: ${description || 'N/A'}`
    );

    await sendEmail(
      receiver.email,
      'Credit Alert',
      `You have received ₦${amount} from account ${fromAccount}.\nReference: ${reference}\nDescription: ${description || 'N/A'}`
    );

    res.status(200).json({
      message: 'Transfer successful',
      transactionId: transaction._id,
      reference,
      status: 'completed',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};