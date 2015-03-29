define([
  "app",
  "entities/models/dataModel",
  "tpl!modules/main/templates/content.tpl"], 
  function(App, DataModel, ContentTemplate){
    var contentView = Marionette.CompositeView.extend({
      template: ContentTemplate,

      initialize: function (data) {
        console.log("Initialize :" +data);
      }
      /*
      model: new DataModel({
        name: "Alejandro",
        lastName: "Hernandez"
      }),
      */
    });

    return contentView;
});