define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!/app/templates/components/alert.hbs',
], function($, _, Backbone, Handlebars, alert_tpl){

    return Backbone.View.extend({
        template: Handlebars.compile(alert_tpl),

        events: {
        },

        initialize: function() {
            this.render();
        },

        render: function() {

            this.$el.html(this.template({
                'title': '404 Не найдено',
                'level': 'warning',
                'content': 'Страницы не существует'
            }));
            return this;
        }
    });
});