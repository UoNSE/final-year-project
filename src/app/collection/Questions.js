define(function (require) {

	var Collection = require('collection/Collection');
	var Patient = require('model/Question');

	return Collection.extend({
		model: Patient,
		urlFragment: '/questions'
	});

});
