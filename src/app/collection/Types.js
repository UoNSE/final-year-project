define(function (require) {

	var Collection = require('collection/Collection');
	var Type = require('model/Type');

	return Collection.extend({
		model: Type,
		urlFragment: '/types'
	});

});
