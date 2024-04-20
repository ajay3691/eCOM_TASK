import express from 'express';
import Product from '../models/Product.js';

const ProductRoute = express.Router();

ProductRoute.post('/products', async (req, res) => {
    const { name, price, quantity, store } = req.body;

    try {
        const newProduct = await Product.create({ name, price, quantity, store });
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

ProductRoute.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

ProductRoute.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

ProductRoute.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, quantity } = req.body;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (name !== undefined) {
            product.name = name;
        }
        if (price !== undefined) {
            product.price = price;
        }
        if (quantity !== undefined) {
            product.quantity = quantity;
        }

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

ProductRoute.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default ProductRoute;
