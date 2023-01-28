const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PgSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  beds: {
    type: Number,
  },
  bedReservation: {
    type: Array
  }
});

const Product = mongoose.model('pg', PgSchema);
module.exports = Product;
