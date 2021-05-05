define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'models/ProfileStatistics',
    'views/ProfileStats',
    'text!/app/templates/main_page.hbs',
], function($, _, Backbone, Handlebars, ProfileStatistics, ProfileView, page_tpl){

    return Backbone.View.extend({
        template: Handlebars.compile(page_tpl),

        events: {
            'click #entry-form button': 'submit'
        },

        drawStats: function(data){
            var model = new ProfileStatistics(data);
            this.view = new ProfileView({model: model, el: this.$el.find('#profile-container')});
            this.view.render();
        },
        submit: function(e) {
            var url = this.$el.find('#entry-form input').val();
            $.ajax({
                url: '/analyze-profile',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({url: url})

            }).done(_.bind(this.drawStats, this)).fail(function(){
                alert('error..');
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