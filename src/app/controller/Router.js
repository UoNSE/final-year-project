define(function (require) {

	var Backbone = require('backbone');
	var ViewControllerLoader = require('controller/loader/ViewController');

	return Backbone.Router.extend({

		_navigation: null,
		_viewControllerLoader: null,

		routes: {
			'': 'start',
			'cases': 'cases',
			'caseinfo' : 'caseInfo',
			'case/:id/overview': 'caseOverview',
			'case/:id/information': 'caseInformation',
			'case/:id/information/background': 'caseBackground'
		},

		initialize: function (navigation) {
			this._navigation = navigation;
            this._viewControllerLoader = new ViewControllerLoader(this);

			this._viewControllerLoader.on('configureBack', this.onConfigureBack, this);
			this._navigation.back.on('back', this.onBack, this);
		},

		/**
		 * Loads the previous page in the history.
		 */
		onBack: function () {
			Backbone.history.history.back();
		},

		/**
		 * Changes the visibility of the back button depending on the back configuration.
		 *
		 * @param back The back configuration.
		 */
		onConfigureBack: function (back) {
			var backNavigation = this._navigation.back;
			if (backNavigation) {
				var button = $(backNavigation.selector);
				// TODO add transitions
				if (back === false || Backbone.history.getPath() === '') {
					button.hide();
				} else {
					button.show();
				}
			}
		},

		/**
		 * Loads the page given the route.
		 *
		 * @param route The path to the base route.
		 * @param id The id of the current case.
		 * @private
		 */
		_load: function (route, id) {
			if (id) {
				id = parseInt(id, 10);
			}
			this._viewControllerLoader.load(route, id);
		},

		start: function () {
			this._load('component/start/Start');
		},

		cases: function () {
			this._load('component/cases/Cases');
		},

		caseOverview: function (id) {
			this._load('component/overview/CaseOverview', id);
		},

		caseInformation: function (id) {
			this._load('component/information/CaseInformation', id);
		},

		caseBackground: function (id) {
			this._load('component/information/background/Background', id);
		},

		caseInfo: function(){
			this._load('activity/caseinfo/component/CaseInfo');
		}
	});

});
