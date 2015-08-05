define(function (require) {

	var Backbone = require('backbone');
	var Case = require('model/Case');

	// TODO Hard coded for now
	var Collection = Backbone.Collection.extend({
		model: Case
	});

	var cases = [
		new Case({name: 'Case 1'}),
		new Case({name: 'Case 2'}),
		new Case({name: 'Case 3'}),
		new Case({name: 'Case 4'}),
		new Case({name: 'Case 5'}),
		new Case({name: 'Case 6'}),
		new Case({name: 'Case 7'})
	];

	return new Collection(cases);

});
