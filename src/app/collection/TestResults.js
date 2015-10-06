define(function (require) {

	var Collection = require('collection/Collection');
	var TestResult = require('model/TestResult');

	return Collection.extend({
		model: TestResult,
		urlFragment: '/testresults'
	});

});
