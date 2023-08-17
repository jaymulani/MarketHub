const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        productName: String,
        productDescription: String,
        userId: String,
        price: String,
        isChatCreated: Boolean,
        chatId: String,
        image: String,
    },
    {
        timestamps: true,
    }
);

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;
