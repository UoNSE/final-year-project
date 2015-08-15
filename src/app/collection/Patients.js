define(function (require) {

	var Collection = require('collection/Collection');
	var Patient = require('model/Patient');

	return Collection.extend({
		model: Patient,
		urlFragment: '/patients'
	});

});
