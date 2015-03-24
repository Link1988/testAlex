var App = new Marionette.Application();


App.Contact = Backbone.Model.extend({});

App.addRegions({
  mainRegion: "#main-region"
});

App.MainRegionView = Marionette.LayoutView.extend({
  tagName: 'div',
  template: "#page-template",
  regions: {
    header: "#main-header",
    content: "#main-content",
    footer: "#main-footer"
  }
});

App.HeaderView = Backbone.Marionette.ItemView.extend({
  initialize: function() {
    console.log(this.$el.length); // 1
  },

  template: "#header-template",
});

App.FooterView = Backbone.Marionette.ItemView.extend({
  initialize: function() {
    console.log(this.$el.length); // 1
    var alice = new App.Contact({
      firstName: "Alice",
      lastName: "Arten",
      phoneNumber: "555-0184"
    });    
  },
  model: this.alice,
  template: "#footer-template"
});

App.ContentView = Backbone.Marionette.ItemView.extend({
  initialize: function() {
    console.log(this.$el.length); // 1
  },
  model: alice,
  template: "#content-template"
});

App.on("start", function(){ 
  var mainRegionView = new App.MainRegionView();

  mainRegionView.on("show", function(){    
    mainRegionView.header.show(new App.HeaderView);
    mainRegionView.content.show(new App.ContentView);
    mainRegionView.footer.show(new App.FooterView);
  });

  App.mainRegion.show(mainRegionView);
});

$(document).ready(function() {
  App.start();
});