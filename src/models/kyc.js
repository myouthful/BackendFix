const mongoose = require('mongoose');

const kycSchema = new mongoose.Schema({
  nin: { type: String },
  votersCard: { type: String },
  passport: { type: String },
  driversLicense: { type: String },
  address: { type: String, required: true },
  utilityBillPath: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Kyc', kycSchema);
