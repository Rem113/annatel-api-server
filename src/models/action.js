const mongoose = require("mongoose");
const { Schema } = mongoose;

const Action = new Schema({
  vendor: {
    type: Schema.Types.String,
    required: true
  },
  watchId: {
    type: Schema.Types.ObjectId,
    ref: "Watch"
  },
  length: {
    type: Schema.Types.Number,
    required: true
  },
  actionType: {
    type: Schema.Types.String,
    required: true
  },
  payload: {
    type: Object,
    default: {}
  },
  insertedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Action", Action, "Actions");
