define(function (require) {

	var Backbone = require('backbone');
	var ActionButton = require('model/ActionButton');

	return Backbone.RelationalModel.extend({

		type: Backbone.HasOne,

		defaults: {
			complete: 0,
			buttons: null
		},

		relations: [{
			type: Backbone.HasMany,
			key: 'buttons',
			relatedModel: ActionButton
		}]

	});

});
