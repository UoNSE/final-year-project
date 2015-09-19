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
	var Help = require('component/help/Help');

	var Evidence = require('component/activity/issues/card/evidence/Evidence');
	var EvidenceCollection = require('collection/Evidence');
	var EvidenceModel = require('model/Evidence');


	// handlebars templates
	var template = require('text!component/activity/virtualpatient/VirtualPatient.hbs');

	return Component.extend({
		template: template,
		classes: 'virtual-patient',
		styles: 'component/activity/virtualpatient/VirtualPatient.css',

		collection: new Patients(),

		Events: {

			'click #TestBtn': '_toggleTestMenu',
			'click #ChartBtn': '_togglePatientsChart'

			},

		initialize: function () {
			Component.prototype.initialize.apply(this, arguments);
			this.listenTo(this.collection, 'sync', this.onSync);
			this.collection.fetch();
			this.visiblemenus = [];
			this.collaborative = true;

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
			this.hotspots = this.patient.get('hotspots');
			this.patientbody = this.add(new PatientBody());
			this.patientbody.interactive = true;
			// this.patientbody = this.add(new PatientBody(this.hotspots));
			this.tests = this.add(new Tests(this.testresults));

			// add this Tests TestResults children to the main component.
			// Tests -> TestResult -> Evidence
			// debugger;
			// this.tests.children().foreach(child => {
			// 	child.hide();
			// });


			this.queries = this.add(new Query(this));

			this.EvidenceFeed = this.addEvidenceFeed();
			this.chart = this.add(new Chart({model: this.patient}));
			this.chart.interactive = true;



			this.help = this.add(new Help({
				model: {
				helpContent: 'use the <strong>"Query"</strong> button </br>\
				to ask the patient questions. </br>\
				use the <strong>"Test"</strong> button </br>\
				to run blood/urine/saliva </br>\
				tests on the patint.</br>\
				Use the <strong>"Chart"</strong> button </br>\
				to see the patients details </br>\
				and vital signs.</br>\
				click on parts of the body </br>\
				to reveal scans and other  </br>\
				information related to the area.'}
			}));

			// this.help.scale.set(0.5, 0.5);
			// this.buttons = {};
			this.addButtons();
			// this.add(this.buttons);
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
						id: text + 'Btn',
						// color: danger
					})
				}));
				var scale = i - (n - 1) / 2;
				button.position.set(scale * (offset + offset * 1.0), -300);
				var target = targets[i];
				button.add(target);
				button.on('click', this.onToggle.bind(this,target));
				button.interactive = true;
				// this.buttons.push();

			}.bind(this));
		},

		onToggle: function (toggableTarget) {

			if(this.collaborative != true){
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
			}

			toggableTarget.toggle();

		},

		addEvidenceFeed: function(){

			var Evidencefeed = this.add(new EvidenceFeed());
			var posX = -250;
			var posY = 0;
			Evidencefeed.position.set(posX, posY);
			return this.add(Evidencefeed);
		},

		// createButton: function (text, color) {
		// 	return new Button({
		// 		model: new ButtonModel({
		// 			text: text,
		// 			color: 'color',
		// 			styles: ['matl-fab', 'btn', 'btn-fab', 'btn-raised']
		// 		})
		// 	});
		// },

		// addEvidenceCard: function(flag){
		// 	// console.log(flag);
		// 	var metric = "Glucose";
		// 	var evidenceCard = this.addEvidence(new EvidenceModel({
		// 		width: 200,
		// 		height: 100,
		// 		title: 'Evidence',
		// 		color: 'info',
		// 		body: metric + "is "+flag + "\n" + "</br>"
		// 	}));
		// 	// var yTarget = button.position.y;
		// 	// target.position.y = yTarget;
		// 	evidenceCard.position.x = 200;
		// 	evidenceCard.hide();
		// 	// button.add(target);
		// 	// button.on('click', this.onToggleButton.bind(this, target));
		// 	evidenceCard.parent.parent.parent.add(evidenceCard);
		// 	// debugger;
		// }

	});

});
