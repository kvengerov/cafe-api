const express = require('express');
const upload = require('../middleware/upload');
const passport = require('passport');
const controller = require('../controllers/store');
const router = express.Router();

router.get('/', controller.getAll);
router.get('/search', controller.searchStore);
router.get('/:id', controller.getById);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove);
router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.create);
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.update);

module.exports = router;
