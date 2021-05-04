define([
    'require',
    'jquery',
    'underscore',
    'backbone',
    'Router',
    'handlebars',
    'instances/CurrentSession',
], function (require, $, _, Backbone, router, Handlebars, currentSession) {

    return {
        Container: null,
        config: {}, // baseUrl etc
        init: function () {
            var _this = this;
            return $.ajax({
                url: '/app/config.json',
                success: function (resp) {
                    _this.config = resp;
                    _this._init();
                }
            });
        },
        _init: function () {

            Backbone.Collection.prototype.parse = function (response) {
                return response.data;
            };

            Backbone.Model.prototype.parse = function (response) {
                return response.data || response;
            };

            var _this = this;

            $.ajaxPrefilter(function prependUrlPrefilter(opts) {
                opts.url = _this.config.baseUrl + opts.url;
                opts.crossDomain = true;
                var token = router.session.get('token');

                if (token) {
                    opts.headers = opts.headers || {};
                    opts.headers['Authorization'] = 'Bearer ' + token
                }
            });

            $(document).ajaxError(function (event, jqxhr, settings, thrownError) {
                if (jqxhr.status === 401) {
                    router.session.set('token', null);
                    router.navigate('/login', {trigger: true});
                }
            });

            require([
                    'app/frontend/app/views/Page',
                    'views/components/Error',
                ],
                _.bind(function (PageContainer, ErrorView) {
                    this.Container = new PageContainer({el: $("#app")});
                    var _this = this;

                    $(document).ajaxStart(function () {
                        _this.Container.loaderStart();
                    });
                    $(document).ajaxComplete(function () {
                        _this.Container.loaderStop();
                    });


                    router.session.on('logged_in', function () {
                        router.navigate('/', {trigger: true});
                    });
                    router.session.on('logged_out', function () {
                        router.navigate('/login', {trigger: true});
                    });


                    router.on('route:index', _.bind(function () {

                        this.Container.setTitle('YASNA');
                        this.Container.setPage(ErrorView);
                    }, this));


                    router.on('route:notFound', _.bind(function () {
                        this.Container.setTitle('Error');
                        this.Container.setPage(ErrorView);
                    }, this));
                    Backbone.history.start({pushState: true, root: '/'});
                }, this));
        },
        changeContent: function (el) {
            this.content.empty().append(el);
            return this;
        },

    };

});
