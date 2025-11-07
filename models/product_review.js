const mongoose = require('mongoose');
const subCategory = require('./sub_category');

const ratingReviewSchema = mongoose.Schema({
    buyerId: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    fullName:{
        type: String,
        required: true
    },
    productId: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },

    review:{
        type:String,
        required:true
    }
});

const ProductReview = mongoose.model("ProductReview", ratingReviewSchema);
module.exports = ProductReview;