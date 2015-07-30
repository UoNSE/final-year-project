define(function (require) {

	var Backbone = require('backbone');
	var Loader = require('controller/Loader');
	var Back = require('shared/navigation/back/BackController');

	return Backbone.Router.extend({

		_loader: new Loader(),
		_back: new Back(),

		routes: {
			'': 'main',
			'case/overview': 'caseOverview',
			'case/information': 'caseInformation',
			'case/information/background': 'caseBackground'
		},

		initialize: function () {
			this._back.on('back', this._onBack, this);
			this._loader.insertController(this._back, $('body'), 0);
			this._loader.on({
				configureBack: this._onConfigureBack.bind(this),
				back: this._onBack.bind(this)
			});
		},

		/**
		 * Loads the previous page in the history.
		 *
		 * @private
		 */
		_onBack: function () {
			Backbone.history.history.back();
		},

		/**
		 * Changes the visibility of the back button depending on the back configuration.
		 *
		 * @param back The back configuration.
		 * @private
		 */
		_onConfigureBack: function (back) {
			var button = $(this._back.selector);
			if (back) {
				button.show();
			} else {
				button.hide();
			}
		},

		/**
		 * Loads the page given the route.
		 *
		 * @param route The path to the base route.
		 * @private
		 */
		_load: function (route) {
			this._loader.load(route);
		},

		main: function () {
			// Always hide the back button on the home page.
			$(this._back.selector).hide();
			this._load('component/main/Main');
		},

		caseOverview: function () {
			this._load('component/overview/CaseOverview');
		},

		caseInformation: function () {
			this._load('component/information/CaseInformation');
		},

		caseBackground: function () {
			this._load('component/information/background/Background');
		}

	});

});
