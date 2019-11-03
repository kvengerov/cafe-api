const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async (req, res) => {
    const userCandidate = await User.findOne({email: req.body.email});
    if (userCandidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, userCandidate.password);
        if (passwordResult) {
            const token = jwt.sign({
                email: userCandidate.email,
                userId: userCandidate._id
            }, keys.jwt, {expiresIn: 60 * 60});

            res.status(200).json({
                token: `Bearer ${token}`,
                userId: userCandidate._id,
                username: userCandidate.username
            })
        } else {
            res.status(401).json({
                message: 'Password do not match'
            })
        }
    } else {
        res.status(404).json({
            message: 'User not found'
        })
    }
};


module.exports.register = async (req, res) => {
    // email
    // password

    const userCandidate = await User.findOne({email: req.body.email});

    if (userCandidate) {
        res.status(409).json({
            message: 'Email already exist'
        })
    } else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });
        try {
            await user.save();
            res.status(201).json(user);
        } catch(e) {
            errorHandler(res, e);
        }
        
    }
};
