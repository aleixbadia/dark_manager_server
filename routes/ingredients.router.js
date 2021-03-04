const express = require("express");
const router = express.Router();

const createError = require("http-errors");

const Ingredient = require("../models/ingredient.model");

// HELPER FUNCTIONS
const { isLoggedIn, isAdmin } = require("../helpers/middleware");

// POST '/api/ingredients/create'
router.post("/create", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const { name, currentStock, minimum, priceKg } = req.body;

    const ingredient = await Ingredient.findOne({ name });

    if (ingredient) {
      return next(createError(400)); // Bad Request
    }

    const newIngredient = await Ingredient.create({
      name,
      currentStock,
      minimum,
      priceKg,
    });

    res
      .status(201) // Created
      .json(newIngredient);
  } catch (error) {
    next(createError(error)); // Internal Server Error (by default)
  }
});

// GET '/api/ingredients'
router.get("/", async (req, res, next) => {
  try {
    const ingredients = await Ingredient.find();

    res.status(200).json(ingredients);
  } catch (error) {
    next(createError(error)); // 500 Internal Server Error (by default)
  }
});

// GET '/api/ingredients/:id'
router.get("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.params.id;
    const ingredient = await Ingredient.findById(id);

    if (!ingredient) return next(createError(404)); // Bad Request

    res.status(200).json(ingredient);
  } catch (error) {
    next(createError(error)); // 500 Internal Server Error (by default)
  }
});

// POST '/api/ingredients/update/:id'
router.post("/update/:id", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, currentStock, minimum, priceKg } = req.body;

    const ingredient = await Ingredient.findByIdAndUpdate(
      id,
      {
        name,
        currentStock,
        minimum,
        priceKg,
      },
      { new: true }
    );

    if (!ingredient) return next(createError(404)); // Bad Request

    res.status(200).json(ingredient);
  } catch (error) {
    next(createError(error)); // 500 Internal Server Error (by default)
  }
});

// GET '/api/ingredients/delete/:id'
router.get("/delete/:id", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const id = req.params.id;
    const ingredient = await Ingredient.findByIdAndDelete(id);

    if (!ingredient) return next(createError(404)); // Bad Request

    res.status(200).json(ingredient);
  } catch (error) {
    next(createError(error)); // 500 Internal Server Error (by default)
  }
});

module.exports = router;
