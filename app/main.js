requirejs.config({
    baseUrl: 'app',
    paths: {
        'backbone': 'libs/backbone',
        'jquery': 'libs/jquery.min',
        'hbs': 'libs/hbs',
        'text': 'libs/text',
        'marionette': 'libs/backbone.marionette',
        'backbone.radio': 'libs/backbone.radio.min',
        'underscore': 'libs/underscore',
        'handlebars': 'libs/hbs/handlebars',
        'json2': 'libs/hbs/json2',
        'bootstrap': 'libs/bootstrap.min'
    },

    hbs: {
        'disableI18n': true,
        'templateExtension': 'hbs',
        'helperDirectory' : 'templates/helpers/',
        'hbs/underscore': "underscore"
    },

    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'marionette' : {
            deps: ['jquery', 'backbone', 'underscore']
        },
        'bootstrap' : {
            deps: ['jquery']
        }
    }
});