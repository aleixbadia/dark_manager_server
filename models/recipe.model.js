const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const recipeSchema = new Schema({
  name: { type: String, unique: true, required: true },
  brandId: { type: ObjectId, ref: "Brand" },
  price: { type: Number, required: true },
  ingredients: [
    {
      ingridientId: { type: ObjectId, ref: "Recipe" },
      quantity: Number,
    },
  ],
  recipePackaging: [
    {
      packagingId: { type: ObjectId, ref: "Recipe" },
      quantity: Number,
    },
  ],
  picture: {
    type: String,
    default: "https://findicons.com/files/icons/2502/food_icons/256/2.png",
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
