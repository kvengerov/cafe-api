const Review = require('../models/Review');
const errorHandler = require('../utils/errorHandler');

module.exports.getById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        res.status(200).json({review});
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports.remove = async (req, res) => {
    try {
        await Review.remove({ _id: req.params.id });
        res.status(200).json({
            message: 'Review deleted'
        })
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports.create = async (req, res) => {
    const review = new Review({
        title: req.body.title,
        text: req.body.text,
        storeId: req.body.storeId,
        authorId: req.body.authorId,
        authorName: req.body.authorName,
        rating: req.body.rating,
        imageSrc: req.file ? req.file.path : '' 
    });
    try {
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports.getAll = async (req, res) => {
    if (req.query.sort) {
        try {
            const result = await Review.find(req.params.getAll).sort(req.query.sort);
            res.status(200).json({result})
        } catch (error) {
            errorHandler(res, error)
        }
    } else {
        try {
            const result = await Review.find(req.params.getAll)
            res.status(200).json({result})
        } catch (error) {
            errorHandler(res, error)
        }
    }
};
