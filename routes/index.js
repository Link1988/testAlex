var express = require('express');
var router = express.Router();
var Data = require('../models/Data')();

router.get('/data', function(req, res, next) {  
  Data.findData(function (err, data) {
    if (err) {
      res.send(500, err);
    } else {
      res.json(data);
    }
  });           
});

router.get('/data/:id', function (req, res, next){

    var id = req.params.id;    
    Data.getData(id, function (err, data) {
      if (err) {
        res.send(500, err);
      } else {
        res.json(data);        
      }
    });        
});



module.exports = router;
