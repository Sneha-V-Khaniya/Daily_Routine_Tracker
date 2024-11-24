const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    email: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.error("Error while hashing: ", error);
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);
