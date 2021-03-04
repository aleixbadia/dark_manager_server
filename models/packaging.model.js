const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const packagingSchema = new Schema({
    name: { type: String, required: true },
    currentStock: { type: Number, required: true },
    minimum: { type: Number, required: true },
    price: { type: Number, required: true },
          
});


const Packaging = mongoose.model('Packaging', packagingSchema);

module.exports = Packaging;