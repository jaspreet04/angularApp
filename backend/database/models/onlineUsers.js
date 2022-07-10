const mongoose = require("mongoose");

var OnlineUsersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "can't be blank"],
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
    },
    userId: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      index: true,
    },
    clientId: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      index: true,
    },
  },
  { timestamps: true }
);

const message = mongoose.model("OnlineUsers", OnlineUsersSchema);

module.exports = message;
