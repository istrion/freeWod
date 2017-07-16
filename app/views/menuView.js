define(
    'views/menuView',
    [
        'jquery',
        'views/baseLayoutView',
        'hbs!templates/menu'
    ],
    function ($, BaseLayoutView, MenuTemplate) {
        "use strict";

        var MenuView = BaseLayoutView.extend({
            template: MenuTemplate
        });

        return MenuView;
    });