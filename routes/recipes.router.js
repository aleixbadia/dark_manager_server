const express = require("express");
const router = express.Router();

const createError = require("http-errors");

const Recipe = require("../models/recipe.model");


const { isLoggedIn, isAdmin } = require("../helpers/middleware");


router.post("/create", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const {
      name,
      brandId,
      price,
      ingredients,
      recipePackaging,
      picture,
    } = req.body;

    const newRecipe = await Recipe.create({
      name,
      brandId,
      price,
      ingredients,
      recipePackaging,
      picture,
    });

    res
      .status(201) 
      .json(newRecipe);
  } catch (error) {
    next(createError(error)); 
  }
});

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const recipes = await Recipe.find();

    if (!recipes) return next(createError(404)); 

    res.status(200).json(recipes);
  } catch (error) {
    next(createError(error)); 
  }
});

router.get("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.params.id;
    const recipe = await Recipe.findById(id);

    if (!recipe) return next(createError(404)); 

    res.status(200).json(recipe);
  } catch (error) {
    next(createError(error)); 
  }
});

router.post("/update/:id", isLoggedIn, isAdmin,  async (req, res, next) => {
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

    if (!recipe) return next(createError(404)); 

    res.status(200).json(recipe);
  } catch (error) {
    next(createError(error)); 
  }
});

// GET '/api/recipes/delete/:id'
router.get("/delete/:id", isLoggedIn, isAdmin, async (req, res, next) => {
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