define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone){
    return Backbone.Model.extend({
        defaults: {
            token: null,
            username: null,
            role: 'guest'
        },

        initialize: function(){
            this.set(JSON.parse(localStorage.getItem('current_session') || '{}'));
        },
        url: function(){
            return '/session'
        },
        isLoggedIn: function(){
            return this.has('token');
        },
        logout: function(){
            this.set({
                token: null,
                username: null,
                role: 'guest'
            });
            localStorage.removeItem('current_session');
            this.trigger('logged_out');

        },
        login: function(username, password, options){
            if(this.isLoggedIn()) {
                return false;
            }
            var _this = this;
            $.ajax({
                url: this.url(),
                method: 'POST',
                data: {
                    username: username,
                    password: password
                }
            })
                .fail(options.fail || function(){})
                .done(function (resp) {
                    var data = resp.data;
                    if(options.success){
                        options.success();
                    }
                    _this.set({
                        token: data.token,
                        username: data.username,
                        role: data.role,
                    });
                    localStorage.setItem('current_session', JSON.stringify(data));
                    _this.trigger('logged_in');

                });

            return true;

        }
    });
});