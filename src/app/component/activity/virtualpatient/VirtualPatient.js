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
	// var ActionButtonHandleModel = require('model/ActionButtonHandle');

	var Tests = require('component/activity/virtualpatient/tests/Tests');
	var Query = require('component/activity/virtualpatient/querypatient/Query');
	var PatientBody = require('component/activity/virtualpatient/patientbody/PatientBody');
	var EvidenceFeed = require('component/activity/virtualpatient/evidencefeed/EvidenceFeed');
	var Chart = require('component/activity/virtualpatient/chart/Chart');
	var Help = require('component/help/Help');
	var Inventory = require('component/inventory/Inventory');

	var HelpModel = require('model/Help');
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

		initialize: function (caseID) {
			// debugger;
			Component.prototype.initialize.apply(this, arguments);
			this.vproot = this;
			this.listenTo(this.collection, 'sync', this.onSync);
			this.collection.fetch();
			this.visiblemenus = [];
			this.collaborative = false;
			this.caseID =  caseID;

		},

		onSync: function (collection) {
			// get the patient with the case Id.
			this.patients = this.collection;
			// this.evidencecollection = new EvidenceCollection();
			// console.log("this case id: " + this.caseID);
			// debugger;
			this.patient = this.patients.get(1); // get id.
			// this.patient = this.patients.get(this.caseID); // get id.
			this.addComponents();
			// debugger;
			this._hideElements();
		},

		addEvidenceCardToCollection: function(evidence){
			this.evidencecollection.add(evidence);
		},

		addComponents: function() {
			this.testresults = this.patient.get('testresults');
			this.hotspots = this.patient.get('hotspots');

			var params = {vproot: this.vproot}; // = this; //this.vproot;
			this.patientbody = this.add(new PatientBody(params)); //add params so it has access to vproot

			if(this.collaborative){
				//this.patientbody.interactive = true;
				this.patientbody.setInteractive();
			}
			// this.patientbody = this.add(new PatientBody(this.hotspots));
			this.tests = new Tests(this.vproot,this.testresults);

			this.queries = this.patient.get('queries');
			this.responses = this.patient.get('responses');
			this.querymenu = new Query(this);

			this.inventory = new Inventory();

			// this.EvidenceFeed = this.addEvidenceFeed();
			this.chart = new Chart({vproot:this.vproot, model: this.patient});
			this.chart.position.set(0,275);


			this.help = this.add(new Help({
				model: new HelpModel({
					body: 'Players take turns at gathering evidence. Collect evidence about the patients condition.<br><br>' +
						'Use the <strong>Query</strong> button to ask the patient questions.<br><br>' +
                        'Use the <strong>Test</strong> button to run blood, urine and saliva tests on the patient.<br><br>' +
                        'Use the <strong>Chart</strong> button to view the patients details and vital signs.<br><br>' +
                        '<strong>Inspect</strong> areas of the body to reveal scans and other information related to that area.' +
                        'If you no longer need an evidence card, you can drag it to the trash can.'
				})
			}));
			//this.help.interactive = true;
			this.help.setInteractive();

			// this.hiddenLink = this.addTimelineLink();

			this.menu = this.add(new Menu());
			this.menu.on({
				delete: this.onDelete.bind(this)
			});
			this.menu.split.hide(); // hack. not sure know how to destroy.
			// this.menu.delete.detached = true;
			this.menu.delete.position.set(-370, -300);
			//this.menu.delete.interactive = true;
			this.menu.delete.setInteractive();
			this.addVPMenus();
		},


		_hideElements: function() {
			this.tests.hide();
			this.querymenu.hide();
			this.chart.hide();
			// this.hiddenLink.hide();

		},

		addVPMenus: function () {
			var texts = ['Query', 'Test', 'Chart'];
			var targets = [this.querymenu, this.tests, this.chart];
			var n = texts.length;
			var offset = 100;

			texts.forEach(function (text, i) {

				// var actionbuttonhandlemodel = new ActionButtonHandleModel();
				// var buttonhandle = new ActionButtonHandle({model: actionbuttonhandlemodel});
				var buttonhandle = new ActionButtonHandle();
				// var button = buttonhandle.add(new ActionButton({
				var button = new ActionButton({
					model: new ActionButtonModel({
						text: text,
						id: text + 'Btn',
						styles: {
							width: 100,
							height: 100
							// color: danger
						}
					})
				});
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

				// check if buttonhandle is too high for button and target
				// to be seen onscreen.
				// this needs to be done after every drag end event.
				// if it is, then reposition button and target underneath
				// instead of ontop.
				// if(buttonhandle.position.y)



				var target = targets[i];
				button.add(target);

				button.on('click', this.onToggle.bind(this,target));
				// this.bindDraggableEvents(button);

				buttonhandle.add(button);
				// this.bindDraggableEvents(buttonhandle);
				this.add(buttonhandle);
				// debugger;
				this.bindDraggableEvents(buttonhandle);
				// debugger;
				// this.event.trigger();

				// this.buttons.push();

			}.bind(this));
		},

		addTimelineLink: function () {

			// add a link to the Timeline page
            var hiddenLink = this.add(new ActionButton({
                model: {
                    color: 'light-green',
                    classes: 'help-btn actions-btn',
                    icon: 'content-send',
                    href: 'cases/'.concat(caseID, '/case/Overview')
                }
            }));
			return hiddenLink;
		},

		/**
		 * Binds the draggable events to the component.
		 *
		 * @param component The button handle.
		 */
		bindDraggableEvents: function (component) {
			//component.interactive = true;
			component.setInteractive();
			component.setDraggable();
			// debugger;
			component.on({
				drag: this.onDrag.bind(this),
				dragendsource: this.onDragEnd.bind(this),
				// dropsink: this.onDrop.bind(this)
			});
		},

		/**
		 * An event triggered when a card is being dragged.
		 */
		onDrag: function () {
			// this.menu.show();
			// this.mergedYet = false;
		},

		onDragEnd: function(event){
			// console.log("drag end");
			// //alert("drag end");
			var yOffset = event.draggable.position.y;
			// var topScreenLimit = 350;
			// var bottScreenLimit = -370;
			// var leftScreenLimit =
			console.log(yOffset);
		},



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
					this.querymenu.hide();
				}
			}

			toggableTarget.toggle();
			toggableTarget.bringToFront();

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
