define(
    'controllers/portal',
    [
        'jquery',
        'app/views/mainPortalLayoutView',
        'app/views/headerLayoutView',
        'app/views/contentLayoutView',
        'app/views/footerLayoutView'
    ],
    function ($, crossDomainIE,
              MainPortalLV,
              HeaderLV, ContentLV, FooterLV) {
        "use strict";

        var MainController = Marionette.Controller.extend({
            routes: {
                "": "index"
            },

            initLayout: function () {
                var contentLV;
                this.mainView = this.getMainCurrentView();

                if (!(this.mainView instanceof MainPortalLV)) {
                    this.mainView = new MainPortalLV();
                    this.showMainView(this.mainView);
                }

                if (!(this.mainView.getRegion('header').currentView instanceof HeaderLV) || this.mainView.getRegion('header').currentView.isDestroyed) {
                    this.mainView.showChildView('header', new HeaderLV());
                }
                if (!(this.mainView.getRegion('footer').currentView instanceof FooterLV)) {
                    this.mainView.showChildView('footer', new FooterLV());
                }
                if (!(this.mainView.getRegion('content').currentView instanceof ContentLV)) {
                    this.mainView.showChildView('content', new ContentLV());
                }
            },

            index: function () {
                this.initLayout();

                var contentLV = this._getContentView(),
                    news = new NewsCollection(),
                    situations = new SituationsCollection(),
                    situationsRanking = new SituationsCollection(),
                    userSuccess = new UserModel({id: App.currentUser.get('id')}),
                    slides = new SlidesCollection();

                $.when(slides.fetch()).then(function () {
                    var homeSliderData = {
                        slides: slides
                    };
                    if (!contentLV.getRegion('preContent') || !(contentLV.getRegion('preContent').currentView instanceof HomeSliderLV)) {
                        contentLV.showChildView('preContent', new HomeSliderLV(homeSliderData));
                    }
                });

                $.when(news.getHomeNews(2), situations.getMostPlayed(), situationsRanking.getRanking(), userSuccess.getSuccess()).then(function () {
                    var homeMainData = {
                        news: news,
                        situationsMostPlayed: situations,
                        situationsRanking: situationsRanking,
                        userSuccess: userSuccess
                    };
                    if (contentLV.getRegion('mainContent') && !(contentLV.getRegion('mainContent').currentView instanceof HomeMainContentLV)) {
                        contentLV.showChildView('mainContent', new HomeMainContentLV(homeMainData));
                    }
                });


                if (!(this.mainView.getRegion('header').currentView instanceof HeaderLV)) {
                    this.mainView.showChildView('header', new HeaderLV());
                } else {
                    this.mainView.getRegion('header').currentView.showContent();
                }

                if (!(this.mainView.getRegion('footer').currentView instanceof FooterLV)) {
                    this.mainView.showChildView('footer', new FooterLV());
                }
                else {
                    App.sessionsRadio.trigger('refreshFooter');
                }


            },
            _backToHome: function () {
                App.router.navigate('#', {trigger: true});
            }

        });

        return MainController;
    });