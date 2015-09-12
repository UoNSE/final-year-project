define(function (require) {

	var Collection = require('collection/Collection');
	var Patient = require('model/TestType');

	return Collection.extend({
		model: Patient,
		urlFragment: '/testtypes'
	});

});
