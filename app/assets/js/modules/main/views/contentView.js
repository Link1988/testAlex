define([
  "app",
  "underscore",
  "entities/models/dataModel",
  "modules/main/views/itemContentView",
  "tpl!modules/main/templates/content.tpl"], 
  function(App, _, DataModel, itemContentView, ContentTemplate){
    var contentView = Marionette.CompositeView.extend({
      template: ContentTemplate,

      childView: itemContentView,

      childViewContainer: '.row',

      onShow: function() {
        debugger;
      },

      initialize: function () {
        this.collection = new Backbone.Collection(this.model.get('query').results.quote);
        debugger;
      },
      
    });

    return contentView;
});