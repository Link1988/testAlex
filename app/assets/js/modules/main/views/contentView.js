define([
  "app",
  "entities/models/dataModel",
  "tpl!modules/main/templates/content.tpl"], 
  function(App, DataModel, ContentTemplate){
    var contentView = Marionette.ItemView.extend({
      template: ContentTemplate,

      model: new DataModel({
        name: "Alejandro",
        lastName: "Hernandez"
      }),
    });

    return contentView;
});