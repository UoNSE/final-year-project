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
			this.eventFeed = this.addEventFeed();
			this.chart = this.addPatientsChart();
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
						id: text + 'Btn'
					})
				}));
				var scale = i - (n - 1) / 2;
				button.position.set(scale * (offset + offset * 0.1), -200);
			}.bind(this));
		},

		onToggleTest: function (test, event) {
			test.toggle();
		},

		addEventFeed: function(){

			var eventfeed = this.add(new EventFeed());
			var posX = -400;
			var posY = 100;
			eventfeed.position.set(posX, posY);

			return this.add(eventfeed);

		},

		addPatientsChart: function () {

			// var button = $('ChartBtn');
			var button = this.createButton('Chart', 'info');
			// button.position.set(-x, y);

			var chart = this.add(new Chart());
			// var chart = $('patients-chart-table');

			// chart.position.x = x;
			chart.hide();
			button.add(chart);

			button.on('click', this.onToggleTest.bind(this, chart))
			// button.on('click', chart.show());

			// $('ChartBtn').click(function(){
			// 	chart.show();
			// }).bind();

			return this.add(button);

		},
		createButton: function (text, color) {
			return new Button({
				model: new ButtonModel({
					text: text,
					color: color,
					styles: ["matl-fab", "btn", "btn-fab", "btn-raised"]
				})
			});
		},

	});

});
