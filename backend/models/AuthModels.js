const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // Use bcryptjs

const UserAuth = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Ensure unique emails
    password: { type: String, required: true }
});

// Hash password before saving
UserAuth.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const UserModel = mongoose.model('UserAuth', UserAuth);
module.exports = UserModel;
