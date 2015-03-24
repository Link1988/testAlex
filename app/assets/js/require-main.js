requirejs.config({
  baseUrl: "assets/js",
  paths: {
    backbone: "vendor/backbone",    
    jquery: "vendor/jquery-1.11.2.min",    
    //json2: "vendor/json2",    
    marionette: "vendor/backbone.marionette",        
    text: "vendor/text",
    tpl: "vendor/underscore-tpl",
    underscore: "vendor/underscore",
    bootstrap: "vendor/bootstrap.min"
  },

  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ["jquery", "underscore"/*, "json2"*/],
      exports: "Backbone"
    },
    "bootstrap": ["jquery"],    
    marionette: {
      deps: ["backbone"],
      exports: "Marionette"
    },
    tpl: ["text"]
  }
});

require(["app", "bootstrap"], function(App){
  App.start();
});