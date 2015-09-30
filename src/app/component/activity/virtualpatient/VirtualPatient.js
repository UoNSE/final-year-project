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
	var ActionButtonHandle = require('component/actionbuttonhandle/ActionButtonHandle');
	var Tests = require('component/activity/virtualpatient/tests/Tests');
	var Query = require('component/activity/virtualpatient/querypatient/Query');
	var PatientBody = require('component/activity/virtualpatient/patientbody/PatientBody');
	var EvidenceFeed = require('component/activity/virtualpatient/evidencefeed/EvidenceFeed');
	var Chart = require('component/activity/virtualpatient/chart/Chart');
	var Help = require('component/help/Help');

	var Evidence = require('component/activity/issues/card/evidence/Evidence');
	var EvidenceCollection = require('collection/Evidence');
	var EvidenceModel = require('model/Evidence');
	var Delete = require('component/activity/issues/menu/actionbutton/delete/Delete');

	var Menu = require('component/activity/issues/menu/Menu');

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
			// debugger;
			Component.prototype.initialize.apply(this, arguments);
			this.vproot = this;
			this.listenTo(this.collection, 'sync', this.onSync);
			this.collection.fetch();
			this.visiblemenus = [];
			this.collaborative = true;

		},

		onSync: function (collection) {
			// get the patient with the case Id.
			this.patients = this.collection;
			this.evidencecollection = new EvidenceCollection();
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

            this.queries = this.patient.get('queries');
            this.responses = this.patient.get('responses');
			this.querymenu = this.add(new Query(this));

			this.EvidenceFeed = this.addEvidenceFeed();
			this.chart = this.add(new Chart({model: this.patient}));
			this.chart.position.set(0,275);


			this.help = this.add(new Help({
				model: {
				helpContent:
				'Players take turns at gathering evidence.</br> \
				Collect evidence about the \
				patients condition.   </br> </br>\
				Use the <strong>"Query"</strong> button </br>\
				to ask the patient questions. </br> </br>\
				Use the <strong>"Test"</strong> button </br>\
				to run blood/urine/saliva </br>\
				tests on the patint.</br> </br>\
				Use the <strong>"Chart"</strong> button </br>\
				to see the patients details </br>\
				and vital signs.</br></br>\
				<strong>Inspect</strong> areas of the body </br>\
				to reveal scans and other  </br>\
				information related to that area. </br></br>\
				If you no longer need an evidence card,<br> you can drag it to the trash can.'}
			}));
			this.help.interactive = true;

			this.menu = this.add(new Menu());
			this.menu.on({
				delete: this.onDelete.bind(this),
			});
			this.menu.split.hide(); // hack. not sure know how to destroy.
			// this.menu.delete.detached = true;
			this.menu.delete.position.set(-370, -300);
			this.menu.delete.interactive = true;
			// this.menu.interactive = true;


			// this.help.scale.set(0.5, 0.5);
			// this.buttons = {};
			this.addVPButtons();


		},


		_hideElements: function() {
			this.tests.hide();
			this.querymenu.hide();
			this.chart.hide();

		},

		addVPButtons: function () {
			var texts = ['Query', 'Test', 'Chart'];
			var targets = [this.querymenu, this.tests, this.chart];
			var n = texts.length;
			var offset = 100;

			texts.forEach(function (text, i) {
				var buttonhandle = this.add(new ActionButtonHandle());
				var button = buttonhandle.add(new ActionButton({
					model: new ActionButtonModel({
						text: text,
						id: text + 'Btn',
						// color: danger
					})
				}));
				// buttons x position
				var buttonXPos = button.position.x;
				//
				// button.position.set(buttonXPos, 100);
				var scale = i - (n - 1) / 2;
				buttonhandle.position.set(0, -250);
				var buttonhandleXPos = buttonhandle.position.x;
				var buttonhandleYPos = buttonhandle.position.y;
				buttonhandle.position.set(scale * (offset + offset * 1), -300);
				button.position.set(buttonhandleXPos, buttonhandleYPos+350);

				// buttonhandle.position.set(buttonXPos, -250);
				var target = targets[i];
				// if(button.text == "Query"|| button.text == "Test"){
					button.add(target);
				// }
				// else{
				// 	this.vproot.add(target);
				// }
				button.on('click', this.onToggle.bind(this,target));
				// this.bindDraggableEvents(button);
				button.interactive = false;
				buttonhandle.interactive = true;

				// this.buttons.push();

			}.bind(this));
		},


		/**
		 * An event triggered when an action-button is being dragged.
		 */
		// onDrag: function () {
		//
		// },

		/**
		 * An event triggered at the end of an action-button drag event.
		 */
		// onDragEnd: function(){
		// 	// debugger;
		// 	// if(this.children !== null && !this.children.visible){
		// 	// 	this.children.show();
		// 	// }
		// },

		/**
		 * Binds the draggable events to the component.
		 *
		 * @param component The .
		 */
		// bindDraggableEvents: function (component) {
		// 	component.on({
		// 		drag: this.onDrag.bind(this),
		// 		dragendsource: this.onDragEnd.bind(this),
		// 	});
		// },


		onDelete: function (event) {
			event.draggable.remove();
		},

		onToggle: function (toggableTarget) {

			if(this.collaborative != true){
				if(toggableTarget == this.querymenu){
					this.tests.hide();
					this.chart.hide();
				}
				else if(toggableTarget == this.tests){
					this.querymenu.hide();
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

	});

});
