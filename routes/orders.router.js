const express = require("express");
const router = express.Router();

const createError = require("http-errors");

const Brand = require("../models/brand.model");

// HELPER FUNCTIONS
const { isLoggedIn, isAdmin } = require("../helpers/middleware");

// POST '/api/brands/create'
router.post("/create", isLoggedIn, async (req, res, next) => {
  try {
    const { name } = req.body;

    const newBrand = await Brand.create({
      name,
    });

    res
      .status(201) // Created
      .json(newBrand);
  } catch (error) {
    next(createError(error)); // Internal Server Error (by default)
  }
});

// GET '/api/brands'
router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const brands = await Brand.find();

    if (!brands) return next(createError(404)); // Bad Request

    res.status(200).json(brands);
  } catch (error) {
    next(createError(error)); // 500 Internal Server Error (by default)
  }
});

// GET '/api/brands/:id'
router.get("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.params.id;
    const brand = await Brand.findById(id);

    if (!brand) return next(createError(404)); // Bad Request

    res.status(200).json(brand);
  } catch (error) {
    next(createError(error)); // 500 Internal Server Error (by default)
  }
});

// POST '/api/brands/update/:id'
router.post("/update/:id", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name } = req.body;

    const brand = await Brand.findByIdAndUpdate(
      // sin client
      id,
      {
        name,
      },
      { new: true }
    );

    if (!brand) return next(createError(404)); // Bad Request

    res.status(200).json(brand);
  } catch (error) {
    next(createError(error)); // 500 Internal Server Error (by default)
  }
});

// GET '/api/brands/delete/:id'
router.get("/delete/:id", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.params.id;
    const brand = await Brand.findByIdAndDelete(id);

    if (!brand) return next(createError(404)); // Bad Request

    res.status(200).json(brand);
  } catch (error) {
    next(createError(error)); // 500 Internal Server Error (by default)
  }
});

module.exports = router;
