define(function (require) {

	var Backbone = require('backbone');

	return Backbone.Router.extend({

		routes: {
			'/': 'component/main/Main',
			'case/overview': 'component/overview/CaseOverview',
			'case/information': 'component/information/CaseInformation',
			'case/information/background': 'component/information/background/Background'
		}

	});

});
