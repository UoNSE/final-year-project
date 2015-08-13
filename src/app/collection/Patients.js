define(function (require) {

	var Collection = require('collection/Collection');
	var Case = require('model/Patient');

	return Collection.extend({
		model: Patient,
		urlFragment: '/patients'
		// urlFragment: '/case/2/information/virtualpatient' ?
	});

});
