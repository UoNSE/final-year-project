define(function (require) {

	var Collection = require('collection/Collection');
	var Evidence = require('model/Evidence');

	return Collection.extend({
		model: Evidence,
		urlFragment: '/evidence'
	});

});
