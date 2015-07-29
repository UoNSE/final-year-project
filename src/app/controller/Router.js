define(function (require) {

	var Backbone = require('backbone');

	return Backbone.Router.extend({

		routes: {
			'/': 'component/main/MainController',
			'case/overview': 'component/overview/CaseOverviewController',
			'case/information': 'component/information/CaseInformationController',
			'case/information/background': 'component/information/background/BackgroundController'
		}

	});

});
