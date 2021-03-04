const express = require("express");
const router = express.Router();

const createError = require("http-errors");

const User = require("../models/user.model");

// HELPER FUNCTIONS
const { isLoggedIn, isAdmin } = require("../helpers/middleware");

// POST '/api/users/create'
router.post("/create", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const {
      role,
      firstName,
      lastName,
      email,
      password,
      phone,
      street,
      city,
      postCode,
      profilePic,
    } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return next(createError(400)); // Bad Request
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      role,
      firstName,
      lastName,
      email,
      password: hashPass,
      phone,
      street,
      city,
      postCode,
      profilePic,
    });

    newUser.password = "*";

    res
      .status(201) // Created
      .json(newUser);
  } catch (error) {
    next(createError(error)); // Internal Server Error (by default)
  }
});

// GET '/api/users'
router.get("/", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users) return next(createError(404)); // Bad Request

    users.forEach((user) => {
      user.password = "*";
    });

    res.status(200).json(users);
  } catch (error) {
    next(createError(error)); // 500 Internal Server Error (by default)
  }
});

// GET '/api/users/:id'
router.get("/:id", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) return next(createError(404)); // Bad Request

    user.password = "*";
    res.status(200).json(user);
  } catch (error) {
    next(createError(error)); // 500 Internal Server Error (by default)
  }
});

// POST '/api/users/update/:id'
router.post("/update/:id", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.params.id;
    const {
      firstName,
      lastName,
      phone,
      street,
      city,
      postCode,
      profilePic,
    } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        phone,
        street,
        city,
        postCode,
        profilePic,
      },
      { new: true }
    );

    if (!user) return next(createError(404)); // Bad Request

    user.password = "*";
    res.status(200).json(user);
  } catch (error) {
    next(createError(error)); // 500 Internal Server Error (by default)
  }
});

// GET '/api/users/delete/:id'
router.get("/:id", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);

    if (!user) return next(createError(404)); // Bad Request

    res.status(200).json(user);
  } catch (error) {
    next(createError(error)); // 500 Internal Server Error (by default)
  }
});

module.exports = router;
