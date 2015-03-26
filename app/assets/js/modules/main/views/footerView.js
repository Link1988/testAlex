define([
  "app",
  "tpl!modules/main/templates/footer.tpl"], 
  function(App, FooterTemplate){
    var FooterView = Marionette.ItemView.extend({
      template: FooterTemplate
    });

    return FooterView;
});