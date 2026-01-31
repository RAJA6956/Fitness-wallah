const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    pullUps: {
      type: Number,
      default: 0
    },
    pushUps: {
      type: Number,
      default: 0
    },
    weightLifted: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Progress", progressSchema);
