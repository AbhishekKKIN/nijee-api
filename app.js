const express = require('express');
const createError = require('http-errors');
const dotenv = require('dotenv').config();
const cors = require('cors');
const config = require('config');

const app = express();

if (!config.get('PrivateKey')) {
  console.error('FATAL ERROR: PrivateKey is not defined.');
  process.exit(1);
}

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Initialize DB
require('./initDB')();

const PgsRoute = require('./Routes/Pg.route');
app.use('/pgs', PgsRoute);

const UsersRoute = require('./Routes/User.route');
app.use('/user', UsersRoute);

const AuthRoute = require('./Routes/Auth.route');
app.use('/auth', AuthRoute);


//404 handler and pass to error handler
app.use((req, res, next) => {
  /*
  const err = new Error('Not found');
  err.status = 404;
  next(err);
  */
  // You can use the above code if your not using the http-errors module
  next(createError(404, 'Not found'));
});

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT + '...');
});
