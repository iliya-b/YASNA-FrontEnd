define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone){
    return Backbone.Model.extend({
        defaults: {
            id: 0,
        },

        initialize: function(){

        },
        url: function(){
            return '/analyze-profile'
        },

    });
});