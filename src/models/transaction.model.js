const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    fromAccount: {
      type: String, // Sender's account number
      required: true,
    },
    toAccount: {
      type: String, // Receiver's account number
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    reference: {
      type: String, // Unique transaction reference
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);