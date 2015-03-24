define(["marionette",
        "backbone"], 
        function(Marionette, Backbone){

  var App = new Marionette.Application();

  /* Agregamos regiones a la aplicacion, estas regiones son "contenedores" en los cuales podemos
   * mostrar (show) o quitar (empty) vistas
  */
  /*
  App.addRegions({
    contentApplicationRegion: "#content-application-region",
    logginRegion:             "#loggin-region"
  });
  */


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
    alert("Estoy lista");
  });

  return App;
});