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

router.get("/", isLoggedIn, isAdmin, async (req, res, next) => {
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
    const user = await User.findById(id).populate('currentCart.recipeId');

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

/// añadir al carro 
router.post("/addToCart", isLoggedIn, async (req, res, next) => {
  try {
    const id =req.session.currentUser._id;
    const { quantity, recipeId  } = req.body;
    

    const user = await User.findByIdAndUpdate(
      id ,
      { $push: { currentCart: { quantity, recipeId } }}, {new: true}
    ).populate('currentCart.recipeId');
    res.status(200).json(user)
    
  } catch (error) {
    next(createError(error));
  }
});

// borrar del carro
router.post("/deleteFromCart", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.session.currentUser._id;
    const { quantity, recipeId } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { $pull: { currentCart: { quantity, recipeId } } },{new: true}
    );

    res.status(200).json(user)
  } catch (error) {
    next(createError(error));
  }
});


   //////////////////////////////////////////////////////////////

router.get("/checkout", async (req, res, next) => {
  try {
    const logged = await checkLogin(req);
    const userId = req.session.currentUser._id;
    let subtotal = 0;

    //TAKE CURRENT CART INFO
    const user = await User.findById(userId).populate("currentCart.recipeId");

    user.currentCart.forEach(async (item) => {
      subtotal +=
        Math.round(
          (item.quantity * item.designId.price + Number.EPSILON) * 100
        ) / 100;

      await User.findByIdAndUpdate(
        item.designId.userId,
        { $inc: { com_points: 100 } },
        { new: true }
      );
    });
    let finalShipping = shipping * user.currentCart.length;
    let total = subtotal + finalShipping;

    //CREATE THE ORDER WITH CART INFO
    await Order.create({
      userId,
      cart: user.currentCart,
      subtotal,
      shipping: finalShipping,
      total,
    });

    //CLEAR USER CURRENT CART
    await User.findByIdAndUpdate(userId, { currentCart: [] }, { new: true });

    //ADD COMPOINTS TO DESIGNER

    res.render("shop/checkout", { logged });
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;
