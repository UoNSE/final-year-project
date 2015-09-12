define(function (require) {

	var Collection = require('collection/Collection');
	var Button = require('model/Button');

	return Collection.extend({
		model: Button
	});

});


