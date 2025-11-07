const express = require('express');
const Product = require('../models/product');
const productRouter = express.Router();

productRouter.post('/api/add-product', async (req, res) => {
    try {
        const { productName, productPrice, quantity, description, category, subCategory, images } = req.body;
        const product = new Product({ productName, productPrice, quantity, description, category, subCategory, images });
        await product.save();
        return res.status(201).send(product);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

productRouter.get('/api/product', async (req, res) => {

    try {
        const product = await Product.find({});
        return res.status(201).send(product);
    } catch (e) {
        res.status(500).json({})
    }
});

productRouter.get('/api/popular-products', async (req, res) => {

    try {
        const product = await Product.find({popular:true});
        if( !product || product.length == 0){
            return res.status(404).json({ msg: 'products not found' });
        }else{
        return res.status(201).send(product);
        }
    } catch (e) {
        res.status(500).json({})
    }
});

productRouter.get('/api/recommend-products', async (req, res) => {

    try {
        const product = await Product.find({recommend:false});
        if( !product || product.length == 0){
            return res.status(404).json({ msg: 'products not found' });
        }else{
        return res.status(201).send(product);
        }
    } catch (e) {
        res.status(500).json({})
    }
});

module.exports = productRouter;