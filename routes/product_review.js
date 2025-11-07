const express = require('express');
const ProductReview = require('../models/product_review');
const productReviewRouter = express.Router();

productReviewRouter.post('/api/product-review', async (req, res) => {
    try {
        const { buyerId, email, fullName, productId,rating,review } = req.body;
        const productReview = new ProductReview({ buyerId, email, fullName, productId,rating,review });
        await productReview.save();
        return res.status(201).send(productReview);
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
});


productReviewRouter.get('/api/product-reviews', async (req, res) => {
    try {
        const productReview = await ProductReview.find();
        return res.status(201).send(productReview);
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
});



module.exports = productReviewRouter;