define([
  'app',
  'backbone',
  'underscore',
  'entities/models/dataModel'],
function(App, Backbone, _, DataModel) {
  var DataCollection = Backbone.Collection.extend({ 
    model: DataModel,
    url: "/data"
  });

  return DataCollection;
});