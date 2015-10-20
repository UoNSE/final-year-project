define(function (require) {

	var Collection = require('collection/Collection');
	var Case = require('model/Case');

	return Collection.extend({
		model: Case,
		urlFragment: '/cases'
	});

});
