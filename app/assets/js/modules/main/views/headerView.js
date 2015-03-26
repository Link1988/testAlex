define([
  "app",
  "tpl!modules/main/templates/header.tpl"], 
  function(App, HeaderTemplate){
    var HeaderView = Marionette.ItemView.extend({
      template: HeaderTemplate
    });

    return HeaderView;
});