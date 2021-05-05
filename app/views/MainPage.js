define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'models/ProfileStatistics',
    'text!/app/templates/main_page.hbs',
], function($, _, Backbone, Handlebars, ProfileStatistics, page_tpl){

    return Backbone.View.extend({
        template: Handlebars.compile(page_tpl),

        events: {
            'click #entry-form button': 'submit'
        },

        submit: function(e) {
            var url = this.$el.find('#entry-form input').val();
            $.ajax({
                url: '/analyze-profile',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({url: url})

            }).done(function(data){
                var model = new ProfileStatistics(data);
                alert(JSON.stringify(data));
            });
            return false;
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