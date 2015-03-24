var express     = require('express');
var router      = express.Router();
var request     = require('request');
var ObjectID    = require('mongodb').ObjectID;
var db          = require('../db');


var getRemoteData = function(cb) {
  var remoteUrl = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22YHOO%22%2C%22AAPL%22%2C%22GOOG%22%2C%22MSFT%22%2C%22IBM%22)%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';
  request(remoteUrl, function (err, response, body) {
    if (!err && response.statusCode == 200) {
      var data = JSON.parse(body);
      cb(null, data);            
    } else {
      cb(error, null);
    }
  });
};

var createDataCollection = function(db, cb) {
  db.createCollection('data', function(err, collection){
    if (err) {
      cb(err, null);
    } else {
      cb(null, collection);
    }
  });
};

var insertData = function(db){
  getRemoteData(function (err, data) {
    if (err) {
      throw err;
    }
    db.collection('data').insert(data, function (err, inserted) {
      if (err) {
        throw err;
      }        
      return db.close();
    });        
  });
};

var updateData = function(db) {
  var query = {};
  db.collection('data').findOne(query, function (err, doc) {
    if (err) {
      throw err;
    }
    if (!doc) {
      console.log("No documents found");
      db.close();
    }
    query['_id'] = doc._id;
    doc.lastUpdated = new Date();
    db.collection('data').update(query, doc, function (err, updated) {
      if (err) {
        throw err;
      }
      console.log("Document update: " + updated);
      db.close();
    });

  })
};

var getData = function(db, _id, cb) {  
  var newData;
  db.collection('data').findOne({ _id: new ObjectID(_id) }, { 
    "query.created": 1,
    "query.results.quote.symbol": 1,
    "query.results.quote.Ask": 1,
    "query.results.quote.Bid": 1,
    "query.results.quote.Change": 1,
    "query.results.quote.Name": 1,
      } , function (err, doc) {
        if (err) {
          cb(err, null);
        } 
        newData = JSON.stringify(doc);    
        cb(null, newData);                      
  });
};

router.get('/data', function(req, res, next) {  
  db.collection('data').findOne({}, function(err, doc) {
    console.log(doc);
  });
  /*
  connection(function (err, db){
    if (err){
      throw err;      
    }
    db.collections(function (err, collections) {
      if (err) {
        throw err;
      }          
      if (collections.length === 0) {
        createDataCollection(db, function(err, collection) {              
          if (err) {
            throw err;
          } else {
            insertData(db);
            res.send(200);
          }
        });             
      }         
    });          
  });
*/
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

setInterval(function () {
  connection(function (err, db) {
    if (err) {
      throw err;
    }    
    updateData(db);        
  });  
}, 30000);

module.exports = router;
