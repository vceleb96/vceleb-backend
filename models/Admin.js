const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  email: String,
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: true
  }
});

// password comparison helper
adminSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);
