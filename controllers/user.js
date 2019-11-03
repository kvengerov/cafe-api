const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');

module.exports.getUserById = async (req, res) => {
  try {
      const user = await User.findById(req.params.id);
      res.status(200).json({user});
  } catch (error) {
      errorHandler(res, error);
  }
};
