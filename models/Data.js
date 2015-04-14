var request     = require('request');
var ObjectID    = require('mongodb').ObjectID;
var db          = require('../db');

module.exports = function(){

	var consoleTest = function() {
		console.log("Hello Model");
	};

	var findData = function (cb) {
		db.collection('data').findOne({}, function(err, doc) {
			if (err) {
				cb(err, null)
			} else {
				cb(null, doc);
			}
		});
	};
	
	/**
		Method to create the collections if doesnt exist
	*/
	var createDataCollection = function(cb) {
		db.createCollection('data', function(err, collection){
			if (err) {
				cb(err, null);
			} else {
				cb(null, collection);
    	}
  	});
	};

	/**
		Method to get the remote data from the url
	*/
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

	/**
		Method to insert the remote data
	*/
	var insertRemoteData = function(){
		getRemoteData(function (err, data) {
			if (err) {
				throw err;
			}
			db.collection('data').insert(data, function (err, inserted) {
				if (err) {
					throw err;
				}     
				console.log("Inserted value: " + inserted)   
				db.close();
			});        
		});
	};

	/**
		Method to make the first insert
	*/
	var firstInsert = function() {
		db.collectionNames('data', function(err, collection) {
			if (err) {
				throw err;
			}          
			
			if (collection.length === 0) {
				createDataCollection(function (err, collection) {              
					if (err) {
						throw err;
					} else {
						insertRemoteData(db);
						console.log("First insert");
          }
        });             
      } 
    });
		/*
		db.collections(function (err, collections) {
			if (err) {
				throw err;
			}          
			if (collections.length === 0) {
				createDataCollection(function (err, collection) {              
					if (err) {
						throw err;
					} else {
						insertRemoteData(db);
						console.log("First insert");
          }
        });             
      }         
    });*/
	};

	/**
		Method to update the remote data
	*/
	var updateData = function(cb) {
		var query = {};
		db.collection('data').findOne(query, function (err, doc) {
			if (err) {
				cb(err, null)
			}
			if (!doc) {
				console.log("No documents found");
				cb(null. null);
				db.close();
			}
			query['_id'] = doc._id;
			doc.lastUpdated = new Date();
			db.collection('data').update(query, doc, function (err, updated) {
				if (err) {
					cb(err, null)
				}
				console.log("Document update: " + updated);
				db.close();
			});
		})
	};

	var getData = function(_id, cb) {  
		var newData;
		db.collection('data').findOne({ _id: new ObjectID(_id) }, { 
		"lastUpdated": 1,
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
    	cb(null, doc);                      
    });
	};

	return {
		consoleTest: consoleTest,
		findData: findData,
		firstInsert: firstInsert,
		getData: getData,
    updateData: updateData    
	};


};
