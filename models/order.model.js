const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const orderSchema = new Schema({
  clientId: { type: ObjectId, ref: "User" },
  cart: [
    {
      recipeId: { type: ObjectId, ref: "Recipe" },
      quantity: Number,
    },
  ],
  totalPrice: { type: Number },
  stage: {
    type: String,
    enum: ["New", "Cooking", "Delivery", "Done"],
    default: "New",
  },
  cookedBy: { type: ObjectId, ref: "User" },
  deliveredBy: { type: ObjectId, ref: "User" },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
