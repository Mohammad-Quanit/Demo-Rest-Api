const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      default: 'Anonymous',
      trim: true,
      unique: false,
      minlength: 3
    },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, unique: false, trim: true },
    role: { type: String, default: 'user', trim: true },
    isOnline: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Users', userSchema);
