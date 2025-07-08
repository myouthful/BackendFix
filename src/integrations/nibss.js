// src/integrations/nibss.js
// Encapsulates all NIBSS API logic
const axios = require('axios');

const NIBSS_BASE_URL = process.env.NIBSS_BASE_URL || 'https://sandbox.nibss-plc.com.ng/api';

async function initiateTransaction(payload) {
 // customize more per nibss docs
  const response = await axios.post(`${NIBSS_BASE_URL}/transactions`, payload, {
    headers: {
      'Authorization': `Bearer ${process.env.NIBSS_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
}

//more NIBSS API methods needed

module.exports = { initiateTransaction };
