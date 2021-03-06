const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brandSchema = new Schema({
  name: { type: String, required: true, unique: true },
  nameUrl: { type: String, required: true, unique: true },
  brandPic: { type: String, unique: true },
});

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
