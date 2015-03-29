define([
  "marionette",
  "backbone",
  "modules/main/views/headerView",
  "modules/main/views/contentView",
  "modules/main/views/footerView",
  "entities/collections/dataCollection"], 
  function(Marionette, Backbone, HeaderView, ContentView, FooterView, DataCollection){

    var App = new Marionette.Application();
    var collectionData = new DataCollection();

    /* Agregamos regiones a la aplicacion, estas regiones son "contenedores" en los cuales podemos
     * mostrar (show) o quitar (empty) vistas
    */  
    App.addRegions({      
      headerRegion: '#main-header',
      contentRegion: '#main-content',
      footerRegion: '#main-footer'     
    });

    App.navigate = function(route, options){
      options || (options = {});
      Backbone.history.navigate(route, options);
    };

    App.getCurrentRoute = function(){
      Backbone.history.fragment;
    };

    App.on("start", function(){
      if(Backbone.history){
        Backbone.history.start();      
      }
      var self = this;

      App.navigate("home");
      
      collectionData.fetch({
        success: function() {
          contentView = new ContentView({
            collection: collectionData
          }); 
          App.contentRegion.show(contentView);   
        },
        error: function () {
          alert("No pude cargar la seccion");
        }
      });
      var headerView = new HeaderView();     
      var footerView = new FooterView();

      App.headerRegion.show(headerView);
      App.footerRegion.show(footerView);
      
    });

    return App;
});