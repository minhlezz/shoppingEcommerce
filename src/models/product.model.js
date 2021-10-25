import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        trim: true
    },

    quantity: {
        type: Number,
        required: true,
        default: 0
    },

    price: {
        type: Number,
        required: true,
        default: 0.0,
    },

    image: {
        type: String,
        required: true
    },

    category: {
        type: String,
    },
    taste: {
        type: String
    },

}, {
    timestamps: true
});

const Product = model('Product', productSchema);

export default Product;