var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var ipv4Schema = new Schema({
  ip_from: { type: Number},
  ip_to: { type: Number},
  country_code: String,
  country_name: String, 
  region_name: String,
  city_name: String,
  latitude: String,
  longitude: String,
  zip_code: String,
  time_zone: String
});

ipv4Schema.index({ip_from: 1, ip_to: 1}, {unique: true});

mongoose.model('ipv4', ipv4Schema);