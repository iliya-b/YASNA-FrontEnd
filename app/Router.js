define([
    'jquery',
    'underscore',
    'backbone',
    'instances/CurrentSession'
], function($, _, Backbone, Session) {
    return new (Backbone.Router.extend({
        session: Session,

        routes: {
            '': 'index',

            '*notFound': 'notFound'


        },
        execute: function (callback, args, name) {

            // if (!this.session.isLoggedIn() && name !== 'login') {
            //     this.navigate('/login', {trigger: true, replace: true});
            //     return false;
            // }

            // if (this.session.isLoggedIn() && name === 'login') {
            //     this.navigate('/', {trigger: true});
            //     return false;
            // }
            if (callback) callback.apply(this, args);
        },

    }))();
});