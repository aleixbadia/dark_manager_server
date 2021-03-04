const express = require("express");
const router = express.Router();

const createError = require("http-errors");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const User = require("../models/user.model");

const { isLoggedIn, isAdmin } = require("../helpers/middleware");

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
      return next(createError(400));
    }

    const name = { firstName, lastName };
    const address = { street, city, postCode };

    const salt = await bcrypt.genSalt(saltRounds);
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      role,
      name,
      email,
      password: hashPass,
      phone,
      address,
      profilePic,
    });

    newUser.password = "*";

    res.status(201).json(newUser);
  } catch (error) {
    next(createError(error));
  }
});

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users) return next(createError(404));

    users.forEach((user) => {
      user.password = "*";
    });

    res.status(200).json(users);
  } catch (error) {
    next(createError(error));
  }
});

router.get("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) return next(createError(404));

    user.password = "*";
    res.status(200).json(user);
  } catch (error) {
    next(createError(error));
  }
});

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

    const name = { firstName, lastName };
    const address = { street, city, postCode };

    const user = await User.findByIdAndUpdate(
      id,
      {
        name,
        phone,
        address,
        profilePic,
      },
      { new: true }
    );

    if (!user) return next(createError(404));

    user.password = "*";
    res.status(200).json(user);
  } catch (error) {
    next(createError(error));
  }
});

router.get("/delete/:id", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);

    if (!user) return next(createError(404));

    res.status(200).json(user);
  } catch (error) {
    next(createError(error));
  }
});

module.exports = router;
