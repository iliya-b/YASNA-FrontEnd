define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'instances/CurrentSession',
    'text!/app/templates/page_container.hbs',
    'Router',
], function($, _, Backbone, Handlebars, CurrentSession, page_container_tpl, router){

    return Backbone.View.extend({
        template: Handlebars.compile(page_container_tpl),
        page: null,
        $page: null,

        events: {
            'click a': function(e){
                var link = $(e.currentTarget).attr('href');
                if(link && link.length > 0 && link[0] !== '#'){
                    e.preventDefault();
                    router.navigate(link, {trigger: true});
                    return false;
                }

            },
        },

        loaderStart: function(){
            this.$el.find('.card-header .card-title .spinner').show();
        },

        loaderStop: function(){
            this.$el.find('.card-header .card-title .spinner').fadeOut();
        },

        setTitle: function(title){
            this.$el.find('.card-header .card-title .page-title').text(title);
        },
        setPage: function(view, attributes){
          if(this.page !== null){
              this.page.remove();
          }

          this.$page = $("<div/>").appendTo(this.$el.find('#page .content'));
          this.page = new view({el: this.$page, attributes: attributes || {}});


          return this.page;
        },

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.empty().append(this.template());
            this.page = null;
        }
    });
});