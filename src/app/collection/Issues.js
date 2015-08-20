define(function (require) {

	var Collection = require('collection/Collection');
	var Issue = require('model/Issue');

	return Collection.extend({
		model: Issue,
		urlFragment: '/issues'
	});

});
