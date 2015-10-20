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

	var Card = require('component/activity/issues/card/Card');
	var Tests = require('component/activity/virtualpatient/tests/Tests');
	var Query = require('component/activity/virtualpatient/querypatient/Query');
	var PatientBody = require('component/activity/virtualpatient/patientbody/PatientBody');
	var EvidenceFeed = require('component/activity/virtualpatient/evidencefeed/EvidenceFeed');
	var Chart = require('component/activity/virtualpatient/chart/Chart');
	var Help = require('component/help/Help');
	var StatusCart = require('component/statuscart/StatusCart'); //ox
	var Inventory = require('component/inventory/Inventory');
	var AddToCollectionButton = require('component/activity/virtualpatient/addtocollectionbutton/AddToCollection');

	var HelpModel = require('model/Help');
	var StatusCartModel = require('model/Statuscart');
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

		initialize: function (inventory, caseID) {
			// debugger;
			Component.prototype.initialize.apply(this, arguments);
			this.vproot = this;
			this.listenTo(this.collection, 'sync', this.onSync);
			this.collection.fetch();
			this.visiblemenus = [];
			this.collaborative = false;
			this.inventory = inventory;
			this.caseID =  caseID;
			this.noclues = 0; //the number of clues the user has discovered
			this.correctclues = 7; //the amount of correct clues for this module
			this.cluelist = '';
			console.log("inventory on entering activity: " + this.inventory.get("evidence").length + " evidences in inventory.");



		},

		onSync: function (collection) {
			// get the patient with the case Id.
			this.patients = this.collection;
			// this wont load properly if there is no patient for the case.
			this.patient = this.patients.get(this.caseID); // get id.
			this.addComponents();
			// debugger;
			this._hideElements();
		},

		addComponents: function() {
			this.testresults = this.patient.get('testresults');
			this.hotspots = this.patient.get('hotspots');

			var params = {vproot: this.vproot}; // = this; //this.vproot;
			this.evidencecollection = new EvidenceCollection();
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

			// this.inventory = new Inventory();

			// this.EvidenceFeed = this.addEvidenceFeed();
			this.chart = new Chart({vproot:this.vproot, model: this.patient});
			this.chart.position.set(0,275);


			this.help = this.add(new Help({
				model: new HelpModel({
					title: 'Help', //apperently this is getting overridden when we have a second simmilar model in our view
					body: 'Players take turns at gathering evidence.'+ '<br>' + '<br>'+
						'Collect evidence about the patients condition ' +
					 	'by dragging them to the green <strong>inventory</strong> button.'+'<br><br>' +
						'Use the <strong>Query</strong> button to ask the patient questions.<br><br>' +
                        'Use the <strong>Test</strong> button to run blood, urine and saliva tests on the patient.<br><br>' +
                        'Use the <strong>Chart</strong> button to view the patients details and vital signs.<br><br>' +
                        '<strong>Inspect</strong> areas of the body to reveal scans and other information related to that area.' +
                        'If you no longer need an evidence card, you can drag it to the trash can.'
				})
			}));
			this.help.setInteractive();

			//ox
			//ok, so the addtoCollection button is going to show a module progress yes. It will highlight correct evidence as green
			//and incorrect evidence as red (with possibly a small time delay
			//the progress bar will be an n/7 indicator representing how many of the 7 correct evidences have been found on the virtual patient.
			//var noclues=0; //number of correct clues found so far
			this.statuscart = this.add(new StatusCart({
				model: new StatusCartModel({
					title: 'Clues found',
					body: '<div class="inventorydisp"><i>No Clues discovered yet</i></div><br>'+
					'Correct clues found: <span class="cf">'+this.noclues+'</span>/'+this.correctclues+
					'<div class="btnspace"></div>'
				})
			}));






			this.addtocollectionbutton = this.add(new AddToCollectionButton()); //add the AddToCollectionButton
			this.addtocollectionbutton.on({
				addToCollection: this.addEvidenceCardToCollection.bind(this)
			});

			this.hiddenLink = this.addTimelineLink();
			this.menu = this.add(new Menu());
			this.menu.on({
				delete: this.onDelete.bind(this),
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
			this.hiddenLink.hide();

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
				// this.bindDraggableEvents(buttonhandle);
				buttonhandle.setInteractive();
				buttonhandle.setDraggable();


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
                    href: 'cases/'.concat(this.caseID, '/case/Overview')
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
			if(event.draggable instanceof Evidence){
				event.draggable.remove();
			}
		},

		addEvidenceCardToCollection: function(event){
			console.log("checking evidence is a Evidence");
			console.log("type: "+ event.draggable + " - "+ event.draggableType);
			console.log(event.draggable instanceof Evidence);
			var evidence = event.draggable;
			if(event.draggable instanceof Evidence){
				this.evidencecollection.add(evidence);
				this.inventory.attributes.evidence.add(this.evidencecollection);
				// remove the evidence from the view after adding to inventory.
				evidence.remove();
				// debugger;
				console.log("added "+evidence.id+" to inventory: " + this.inventory.get("evidence").length + " evidences in inventory.");
				console.log("----\n"+this.evidencecollection);

				//@TODO ONLY INCREMENT THE CLUES IF THE HASH IS PART OF THE id=6,7,8,9,10,11,12
				if(this.noclues < this.correctclues)
					this.noclues++; //update count, limit 6
				if(this.noclues == this.correctclues)
					$('.btnspace').html('<button>@todo: If 7(or 9, 2 free strikes) found and incorrect, show reset button, if correct show next module button</button>');
				//THE HASHES CHANGE EACH TIME - NOT RELIABLE :(
				this.cluelist += evidence.id+'<br>'; //evidence.id (evidence is an event.draggable)

				/*
				var cluelist = '';
				for(var i=0;i<this.inventory.get("evidence").length;i++) //todo: find out how to convert this to a foreach
					cluelist += this.inventory.get("evidence") +'<br>';//+this.inventory.get("evidence")+' '+i+'<br>';
				//console.log("******\n"+this.ev);
				*/

				$('.inventorydisp').html(this.cluelist); //update list
				$('.cf').html(this.noclues); //update count display
			}
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
