const createError = require('http-errors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Tenant = require('../Models/Tenant.model');

module.exports = {
  getAllTenants: async (req, res, next) => {
    try {
      const results = await Tenant.find({}, { __v: 0 });
      // const results = await Pg.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Pg.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createTenant: async (req, res) => {
    try {
      const tenant = new Tenant(req.body);
      const result = await tenant.save();
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

  getTenantsByPg: async (req, res) => {
    const pg = req.params.id;
    try {
      const result = await Tenant.find({ pg: pg });
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  },

  getTenantById: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await Tenant.findById(id);
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  }


};
