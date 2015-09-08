define(function(require) {
	'use strict';

	//TODO: make cards draggable
	//TODO: make hotspot from data

	var Button = require('component/button/Button');
	var ButtonModel = require('model/Button');

	var Component = require('core/Component');
	var template = require('text!component/activity/virtualpatient/VirtualPatient.hbs');

	var ActionButton = require('component/actionbutton/ActionButton');
	var ActionButtonModel = require('model/ActionButton');

	var Tests = require('component/activity/virtualpatient/tests/Tests');
	var Patient = require('component/activity/virtualpatient/patient/Patient');
	var EventFeed = require('component/activity/virtualpatient/eventfeed/EventFeed');
	var Chart = require('component/activity/virtualpatient/chart/Chart');

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
			this.tests = this.add(new Tests());
			this.patient = this.add(new Patient());
			// this.eventfeed = this.add(new EventFeed());
			// this.chart = this.add(new Chart());
			this.chart = this.addChart();
			this.collection.fetch();
		},

		onSync: function (collection) {
			this.listenTo(collection, 'add', this.render);
		},

		addButtons: function () {
			var texts = ['Query', 'Tests', 'Chart'];
			var n = texts.length;
			var offset = 100;
			texts.forEach(function (text, i) {
				var button = this.add(new ActionButton({
					model: new ActionButtonModel({
						text: text,
						id: text
					})
				}));
				var scale = i - (n - 1) / 2;
				button.position.set(scale * (offset + offset * 0.1), -200);
			}.bind(this));
		},

		addChart: function () {

			// var button = this.createButton('Urine Analysis', 'info');
			// button.position.set(-x, y);
			// var button = $('Chart').get();
			var button = this.createButton('Chart', 'info');

			var chart = new Chart();
			// chart.position.x = x;
			chart.hide();

			button.add(chart);
			button.on('click', this.onToggleTest.bind(this, chart));

			return this.add(button);

		},
		createButton: function (text, color) {
			return new Button({
				model: new ButtonModel({
					text: text,
					color: color
				})
			});
		},

	});

});
