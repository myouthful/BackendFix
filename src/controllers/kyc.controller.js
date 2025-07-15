// controllers/kycController.js
const Kyc = require('../models/kyc');

const submitKYC = async (req, res) => {
  try {
    const { nin, votersCard, passport, driversLicense, address } = req.body;
    const utilityBill = req.file;

    
    const hasValidId = nin || votersCard || passport || driversLicense;

    if (!hasValidId || !address || !utilityBill) {
      return res.status(400).json({
        message: 'At least one form of ID (NIN, Voter’s Card, Passport, or Driver’s License), address, and utility bill are required.',
      });
    }

    
    const kyc = new Kyc({
      nin,
      votersCard,
      passport,
      driversLicense,
      address,
      utilityBillPath: utilityBill.path,
    });

    await kyc.save();

    return res.status(201).json({
      message: 'KYC submitted successfully',
      data: kyc,
    });
  } catch (err) {
    console.error('Error in KYC submission:', err);
    return res.status(500).json({ message: 'Server error during KYC submission' });
  }
};

module.exports = {
  submitKYC,
};
