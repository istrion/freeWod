requirejs(['main'], function () {
        'use strict';
        require([
                'backbone',
                'jquery',
                'marionette',
                'underscore',
                'bootstrap',
                'controllers/main',
                'views/mainLayoutView'
            ],
            function (Backbone, $, Marionette, _, bootstrap,
                      PortalController,
                      MainLayoutView
                      ) {

                var initialize = function initialize() {

                    window.App = (window.App) || new Marionette.Application({region: '#app'});

                    App.on('start', start);

                    App.start();

                };

                var start = function () {

                    var mainLayoutView = new MainLayoutView();

                    App.getRegion('app').show(mainLayoutView);

                    if (Backbone.history) {
                        Backbone.history.start();
                        App.trigger("backbone:history:start");
                    }
                };

                initialize();
            });
    }
);