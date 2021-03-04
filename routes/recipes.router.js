const express = require("express");
const router = express.Router();

const createError = require("http-errors");

const Recipe = require("../models/recipe.model");

// HELPER FUNCTIONS
const { isLoggedIn, isAdmin } = require("../helpers/middleware");

// POST '/api/recipes/create'
router.post("/create", isLoggedIn, async (req, res, next) => {
  try {
    const {
      name,
      brandId,
      price,
      ingredients,
      recipePackaging,
      picture,
    } = req.body;

    // const user = await User.findOne({ email });                 // esto se hace en roders?

    // if (user) {
    //   return next(createError(400)); // Bad Request
    // }

    // const salt = await bcrypt.genSalt(saltRounds);
    // const hashPass = await bcrypt.hash(password, salt);

    const newRecipe = await Recipe.create({
      name,
      brandId,
      price,
      ingredients,
      recipePackaging,
      picture,
    });

    res
      .status(201) // Created
      .json(newRecipe);
  } catch (error) {
    next(createError(error)); // Internal Server Error (by default)
  }
});

// GET '/api/recipes'
router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const recipes = await Recipe.find();

    if (!recipes) return next(createError(404)); // Bad Request

    res.status(200).json(recipes);
  } catch (error) {
    next(createError(error)); // 500 Internal Server Error (by default)
  }
});

// GET '/api/recipes/:id'
router.get("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.params.id;
    const recipe = await Recipe.findById(id);

    if (!recipe) return next(createError(404)); // Bad Request

    res.status(200).json(recipe);
  } catch (error) {
    next(createError(error)); // 500 Internal Server Error (by default)
  }
});

// POST '/api/recipes/update/:id'
router.post("/update/:id", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.params.id;
    const {
      name,
      brandId,
      price,
      ingredients,
      recipePackaging,
      picture,
    } = req.body;

    const recipe = await Recipe.findByIdAndUpdate(
      // sin client
      id,
      {
        name,
        brandId,
        price,
        ingredients,
        recipePackaging,
        picture,
      },
      { new: true }
    );

    if (!recipe) return next(createError(404)); // Bad Request

    res.status(200).json(recipe);
  } catch (error) {
    next(createError(error)); // 500 Internal Server Error (by default)
  }
});

// GET '/api/recipes/delete/:id'
router.get("/delete/:id", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.params.id;
    const recipe = await Recipe.findByIdAndDelete(id);

    if (!recipe) return next(createError(404)); // Bad Request

    res.status(200).json(recipe);
  } catch (error) {
    next(createError(error)); // 500 Internal Server Error (by default)
  }
});

module.exports = router;
