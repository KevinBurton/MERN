const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const geoSchema = new Schema({
  type: { type: String },
  coordinates: { type: [Number] }
});
const addressSchema = new Schema({
  street1: { type: String, trim: true },
  street2: { type: String, trim: true },
  city: { type: String, trim: true },
  state: { type: String, trim:true },
  zipcode: { type: String, trim: true }
});
const locationSchema = new Schema({
   address: { type: addressSchema },
   geo: { type: geoSchema }
});
const theaterSchema = new Schema({
  theaterId: { type: Number },
  location: { type: locationSchema }
}, {
  timestamps: true
});

const Theater = mongoose.model('Theaters', theaterSchema);

module.exports = Theater;
