define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!/app/templates/main_page.hbs',
], function($, _, Backbone, Handlebars, page_tpl){

    return Backbone.View.extend({
        template: Handlebars.compile(page_tpl),

        events: {
        },

        initialize: function() {
            this.render();
        },

        render: function() {

            this.$el.html(this.template({}));
            return this;
        }
    });
});