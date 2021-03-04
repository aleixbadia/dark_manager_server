const express = require("express");
const router = express.Router();

const createError = require("http-errors");

const User = require("../models/user.model");
const Order = require("../models/order.model");

// HELPER FUNCTIONS
const { isLoggedIn, isAdmin } = require("../helpers/middleware");

// POST '/api/orders/create'
router.post("/create", isLoggedIn, async (req, res, next) => {
  try {
  const {
  value,
  stage,
  client,
  orderPackaging,
  recipes,
  deliveredBy,
  cookedBy,
    } = req.body;

    // const user = await User.findOne({ email });                 // esto se hace en roders?

    // if (user) {
    //   return next(createError(400)); // Bad Request
    // }

    // const salt = await bcrypt.genSalt(saltRounds);
    // const hashPass = await bcrypt.hash(password, salt);

    const newOrder = await Order.create({
      value,
      stage,
      client,
      orderPackaging,
      recipes,
      deliveredBy,
      cookedBy,
    });

  

    res
      .status(201) // Created
      .json(newOrder);
  } catch (error) {
    next(createError(error)); // Internal Server Error (by default)
  }
});

// GET '/api/orders'
router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const orders = await Order.find();

    if (!orders) return next(createError(404)); // Bad Request

   
    res.status(200).json(orders);
  } catch (error) {
    next(createError(error)); // 500 Internal Server Error (by default)
  }
});

// GET '/api/orders/:id'
router.get("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id);

    if (!order) return next(createError(404)); // Bad Request

    res.status(200).json(order);
  } catch (error) {
    next(createError(error)); // 500 Internal Server Error (by default)
  }
});

// POST '/api/ordrs/update/:id'
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

    const user = await Order.findByIdAndUpdate(
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

    if (!order) return next(createError(404)); // Bad Request

    
    res.status(200).json(order);
  } catch (error) {
    next(createError(error)); // 500 Internal Server Error (by default)
  }
});

// GET '/api/users/delete/:id'
router.get("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await Order.findByIdAndDelete(id);

    if (!user) return next(createError(404)); // Bad Request

    res.status(200).json(user);
  } catch (error) {
    next(createError(error)); // 500 Internal Server Error (by default)
  }
});

module.exports = router;
