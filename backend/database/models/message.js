const mongoose = require("mongoose");

var MessageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, "can't be blank"],
      index: true,
    },
    from: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"],
        index: true,
    },
    to: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      index: true,
    }

  },
  { timestamps: true }
);

const message = mongoose.model("Message", MessageSchema);

module.exports = message;