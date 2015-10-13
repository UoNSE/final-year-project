define(function (require) {

	var Collection = require('collection/Collection');
	var CaseBackground = require('model/CaseBackground');

	return Collection.extend({
		model: CaseBackground,
		urlFragment: '/issues'
	});

});
