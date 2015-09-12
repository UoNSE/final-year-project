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
	var PatientBody = require('component/activity/virtualpatient/patientbody/PatientBody');
	var EventFeed = require('component/activity/virtualpatient/eventfeed/EventFeed');
	var Chart = require('component/activity/virtualpatient/chart/Chart');

	var Patients = require('collection/Patients');

	return Component.extend({
		template: template,
		classes: 'virtual-patient',
		styles: 'component/activity/virtualpatient/VirtualPatient.css',

		collection: new Patients(),

		events: {
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

			this.patientbody = this.add(new PatientBody());
			this.tests = this.add(new Tests());
			this.eventFeed = this.addEventFeed();
			this.chart = this.add(new Chart());
			this.addButtons();

			// window.chart = this.chart;


			this.collection.fetch();
			//   this._transformItems();
			  this._hideElements();
			//   this._startEventFeed();
		},

		onSync: function (collection) {
			this.listenTo(collection, 'add', this.render);
		},


		_hideElements: function() {
			this.tests.hide();
			this.chart.hide();
			// $('#patients-chart-table').hide();
			// $('#urine-analysis-results').hide();
			// $('#hide-chart-button').hide();
			// $('.observation-card').hide();
			// $('.speech-card').hide();
			// $('#query-menu').hide();
			// $('.button-menu').hide();
			// $('#test-menu-container2').hide();
			// $('#target').hide();

			// $('#test-menu').hide();
			// $('.component virtual-patient tests').hide();
			// $('.tests').hide();

		},

		// _transformItems: function () {
        //     //---------------------------------------------
        //     var transformableResources = [
        //         //'<div style="background-color:#00f;width:100px;height:100px"></div>',
        //         $('#speech-card1').get(),
        //         $('#speech-card2').get(),
		//
        //         $('#observation-card1').get(),
        //         $('#observation-card2').get(),
        //         $('#observation-card3').get(),
		//
        //         //$('#dummy-card1').get(),
        //         //$('#dummy-card2').get(),
        //         //$('#dummy-card3').get(),
        //         //$('#dummy-card4').get(),
		//
		//
        //         // we might need to change it back to this later.
        //         // atm were translating containers cos i wasnt sure how to
        //         // transform both the button and menu at once.
        //         // this is a hack with a bug -
        //         // ie. you can drag around the container.
		//
        //         // $('#button-chart').get(),
        //         // $('#button-query').get(),
        //         // $('#button-tests').get(),
		//
        //         //$('#virtual-patient-img-container').get(),
        //         $('#patients-chart-container').get(), // //jquery fetch things
        //         $('#query-menu-container').get(),
        //         $('#test-menu-container').get(),
        //         $('#urine-analysis-results').get()
        //     ];
		//
        //     var transforms = [
        //         [glm.vec3.fromValues(-420, -300, 0),   glm.vec3.fromValues( .25,.25, 1), 0], //(translate,,) (scale,,)
        //         [glm.vec3.fromValues(-420, -300, 0),   glm.vec3.fromValues( .25,.25, 1), 0],
		//
        //         [glm.vec3.fromValues(-420, -300, 0), glm.vec3.fromValues(.25,.25, 1), 0],
        //         [glm.vec3.fromValues(-420, -300, 0), glm.vec3.fromValues(.25,.25, 1), 0],
        //         [glm.vec3.fromValues(-420, -300, 0),glm.vec3.fromValues(.25,.25, 1), 0],
		//
        //         //[glm.vec3.fromValues(-420, -300, 0), glm.vec3.fromValues(.25,.25, 1), 0],
        //         //[glm.vec3.fromValues(-420, -300, 0), glm.vec3.fromValues(.25,.25, 1), 0],
        //         //[glm.vec3.fromValues(-420, -300, 0),glm.vec3.fromValues(.25,.25, 1), 0],
        //         //[glm.vec3.fromValues(-420, -300, 0),glm.vec3.fromValues(.25,.25, 1), 0],
		//
		//
        //         // [glm.vec3.fromValues(-430, 300, 0),   glm.vec3.fromValues( 1.0,1.0, 1), 0],
        //         // [glm.vec3.fromValues(-330, 300, 0),   glm.vec3.fromValues( 1.0,1.0, 1), 0],
        //         // [glm.vec3.fromValues(-230, 300, 0),   glm.vec3.fromValues( 1.0,1.0, 1), 0],
		//
        //         //[glm.vec3.fromValues(0, 0, 0),glm.vec3.fromValues(2.5,2.5, 1), 0],
        //         [glm.vec3.fromValues(170, 500, 0), glm.vec3.fromValues(1.0, 1.0, 1), 0],
        //         [glm.vec3.fromValues(170, 500, 0), glm.vec3.fromValues(1.0, 1.0, 1), 0],
        //         [glm.vec3.fromValues(170, 500, 0), glm.vec3.fromValues(1.0,1.0, 1), 0],
        //         [glm.vec3.fromValues(0, 0, 0), glm.vec3.fromValues(1.0,1.0, 1), 0]
		//
        //     ];
        //     var numItems  = transformableResources.length;
        //     for (var i =0; i<numItems; i++) {
        //         var element = $(transformableResources[i]);
        //         element.addClass("abs-center").appendTo(this.$el);
        //         element.css('transform', transforms[i]);
		//
        //         // MultiTouchManager.addElementRTS(element);
        //         // var draggableMTelement = MultiTouchManager.addElementDraggable(element);
        //         // this.bindDraggableEvents(draggableMTelement);
		//
        //         var multiTouchElement = this.multitouch.addElement(element);
        //         var behaviour = new RotateTranslateScaleBehaviour(multiTouchElement);
        //         multiTouchElement.addBehaviour(behaviour);
		//
        //         glm.vec3.copy(behaviour.translation, transforms[i][0]);
        //         glm.vec3.copy(behaviour.scale, transforms[i][1]);
        //         glm.vec3.copy(behaviour.rotation, transforms[i][2]);
        //         behaviour.needsUpdate();
        //         // this.elements = this.elements.add(element);
        //     }
		//
		//
        // },


		addButtons: function () {
			var texts = ['Query', 'Test', 'Chart'];
			var targets = [this.eventFeed, this.tests, this.chart];
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

		onToggle: function (toggable, event) {
			console.log('call');
			toggable.toggle();
		},

		// onToggleTest: function (test, event) {
		// 	test.toggle();
		// },

		addEventFeed: function(){

			var eventfeed = this.add(new EventFeed());
			var posX = -300;
			var posY = 400;
			eventfeed.position.set(posX, posY);

			return this.add(eventfeed);

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
