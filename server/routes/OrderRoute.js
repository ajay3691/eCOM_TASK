import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js'; 


const OrderRoute = express.Router();

OrderRoute.post('/orders', async (req, res) => {
    const { customerName, product, quantity, status } = req.body;

    try {
        const existingProduct = await Product.findById(product);
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (quantity > existingProduct.quantity) {
            return res.status(400).json({ message: 'Ordered quantity exceeds available quantity' });
        }

        const newOrder = await Order.create({ customerName, product, quantity, status });

        existingProduct.quantity -= quantity;
        await existingProduct.save();

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

OrderRoute.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

OrderRoute.get('/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

OrderRoute.put('/orders/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { customerName, product, quantity, status } = req.body;

        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (customerName !== undefined) {
            order.customerName = customerName;
        }
        if (product !== undefined) {
            order.product = product;
        }
        if (quantity !== undefined) {
            order.quantity = quantity;
        }
        if (status !== undefined) {
            order.status = status;
        }

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

OrderRoute.delete('/orders/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default OrderRoute;
