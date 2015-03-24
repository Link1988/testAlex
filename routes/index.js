var express = require('express');
var router = express.Router();
var Data = require('../models/Data');

router.get('/data', function(req, res, next) {  
  db.collection('data').findOne({}, function(err, doc) {
    console.log(doc);
  });           
});

router.get('/data/:id', function (req, res, next){
  connection(function (err, db) {
    if (err) {
      throw err;
    }
    var id = req.params.id;    
    getData(db, id, function (err, data) {
      if (err) {
        res.send(500, err);
      } else {
        res.json(data);        
      }
    });        
  });
});



module.exports = router;
