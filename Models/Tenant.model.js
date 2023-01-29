const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TenantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  room_number: {
    type: Number,
  },
  pg: {
    type: Schema.Types.ObjectId,
    ref: 'Pg',
    required: true
  }
});

const Tenant = mongoose.model('tenant', TenantSchema);
module.exports = Tenant;
