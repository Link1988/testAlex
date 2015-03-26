define([
  "marionette",
  "backbone",
  "modules/main/views/headerView",
  "modules/main/views/contentView",
  "modules/main/views/footerView"], 
  function(Marionette, Backbone, HeaderView, ContentView, FooterView){

    var App = new Marionette.Application();

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
      App.navigate("home");
      var headerView = new HeaderView();
      var contentView = new ContentView();
      var footerView = new FooterView();
      App.headerRegion.show(headerView);
      App.contentRegion.show(contentView);
      App.footerRegion.show(footerView);
      
    });

    return App;
});