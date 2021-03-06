const express = require("express");
const router = express.Router();

const createError = require("http-errors");

const Order = require("../models/order.model");
const Recipe = require("../models/recipe.model");
const User = require("../models/user.model");
const Ingredient = require("../models/ingredient.model");

// HELPER FUNCTIONS
const { isLoggedIn } = require("../helpers/middleware");

// POST '/api/orders/create'
router.post("/create", isLoggedIn, async (req, res, next) => {
  try {
    const { clientId, cart } = req.body;

    const allRecipes = await Recipe.find();
    let totalPrice = 0;
    console.log(cart[0].recipeId);
    cart.forEach(async (cartObj) => {
      allRecipes.forEach((recipe) => {
        if (cartObj.recipeId._id === String(recipe._id)) {
          totalPrice += recipe.price * cartObj.quantity;
        }
      });

      console.log("cartObj", cartObj.recipeId.ingredients);
      cartObj.recipeId.ingredients.forEach(async (ingredientObj) => {
        console.log("ingredientObj------------", ingredientObj.ingredientId);
        await Ingredient.findByIdAndUpdate(
          ingredientObj.ingredientId,
          { $inc: { currentStock: -ingredientObj.quantity*cartObj.quantity } },
          { new: true }
        );
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

    //CLEAR USER CURRENT CART
    const userId = req.session.currentUser._id;
    await User.findByIdAndUpdate(userId, { currentCart: [] }, { new: true });

    res.status(200).json(user);
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
    const orders = await Order.find()
      .populate("clientId")
      .populate("cart.recipeId");

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

// POST '/api/orders/update-stage/:id'
router.post("/update-stage/:id", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.params.id;
    const { stage, userId } = req.body;
    let order;
    if (stage === "Cooking" || stage === "New") {
      order = await Order.findByIdAndUpdate(
        id,
        { stage, cookedBy: null, deliveredBy: null },
        { new: true }
      );
    } else if (stage === "Delivery") {
      order = await Order.findByIdAndUpdate(
        id,
        { stage, cookedBy: userId, deliveredBy: null },
        { new: true }
      );
    } else if (stage === "Done") {
      order = await Order.findByIdAndUpdate(
        id,
        { stage, deliveredBy: userId },
        { new: true }
      );
    }
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

// meter esto en create ordre

router.get("/checkout", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;

    //CLEAR USER CURRENT CART
    await User.findByIdAndUpdate(userId, { currentCart: [] }, { new: true });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});
