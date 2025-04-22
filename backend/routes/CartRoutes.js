const express = require('express')
const router = express.Router();
const authMiddleware = require('../middleware/AuthMiddleware')
const CartModel = require('../models/CartModels')


router.get('/getallcart', authMiddleware, async (req, res) => {
    try {
        const cart = await CartModel.findOne({ userId: req.userId });
        if (!cart) {
            return res.status(200).json({ message: 'cart is empthy', items: [] });
        }

        res.json(cart);

    } catch (error) {
        console.log("Internal error", error)
        res.status(500).json({ message: "Internal Server Error" });
    }
})

router.post('/select', authMiddleware, async (req, res) => {


    const { productId, name, price, quantity } = req.body;
    if (!productId || !name || !price || !quantity) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        let cart = await CartModel.findOne({ userId: req.userId });

        if (!cart) {
            cart = new CartModel({ userId: req.userId, items: [] });
        }

        const item = cart.items.find(item => item.productId.toString() === productId);
        if (item) {
            item.quantity += quantity;
        } else {
            cart.items.push({ productId, name, price, quantity });
        }

        await cart.save();

        res.status(201).json({ message: "Item added to cart", cart });
    } catch (error) {
        console.error("❌ Internal Server Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.delete('/cartD/:productId', authMiddleware, async (req, res) => {
    const { productId } = req.params;

    try {
        const cart = await CartModel.findOne({ userId: req.userId });
        if (!cart) {
            return res.status(400).json({ message: 'Cart not found' });
        }


        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        await cart.save();  // Save the updated cart

        res.status(200).json({ message: 'Item Removed Successfully' });

    } catch (error) {
        console.error("Internal Server Error", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});





module.exports = router;

