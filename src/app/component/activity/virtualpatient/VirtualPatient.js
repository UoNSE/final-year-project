define(function(require) {
	'use strict';

	//TODO: make cards draggable
	//TODO: make hotspot from data



	var Component = require('core/Component');
	var template = require('text!component/activity/virtualpatient/VirtualPatient.hbs');

	var ActionButton = require('component/actionbutton/ActionButton');
	var ActionButtonModel = require('model/ActionButton');

	var Tests = require('component/activity/virtualpatient/tests/Tests');

	var Patients = require('collection/Patients');

	return Component.extend({
		template: template,
		classes: 'virtual-patient',
		styles: 'component/activity/virtualpatient/VirtualPatient.css',

		collection: new Patients(),

		initialize: function () {
			Component.prototype.initialize.apply(this, arguments);
			this.listenTo(this.collection, 'sync', this.onSync);
			this.addButtons();
			this.add(new Tests());
			this.collection.fetch();
		},

		onSync: function (collection) {
			this.listenTo(this.collection, 'add', this.render);
		},

		addButtons: function () {
			var texts = ['Query', 'Tests', 'Chart'];
			var n = texts.length;
			var offset = 100;
			texts.forEach(function (text, i) {
				var button = this.add(new ActionButton({
					model: new ActionButtonModel({
						text: text
					})
				}));
				var scale = i - (n - 1) / 2;
				button.position.set(scale * (offset + offset * 0.1), -150);
			}.bind(this));
		}

	});

});
