define(function (require) {

	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/cases/Cases.hbs');
	var Cases = require('collection/Cases');
	var Case = require('component/cases/case/Case');

	return Component.extend({

		template: template,

		events: {
			//'click #btn-start': 'onStart'
		},

		collection: new Cases(),

		initialize: function () {
			Component.prototype.initialize.apply(this, arguments);

			this.listenTo(this.collection, 'sync', this.onSync);
			this.collection.fetch();
		},

		onSync: function (collection) {
			var length = collection.length;
			collection.each(function (model, i) {
				var newCase = new Case({
					model: model
				});
				newCase.position.setPolar(200, i / length * Math.TAU);
				this.add(newCase);
			}.bind(this));

			//this.listenTo(this.collection, 'add', this.onAdd);
		},

		addCase: function (model) {
			this.add(new Case({
				model: model
			}));
		},

		//onAdd: function (model) {
		//	this.addCase(model);
		//}

	});

});
