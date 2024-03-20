const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: String,
  type: String, // e.g., 'Contractor', 'Dealer', 'Designer'
  location: String,
  pincode: String,
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
