const express = require("express");
const router = express.Router();

const createError = require("http-errors");

const Order = require("../models/order.model");
const Recipe = require("../models/recipe.model");

// HELPER FUNCTIONS
const { isLoggedIn } = require("../helpers/middleware");

// POST '/api/orders/create'
router.post("/create", isLoggedIn, async (req, res, next) => {
  try {
    const { clientId, cart } = req.body;

    const allRecipes = await Recipe.find();
    let totalPrice = 0;
    cart.forEach((cartObj) => {
      allRecipes.forEach((recipe) => {
        if (cartObj.recipeId === recipe._id) {
          totalPrice += recipe.price;
        }
      });
    });

    const newOrder = await Order.create({
      clientId,
      cart,
      totalPrice,
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

// GET '/api/orders/populated'
router.get("/populated", isLoggedIn, async (req, res, next) => {
  try {
    const orders = await Order.find().populate("clientId").populate('cart.recipeId');

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

// POST '/api/orders/update/:id'
router.post("/update/:id", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.params.id;
    const {
      totalPrice,
      stage,
      clientId,
      orderPackaging,
      cart,
      deliveredBy,
      cookedBy,
    } = req.body;

    const order = await Order.findByIdAndUpdate(
      // sin clientId
      id,
      {
        totalPrice,
        stage,
        clientId,
        orderPackaging,
        cart,
        deliveredBy,
        cookedBy,
      },
      { new: true }
    );

    if (!order) return next(createError(404)); // Bad Request

    res.status(200).json(order);
  } catch (error) {
    next(createError(error)); // 500 Internal Server Error (by default)
  }
});

// GET '/api/orders/delete/:id'
router.get("/delete/:id", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await Order.findByIdAndDelete(id);

    if (!order) return next(createError(404)); // Bad Request

    res.status(200).json(order);
  } catch (error) {
    next(createError(error)); // 500 Internal Server Error (by default)
  }
});

module.exports = router;
