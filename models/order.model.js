const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const orderSchema = new Schema({
  value: { type: Number },
  stage: {
    type: String,
    enum: ["New", "Cooking", "Delivery", "Done"],
    default: "New",
  },
  client: { type: ObjectId, ref: "User" },
  orderPackaging: [{ type: ObjectId, ref: "Packaging" }],
  recipes: [{ type: ObjectId, ref: "Recipe" }],
  deliveredBy: { type: ObjectId, ref: "User" },
  cookedBy: { type: ObjectId, ref: "User" },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
