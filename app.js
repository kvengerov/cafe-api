const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

// routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const storeRoutes = require('./routes/store');
const reviewRoutes = require('./routes/review');


const app = express();

// connect to db
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('Mongo db connected'))
    .catch(error => console.log(error))

app.use(passport.initialize());
require('./middleware/passport')(passport);

// HTTP request logger middleware for node.js
app.use(require('morgan')('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS
app.use(require('cors')());

// connected routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (req, res) => res.redirect('api-doc'));

module.exports = app;