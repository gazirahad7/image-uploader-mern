const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { model } = require("mongoose");
const uploadsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
// module.exports = mongoose.model("uploads", uploadsSchema);
const Uploads = model("Uploads", uploadsSchema);
module.exports = Uploads;
