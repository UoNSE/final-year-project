define(function(require) {
	'use strict';

	//TODO: make cards draggable
	//TODO: make hotspot from data


	// models
	var ButtonModel = require('model/Button');
	var ActionButtonModel = require('model/ActionButton');

	// collections
	var Patients = require('collection/Patients');

	// components
	var Component = require('core/Component');
	var Button = require('component/button/Button');
	var ActionButton = require('component/actionbutton/ActionButton');
	var Tests = require('component/activity/virtualpatient/tests/Tests');
	var Query = require('component/activity/virtualpatient/querypatient/Query');
	var PatientBody = require('component/activity/virtualpatient/patientbody/PatientBody');
	var EvidenceFeed = require('component/activity/virtualpatient/evidencefeed/EvidenceFeed');
	var Chart = require('component/activity/virtualpatient/chart/Chart');

	// handlebars templates
	var template = require('text!component/activity/virtualpatient/VirtualPatient.hbs');

	return Component.extend({
		template: template,
		classes: 'virtual-patient',
		styles: 'component/activity/virtualpatient/VirtualPatient.css',

		collection: new Patients(),

		Evidences: {
			// 'click #context': '_onContext', /* @TODO: delete most of these (depracated) */
			// 'click #background': '_onBackground',
			// 'dblclick #virtual-patient-img-container': '_flipPatient',
			// 'click #flip-patient-button': '_flipPatient',
			// 'click #test-results-button': '_testResults',
			// 'click #hide-chart-button': '_hidePatientsChart',
			// 'click #query-card': '_queryCard',
			// 'click #test-card1': '_showUrineAnalysisChart',
			// 'click #hide-chart-button2': '_hideUrineAnalysisChart',
			// 'click #button-query': '_queryPatient',
			// 'click #button-tests': '_testPatient',
			// 'click #button-chart': '_showPatientsChart',
			// 'click #test-card3': '_showSubMenu',
			// 'click #test-card4': '_showTarget',
			// 'click #test-card5': '_showTarget',
			// 'click .hotspot': '_hotSpotClick'
			// 'click .menu-item': '_menuItemSelection'

			'click #TestBtn': '_toggleTestMenu',
			'click #ChartBtn': '_togglePatientsChart'



			},

		initialize: function () {
			Component.prototype.initialize.apply(this, arguments);
			this.listenTo(this.collection, 'sync', this.onSync);
			this.collection.fetch();
			this.visiblemenus = [];

		},

		onSync: function (collection) {
			// get the patient with the case Id.
			this.patients = this.collection;
			this.patient = this.patients.get(1); // get id.
			this.addComponents();
			this._hideElements();
		},

		addComponents: function() {
			this.testresults = this.patient.get('testresults');
			this.patientbody = this.add(new PatientBody());
			this.tests = this.add(new Tests(this.testresults));
			this.queries = this.add(new Query(this.testresults));
			this.EvidenceFeed = this.addEvidenceFeed();
			this.chart = this.add(new Chart({model: this.patient}));
			this.addButtons();
		},


		_hideElements: function() {
			this.tests.hide();
			this.queries.hide();
			this.chart.hide();

		},

		addButtons: function () {
			var texts = ['Query', 'Test', 'Chart'];
			var targets = [this.queries, this.tests, this.chart];
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
				var target = targets[i];
				button.add(target);
				// button.on('click', target.toggle());
				// button.on('click', this.onToggle(target));
				button.on('click', this.onToggle.bind(this,target));

			}.bind(this));
		},

		onToggle: function (toggableTarget) {
			if(toggableTarget == this.queries){
				this.tests.hide();
				this.chart.hide();
			}
			else if(toggableTarget == this.tests){
				this.queries.hide();
				this.chart.hide();
			}
			else if(toggableTarget== this.chart){
				this.tests.hide();
				this.chart.hide();
			}

			toggableTarget.toggle();

		},

		// _testPatient: function () {
		//
		// 	if($('#test-menu').is(":visible")){
		// 		$('#test-menu').hide();
		//
		// 	}else{
		// 		$('#test-menu').show();
		//
		// 	}
		// },


		addEvidenceFeed: function(){

			var Evidencefeed = this.add(new EvidenceFeed());
			var posX = -250;
			var posY = 400;
			Evidencefeed.position.set(posX, posY);
			return this.add(Evidencefeed);
		},

		// togglePatientsChart: function () {
		//
		// 	var chartBtn = $('ChartBtn');
		// 	// var button = this.createButton('Chart', 'info');
		// 	// button.position.set(-x, y);
		//
		// 	// var chart = $('patients-chart-table');
		//
		// 	// chart.position.x = x;
		// 	chart.hide();
		// 	chartBtn.add(chart);
		//
		// 	chartBtn.on('click', this.onToggleTest.bind(this, chart))
		// 	// button.on('click', chart.show());
		//
		// 	// $('ChartBtn').click(function(){
		// 	// 	chart.show();
		// 	// }).bind();
		//
		// 	return this.add(chartBtn);
		//
		// },
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
