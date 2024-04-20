import express from 'express';
import Store from '../models/Store.js'

const StoreRoute = express.Router();
StoreRoute.post('/stores', async (req, res) => {
    const { name, location, image, vanities } = req.body;

    try {
        const existingStore = await Store.findOne({ name });
        if (existingStore) {
            return res.status(400).json({ message: 'A store with the same name already exists' });
        }

        const newStore = await Store.create({ name, location, image, vanities });
        res.status(201).json(newStore);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


StoreRoute.get('/stores', async (req, res) => {
    try {
        const stores = await Store.find();
        res.json(stores);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

StoreRoute.get('/stores/:id', async (req, res) => {
    try {
        const store = await Store.findById(req.params.id);
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }
        res.json(store);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

StoreRoute.put('/stores/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location, image, vanities } = req.body; 

        const store = await Store.findById(id);
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }

        if (name !== undefined) {
            store.name = name;
        }
        if (location !== undefined) {
            store.location = location;
        }
        if (image !== undefined) {
            store.image = image;
        }
        if (vanities !== undefined) {
            store.vanities = vanities;
        }

        const updatedStore = await store.save();
        res.json(updatedStore);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


StoreRoute.delete('/stores/:id', async (req, res) => {
    const { id } = req.params; 
    try {
        const deletedStore = await Store.findByIdAndDelete(id); 
        if (!deletedStore) {
            return res.status(404).json({ message: 'Store not found' }); 
        }

        res.json({ message: 'Store deleted' }); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' }); 
    }
});



export default StoreRoute;
