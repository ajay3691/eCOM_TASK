import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
  
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    }
});

export default mongoose.model('Product', productSchema);
