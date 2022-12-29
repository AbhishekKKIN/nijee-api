const createError = require('http-errors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../Models/User.model');

module.exports = {
  authenticate: async (req, res, next) => {
    try {
      // find the user by their email address
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).send('Incorrect email or password.');
      } else {
        // Then validate the Credentials in MongoDB match
        // those provided in the request
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
          return res.status(400).send('Incorrect email or password.');
        }

        const token = jwt.sign({ _id: user._id }, config.get('PrivateKey'));
        user.password = undefined;
        res.header('x-auth-token', token).send(user);

      }
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }

  },
};
