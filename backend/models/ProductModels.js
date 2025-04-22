const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    product_name: { type: String, required: true },
    product_price: { type: Number, required: true },
    product_overview: { type: String },
    product_count: { type: Number, default: 0 }
});

const ProductModel = mongoose.model('products', ProductSchema);
module.exports = ProductModel;
