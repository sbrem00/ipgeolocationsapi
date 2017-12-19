var express = require('express'),
mongoose = require('mongoose'),
fs = require('fs');

require('dotenv').config();
require('./prototypes');

var mongoUri = process.env.DB_HOST;
mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('Unable to connect to database at ' + mongoUri);
});

var app = express();

// app.configure(function(){
//   app.use(express.bodyParser());
// });


require('./models/ipv4');
require('./routes')(app);



app.listen(3001);
console.log('Listening on port 3001...');