const express = require('express');
const router = express.Router();
const ProductModel = require('../models/ProductModels');
const mongoose = require('mongoose');

// ✅ Fetch all products
router.get('/allproduct', async (req, res) => {
    try {
        const allProducts = await ProductModel.find({});

        if (!allProducts || allProducts.length === 0) {
            return res.status(404).json({ message: 'Products not found' });
        }

        res.status(200).json({ message: 'All data fetched successfully', data: allProducts });

    } catch (error) {
        console.error("Server side error", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});




router.get('/mains/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Received ID in Backend:", id); // Debugging

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID format" });
        }

        const product = await ProductModel.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("Server Side Error:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;
