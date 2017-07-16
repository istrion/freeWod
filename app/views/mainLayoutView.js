define(
    'views/mainLayoutView',
    [
        'jquery',
        'views/baseLayoutView',
        'views/menuView',
        'hbs!templates/mainLayout'
    ],
    function ($, BaseLayoutView, MenuView,
              MainLayoutTemplate) {
        "use strict";

        var MainLayoutView = BaseLayoutView.extend({
            template: MainLayoutTemplate,
            regions: {
                'main': '#wrapper',
                'menu' : '#menu'
            },
            onRender: function() {
                this.showChildView('menu', new MenuView());
            },
            onShow: function() {
                /*if( Modernizr.touch ) {
                    FastClick.attach(document.body);
                }*/

                $('body').addClass('home');
            }
        });

        return MainLayoutView;
    });