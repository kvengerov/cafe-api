const Store = require('../models/Store');
const errorHandler = require('../utils/errorHandler');

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports.searchStore = async (req, res) => {
    if(req.query.name) {
        try {
            const regex = new RegExp(escapeRegex(req.query.name), 'gi');
            const result = await Store.findOne({name: regex});
            if (result !== null) {
                res.status(200).json({result});
            } else {
                res.status(404).json({
                    message: 'Store not found'
                });
            }
        } catch (error) {
            errorHandler(res, error)
        }
    } else {
        try {
            const result = await Store.find(req.params.getAll);
            res.status(200).json({result})
        } catch (error) {
            errorHandler(res, error)
        }
    }
};

module.exports.getAll = async (req, res) => {
    if (req.query.sort) {
        try {
            const result = await Store.find(req.params.getAll).sort(req.query.sort);
            res.status(200).json({result});
        } catch (error) {
            errorHandler(res, error)
        }
    } else {
        try {
            const result = await Store.find(req.params.getAll)
            res.status(200).json({result})
        } catch (error) {
            errorHandler(res, error)
        }
    }
};

module.exports.getById = async (req, res) => {
    try {
        const store = await Store.findById(req.params.id);
        res.status(200).json({store});
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports.remove = async (req, res) => {
    try {
        await Store.remove({ _id: req.params.id });
        res.status(200).json({
            message: 'Store deleted'
        })
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports.create = async (req, res) => {
    const store = new Store({
        name: req.body.name,
        description: req.body.description,
        user: req.user.id,
        tags: req.body.tags,
        location: req.body.location,
        phone: req.body.phone,
        type: req.body.type,
        imageSrc: req.file ? req.file.path : '' 
    });
    try {
        await store.save();
        res.status(201).json(store);
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports.update = async (req, res) => {
    const updated = {
        name: req.body.name,
        description: req.body.description,
        tags: req.body.tags,
        location: req.body.location,
        phone: req.body.phone,
        type: req.body.type,
    };
    if (req.file) {
        updated.imageSrc = req.file.path
    }
    try {
        const store = await Store.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        );
        res.status(200).json(store)
    } catch (error) {
        errorHandler(res, error)
    }
};
