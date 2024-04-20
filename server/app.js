import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan'
import dotenv from 'dotenv';

import StoreRoute from './routes/StoreRoute.js';
import ProductRoute from './routes/ProductRoute.js'
import OrderRoute from './routes/OrderRoute.js'


const app = express();

//middilewere
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'))

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.get('/', (req, res) => {
    res.send("Welcome to the E-commerce API");
});

app.use("/store",StoreRoute)
app.use("/prod",ProductRoute)
app.use("/order",OrderRoute)


dotenv.config({ path: './config/config.env' })
let port = process.env.PORT
let host = process.env.HOST
let mongodb_url = process.env.MONGODB_URL

mongoose.connect(mongodb_url)
    .then(() => {
        console.log(`Mongo db conection Succesfull`)
    })
    .catch((err) => {
        console.log(`Mongo db Conection failed`)
    })

app.listen(port, host, (err) => {
    if (err) throw err
    console.log(`Server Running on http://${host}:${port}`)
})
