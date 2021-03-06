require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/user.model");
const Brand = require("../models/brand.model");
const Order = require("../models/order.model");
const Recipe = require("../models/recipe.model");
const Packaging = require("../models/packaging.model");
const Ingredient = require("./../models/ingredient.model");

const bcrypt = require("bcryptjs");
const saltRounds = 10;

let userIds = [];
let orderIds = [];
let brandIds = [];
let ingredientIds = [];
let packagingIds = [];
let recipeIds = [];

// MONGOOSE CONNECTION
// 1. CONNECT TO DB
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then((db) => {
    // 2. DROP THE DATABASE TO CLEAR IT
    console.log("Connected to the DB");
    const pr = db.connection.dropDatabase();
    return pr;
  })
  .then(() => {
    // INSERT THE DATA TO DB (RUN THE SEED)
    const users = [
      {
        role: "client",
        name: {
          firstName: "Miguel",
          lastName: "Calvo",
        },
        email: "miguel@email.com",
        password: "miguel123",
        phone: 612345678,
        address: {
          street: "Carrer Pamplona 96",
          city: "Barcelona",
          postCode: 08123,
        },
        currentCart: [],

        profilePic: "https://image.flaticon.com/icons/png/128/3135/3135715.png",
        // location: {
        //   type: "point",

        //   coordinates: 	41.38879,
        //   formattedAddress: 'Carrer Pamplona',
        // },
      },
  

      {
        role: "employee",
        name: {
          firstName: "Aleix",
          lastName: "Badia",
        },
        email: "aleix@email.com",
        password: "aleix123",
        phone: 698765432,
        address: {
          street: "Carrer Pamplona 69",
          city: "Barcelona",
          postCode: 08123,
        },
        currentCart: [],
        profilePic: "https://image.flaticon.com/icons/png/128/3135/3135715.png",

        // location: {
        //   type: "point",

        //   coordinates: 	41.38879,
        //   formattedAddress: 'Carrer Pamplona',
        // },
      },
   
    ];

   // 3. CREATE THE USERS DOCUMENTS
    users.forEach((user) => {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(user.password, salt);
      user.password = hashedPassword;
    });

    const pr = User.create(users);
    return pr;
  })
  .then((createdUsers) => {
    console.log(`Created ${createdUsers.length} users.`);
    createdUsers.forEach((user) => {
      userIds.push(user._id);
    });
    console.log(userIds);
    return;
  })

  .then(() => {
    // INSERT THE DATA TO DB (RUN THE SEED)
    const ingredients = [
      {
        name: "Flour",
        currentStock: 10,
        minimum: 5,
        priceKg: 0.5,
      },
      {
        name: "Mozzarela",
        currentStock: 4,
        minimum: 2,
        priceKg: 12,
      },
      {
        name: "Parmesan",
        currentStock: 4,
        minimum: 2,
        priceKg: 17,
      },
      {
        name: "Gorgonzola",
        currentStock: 4,
        minimum: 2,
        priceKg: 15,
      },
      {
        name: "Fontina",
        currentStock: 4,
        minimum: 2,
        priceKg: 15,
      },
      {
        name: "Tomato sauce",
        currentStock: 12,
        minimum: 6,
        priceKg: 2,
      },
      {
        name: "Anchovies",
        currentStock: 20,
        minimum: 10,
        priceKg: 20,
      },
      {
        name: "Olives",
        currentStock: 20,
        minimum: 10,
        priceKg: 2,
      },
      {
        name: "Artichokes",
        currentStock: 3,
        minimum: 1,
        priceKg: 1,
      },
      {
        name: "Mushrooms",
        currentStock: 2,
        minimum: 0.5,
        priceKg: 5,
      },
      {
        name: "Ham",
        currentStock: 20,
        minimum: 10,
        priceKg: 2,
      },
      {
        name: "Bread",
        currentStock: 100,
        minimum: 50,
        priceKg: 2,
      },
      {
        name: "Beef",
        currentStock: 10,
        minimum: 5,
        priceKg: 12,
      },
      {
        name: "Tomato",
        currentStock: 20,
        minimum: 10,
        priceKg: 2,
      },
      {
        name: "Lettuce",
        currentStock: 20,
        minimum: 10,
        priceKg: 2,
      },
      {
        name: "Cheddar",
        currentStock: 5,
        minimum: 3,
        priceKg: 15,
      },
      {
        name: "Onion",
        currentStock: 20,
        minimum: 10,
        priceKg: 2,
      },
      {
        name: "Potato",
        currentStock: 10,
        minimum: 5,
        priceKg: 2,
      },
      {
        name: "Avocado",
        currentStock: 10,
        minimum: 5,
        priceKg: 4,
      },
      {
        name: "Jalapeño",
        currentStock: 20,
        minimum: 10,
        priceKg: 2,
      },
      {
        name: "Pulled pork",
        currentStock: 8,
        minimum: 4,
        priceKg: 12,
      },
      {
        name: "BBQ sauce",
        currentStock: 5,
        minimum: 2,
        priceKg: 3,
      },
    ];

    // 3. CREATE THE INGREDIENT DOCUMENTS
    const pr = Ingredient.create(ingredients);
    return pr;
  })
  .then((createdIngredients) => {
    console.log(`Created ${createdIngredients.length} ingredients.`);

    createdIngredients.forEach((ingredient) => {
      ingredientIds.push(ingredient._id);
    });
    console.log(ingredientIds);
    return;
  })
  .then(() => {
    // INSERT THE DATA TO DB (RUN THE SEED)
    const packagings = [
      {
        name: "Pizza box",
        currentStock: 40,
        minimum: 20,
        price: 0.3,
      },
      {
        name: "Paper wrap",
        currentStock: 100,
        minimum: 50,
        price: 0.05,
      },
      {
        name: "Plastic bag",
        currentStock: 100,
        minimum: 50,
        price: 0.05,
      },
      {
        name: "Paper napkin",
        currentStock: 200,
        minimum: 100,
        price: 0.05,
      },
      {
        name: "Fries box",
        currentStock: 50,
        minimum: 30,
        price: 0.1,
      },
    ];

    //  CREATE THE PACKAGING DOCUMENTS
    const pr = Packaging.create(packagings);
    return pr;
  })
  .then((createdPackagings) => {
    console.log(`Created ${createdPackagings.length} packagings.`);

    createdPackagings.forEach((packaging) => {
      packagingIds.push(packaging._id);
    });
    console.log(packagingIds);
    return;
  })

  .then(() => {
    // INSERT THE DATA TO DB (RUN THE SEED)
    const brands = [
      {
        name: "Mandele",
        nameUrl: "mandele",   
        brandPic: "https://i.pinimg.com/originals/77/02/19/7702196ab95a607e21f5a685fb8188a1.png"     
      },
      {
        name: "Pizza Garden",
        nameUrl: "pizza_garden",
        brandPic: "https://static.wixstatic.com/media/614fa5_c6e0a53f299047cf9de35188e9c30190~mv2.png/v1/fill/w_183,h_49,al_c,q_85,usm_4.00_1.00_0.00/logo_garden_web.webp"
      },
      {
        name: "Burger Hostel",
        nameUrl: "burger_hostel",
        brandPic: "https://burgerhostel.com/wp-content/uploads/2020/10/cropped-IMG_0073-2048x867.png"
      },
    ];

    // 3. CREATE THE BRAND DOCUMENTS
    const pr = Brand.create(brands);
    return pr;
  })
  .then((createdBrands) => {
    console.log(`Created ${createdBrands.length} brands.`);

    createdBrands.forEach((brand) => {
      brandIds.push(brand._id);
    });
    console.log(brandIds);
    return;
  })

  .then(() => {
    // INSERT THE DATA TO DB (RUN THE SEED)
    const recipes = [
      ////////////  pizzas
      {
        name: "Margarita",
        brandId: brandIds[1],
        price: 9,
        ingredients: [ingredientIds[0], ingredientIds[1], ingredientIds[5]],
        recipePackaging: [packagingIds[1], packagingIds[2]],
        picture: "./../public/images/default-recipe.png",
      },
      {
        name: "Puttanesca",
        brandId: brandIds[1],
        price: 11,
        ingredients: [ingredientIds[0], ingredientIds[1], ingredientIds[5]],
        recipePackaging: [packagingIds[1], packagingIds[1]],
        picture: "./../public/images/default-recipe.png",
      },

      {
        //////////////  burgers
        name: "Classic",
        brandId: brandIds[2],
        price: 8,
        ingredients: [
          ingredientIds[11],
          ingredientIds[12],
          ingredientIds[13],
          ingredientIds[14],
          ingredientIds[15],
        ],
        recipePackaging: [packagingIds[1], packagingIds[3]],
        picture: "./../public/images/default-recipe.png",
      },
      {
        name: "Chicken burger",
        brandId: brandIds[2],
        price: 8,
        ingredients: [
          ingredientIds[11],
          ingredientIds[22],
          ingredientIds[13],
          ingredientIds[14],
          ingredientIds[15],
        ],
        recipePackaging: [packagingIds[1], packagingIds[3]],
        picture: "./../public/images/default-recipe.png",
      },

      ////////   andele

      {
        name: "French fries",
        brandId: brandIds[0],
        price: 4,
        ingredients: [ingredientIds[17]],
        recipePackaging: [packagingIds[3], packagingIds[4]],
        picture: "./../public/images/default-recipe.png",
      },
    ];

    // 3. CREATE THE RECIPES DOCUMENTS
    const pr = Recipe.create(recipes);
    return pr;
  })
  .then((createdRecipes) => {
    console.log(`Created ${createdRecipes.length} recipes.`);
    createdRecipes.forEach((recipe) => {
      recipeIds.push(recipe._id);
    });
    console.log(recipeIds);
    return;
  })

  .then(() => {
    // INSERT THE DATA TO DB (RUN THE SEED)
    const orders = [
      {
        value: 12,
        stage: "New",
        client: userIds[0],
        orderPackaging: [packagingIds[3], packagingIds[4]],
        recipes: [recipeIds[2], recipeIds[4]],
      },
    ];

    // 3. CREATE THE ORDERS DOCUMENTS
    const pr = Order.create(orders);
    return pr;
  })
  .then((createdOrders) => {
    createdOrders.forEach((order) => {
      orderIds.push(order._id);
    });
    console.log(`Created ${createdOrders.length} orders.`);
    console.log("DB Creation Fully Ready");
    mongoose.connection.close();
  })
  
  .catch((err) => console.log("Error connection to the DB", err));

//node bin/seeds.js
