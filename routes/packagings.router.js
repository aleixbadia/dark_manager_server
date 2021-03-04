const express = require("express");
const router = express.Router();

const createError = require("http-errors");

const Packaging = require("../models/packaging.model");

// HELPER FUNCTIONS
const { isLoggedIn, isAdmin } = require("../helpers/middleware");

// POST '/api/packagings/create'
router.post("/create", isLoggedIn, async (req, res, next) => {
  try {
    const {
        name,
        currentStock,
        minimum,
        price,
              
    } = req.body;

    // const user = await User.findOne({ email });                 // esto se hace en packagings?

    // if (user) {
    //   return next(createError(400)); // Bad Request
    // }

    // const salt = await bcrypt.genSalt(saltRounds);
    // const hashPass = await bcrypt.hash(password, salt);

    const newPackaging = await Packaging.create({
        name,
        currentStock,
        minimum,
        price,
    });

    res
      .status(201) // Created
      .json(newPackaging);
  } catch (error) {
    next(createError(error)); // Internal Server Error (by default)
  }
});

// GET '/api/packagings'
router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const packagings = await Packaging.find();

    if (!packagings) return next(createError(404)); // Bad Request

    res.status(200).json(packagings);
  } catch (error) {
    next(createError(error)); // 500 Internal Server Error (by default)
  }
});

// GET '/api/packagings/:id'
router.get("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.params.id;
    const packaging = await Packaging.findById(id);

    if (!packaging) return next(createError(404)); // Bad Request

    res.status(200).json(packaging);
  } catch (error) {
    next(createError(error)); // 500 Internal Server Error (by default)
  }
});

// POST '/api/packagings/update/:id'
router.post("/update/:id", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.params.id;
    const {
        name,
        currentStock,
        minimum,
        price,
    } = req.body;


    const packaging = await Packaging.findByIdAndUpdate(     // sin client
      id,
      {
        name,
        currentStock,
        minimum,
        price,
      },
      { new: true }
    );

    if (!packaging) return next(createError(404)); // Bad Request

    
    res.status(200).json(packaging);
  } catch (error) {
    next(createError(error)); // 500 Internal Server Error (by default)
  }
});

// GET '/api/packagings/delete/:id'
router.get("/delete/:id", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.params.id;
    const packaging = await Packaging.findByIdAndDelete(id);

    if (!packaging) return next(createError(404)); // Bad Request

    res.status(200).json(packaging);
  } catch (error) {
    next(createError(error)); // 500 Internal Server Error (by default)
  }
});

module.exports = router;
