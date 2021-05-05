define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'models/ProfileStatistics',
    'text!/app/templates/profile_stats.hbs',
], function($, _, Backbone, Handlebars, ProfileStatistics, page_tpl){

    return Backbone.View.extend({
        template: Handlebars.compile(page_tpl),

        events: {
        },

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html(this.template({
                cities: this.model.get('city')
            }));
            return this;
        }
    });
});