var mongo = require('mongoskin');
var db    = mongo.db('mongodb://localhost:27017/alexTest', {native_parser:true});
db.open(function(err) {
  if (err) {
    console.error('Could not connect to db', err);
    return;
  }
  console.log('Connected to mongodb://localhost:27017/alexTest');
});
module.exports = db;