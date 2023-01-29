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
      const pg = new Pg(req.body);
      const result = await pg.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

  findPgById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const pg = await Pg.findById(id);
      // const pg = await Pg.findOne({ _id: id });
      if (!pg) {
        throw createError(404, 'Pg does not exist.');
      }
      res.send(pg);
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
  },

  getTenants: async (req, res, next) => {
    try {
      const results = await Pg.find({ _id: req.params.id }).populate("tenants");
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  }

};
