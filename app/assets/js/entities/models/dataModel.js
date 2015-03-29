define(["app"], function(App){  
  var DataModel = Backbone.Model.extend({

  	url: function(){
      return "data/" + ( this.get("_id") || "" );
    },

    idAttribute : "_id",

  });
  
  return DataModel;
});