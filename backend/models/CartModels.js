const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true },

    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductModel', required: true },
        name: String,
        price: Number,
        quantity: { type: Number, default: 1 }
    }]
})

const CartModel = mongoose.model('cart', CartSchema)

module.exports = CartModel;