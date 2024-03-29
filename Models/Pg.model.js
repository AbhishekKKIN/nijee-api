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
  tenants: [{
    type: Schema.Types.ObjectId,
    ref: 'Tenant'
  }]
});

const Product = mongoose.model('pg', PgSchema);
module.exports = Product;
