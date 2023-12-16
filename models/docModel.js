const mongoose = require("mongoose");

const docSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "user id is required"],
    },
    email: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const docModel = mongoose.model("Docs", docSchema);

module.exports = docModel;
