define(["app"], function(App){  
  var DataModel = Backbone.Model.extend({
    defaults: {
      name: null,
      lastName: null,      
    }
  });
  
  return DataModel;
});