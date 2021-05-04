require.config({
    baseUrl: '/static',
    paths: {
        jquery: '/components/js/main/jquery.min',
        underscore: '/components/js/main/underscore.min',
        backbone: '/components/js/main/backbone.min',
        handlebars: '/components/js/main/handlebars.min',
        bootstrap: '/components/bootstrap/js/main/bootstrap.bundle.min',
        text: '/components/js/main/require-text.min',
    },
    urlArgs: "cache=" + (new Date()).getTime()
});

require([
    'app/App',
], function(App){
    App.init();


    document.addEventListener('DOMContentLoaded', function() {
    });

    window.addEventListener('load', function() {
    });
});