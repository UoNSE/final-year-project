define(function (require) {

	var Collection = require('collection/Collection');
	var ActionButton = require('model/ActionButton');

	return Collection.extend({
		model: ActionButton
	});

});


