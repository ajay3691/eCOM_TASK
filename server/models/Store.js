import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    location: {
        type: String
    },
    image: {
        type: String
    },
    vanities: {
        type: [String]
    }
});

const Store = mongoose.model('Store', storeSchema);

export default Store;
