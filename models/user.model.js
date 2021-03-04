const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
//const geocoder = require("../utils/geocoder");

const userSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["client", "employee"],
    },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: Number, unique: true, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      postCode: { type: Number, required: true },
    },
    currentCart: {
      type: [
        {
          recipeId: { type: ObjectId, ref: "Recipe" },
          quantity: Number,
        },
      ],
      default: [],
    },

    profilePic: {
      type: String,
      default: "https://image.flaticon.com/icons/png/128/3135/3135715.png",
    },
    // location: {
    //   type: {
    //     type: String,
    //     enum: ["point"],
    //   },
    //   // coordinates: {
    //   //   type: [Number],
    //   //   index: "2dsphere",
    //   // },
    //   formattedAddress: { type: String, required: true },
    // },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
// //. Geocode and create location
// //.pre --> it happens before it is saved in the database
// userSchema.pre("save", async function (next) {
//   const location = await geocoder.geocode(this.address);
//   //format as a Point
//   this.location = {
//     type: "Point",
//     coordinates: [location[0].longitude, location[0].latitude],
//     formattedAddress: location[0].formattedAddress,
//   };
//   next();
// });

const User = mongoose.model("User", userSchema);

module.exports = User;
