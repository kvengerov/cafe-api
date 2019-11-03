const express = require('express');
const upload = require('../middleware/upload');
const passport = require('passport');
const controller = require('../controllers/review');
const router = express.Router();

router.get('/:id', controller.getById);
router.delete('/:id', controller.remove);
router.post('/', upload.single('image'), controller.create);
router.get('/', controller.getAll);

module.exports = router;
