const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const recipeSchema = new Schema({
  name: { type: String, unique: true, required: true },
  brandId: { type: ObjectId, ref: "Brand" },
  price: { type: Number, required: true },
  ingredients: [{ type: ObjectId, ref: "Ingredient" }],
  recipePackaging: [{ type: ObjectId, ref: "Packaging" }],
  picture: {
    type: String,
    default: "./../public/images/default-recipe.png",
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
