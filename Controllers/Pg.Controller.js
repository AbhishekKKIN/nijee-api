const createError = require('http-errors');
const mongoose = require('mongoose');

const Pg = require('../Models/Pg.model');

module.exports = {
  getAllPgs: async (req, res, next) => {
    try {
      const results = await Pg.find({}, { __v: 0 });
      // const results = await Pg.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Pg.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewPg: async (req, res, next) => {
    try {
      const product = new Pg(req.body);
      const result = await product.save();
      res.send(result);
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

  findPgById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const product = await Pg.findById(id);
      // const product = await Pg.findOne({ _id: id });
      if (!product) {
        throw createError(404, 'Pg does not exist.');
      }
      res.send(product);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Pg id'));
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
