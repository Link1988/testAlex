define([
  "app",
  "underscore",
  "tpl!modules/main/templates/itemContent.tpl"], 
  function(App, _, itemContentTemplate){
    var itemContentView = Marionette.ItemView.extend({
      template: itemContentTemplate,

      initialize: function (data) {
        debugger;
      },
      
    });

    return itemContentView;
});