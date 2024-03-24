const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  pincode: { type: String, required: true },
  availableThisWeek: { type: Boolean, default: false },
  certified: { type: Boolean, default: false },
  rating: { type: Number },
  virtualConsultations: { type: Boolean, default: false },
  servicesOffered: [{ type: String }], // example of an array of services
  contactEmail: { type: String },
  contactNumber: { type: String },
  // Add any other details you want for the company
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
