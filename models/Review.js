const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: 'You review must text!'
    },
    storeId: {
        type: String,
        required: 'You must supply a store!'
    },
    authorId: {
        type: String,
        required: 'You must supply an author!'
    },
    authorName: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    imageSrc: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('reviews', reviewSchema);
