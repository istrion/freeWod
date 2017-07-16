define(
    'views/baseLayoutView',
    [
        'marionette',
        'jquery'
    ],
    function (Marionette, $) {
        "use strict";

        var BaseLayoutView = Marionette.View.extend({
            loadMainStyle: function(url) {
                if( $('#mainStyle').attr('href') === url ) {
                    return;
                }

                $('#mainStyle').attr('href', url);
            },
            loadCss : function(url) {
                var link = document.createElement("link");
                link.type = "text/css";
                link.rel = "stylesheet";
                link.href = url;
                document.getElementsByTagName("head")[0].appendChild(link);
            },
            getMainCurrentView: function() {
                return App.getRegion('app').currentView.getRegion('main').currentView;
            },
            getUI : function (uiName) {
                if(this.ui.hasOwnProperty(uiName)) {
                    return $(this.ui[uiName]);
                }

                return null;
            },
            serializeData: function() {
                var viewData = {
                    data: this.data
                };
                return _.extend(viewData, Marionette.View.prototype.serializeData.apply(this, arguments));
            },
            setTagg: function($content){
                $('#tagg').html($content);
            }
        });

        return BaseLayoutView;
    });