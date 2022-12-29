const createError = require('http-errors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../Models/User.model');

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const results = await User.find({}, { __v: 0 });
      // const results = await Pg.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Pg.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewUser: async (req, res, next) => {
    try {
      // Check if this user already exisits
      let check = await User.findOne({ email: req.body.email });
      if (check) {
        return res.status(400).send('That user already exisits!');
      } else {
        const user = new User(req.body);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        const result = await user.save();
        res.send(result);
      }
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }

    /*Or:
  If you want to use the Promise based approach*/
    /*
  const product = new Pg({
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => {
      console.log(err.message);
    }); 
    */
  },

  findUserById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id);
      // const user = await Pg.findOne({ _id: id });
      if (!user) {
        throw createError(404, 'User does not exist.');
      }
      res.send(user);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid User id'));
        return;
      }
      next(error);
    }
  },

  updateAPg: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Pg.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Pg does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Pg Id'));
      }

      next(error);
    }
  },

  deleteAPg: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Pg.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'Pg does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Pg id'));
        return;
      }
      next(error);
    }
  }
};
