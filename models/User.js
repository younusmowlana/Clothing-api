const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: false, unique: true },
    lname: { type: String, required: false, unique: true },
    username: { type: String, required: false, unique: true },
    email: { type: String, required: false, unique: true },
    password: { type: String, required: false },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: { type: String},
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);