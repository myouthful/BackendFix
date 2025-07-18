/**
 * Generates a unique transaction reference number
 * Format: TX-YYYYMMDD-HHMMSS-XXXX
 * Where XXXX is a random 4-digit number
 */
const generateReference = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const random = Math.floor(1000 + Math.random() * 9000); // 4-digit random number

  return `TX-${year}${month}${day}-${hours}${minutes}${seconds}-${random}`;
};

module.exports = { generateReference };