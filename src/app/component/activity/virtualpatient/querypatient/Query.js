// define(function(require) {
// 	'use strict';
//
// 	var Component = require('core/Component');
// 	var template = require('text!component/activity/virtualpatient/querypatient/Query.hbs');
//
// 	var Button = require('component/button/Button');
// 	var ButtonModel = require('model/Button');
//
// 	var Evidence = require('component/activity/issues/card/evidence/Evidence');
// 	var EvidenceCollection = require('collection/Evidence');
// 	var EvidenceModel = require('model/Evidence');
// 	// var Zim = require('behaviour/ZIndexManager');
//
//
// 	return Component.extend({
// 		template: template,
// 		classes: 'queries',
// 		styles: 'component/activity/virtualpatient/querypatient/Query.css',
// 		Events: {
// 			// 'click .query-btn': '_addEvidenceCard',
// 			'click #query-btn1': '_addEvidenceCard',
// 			'click #query-btn2': '_addEvidenceCard',
// 			'click #query-btn3': '_addEvidenceCard',
// 			'click #query-btn4': '_addEvidenceCard',
// 			'click #query-btn5': '_addEvidenceCard',
// 			'click #query-btn6': '_addEvidenceCard',
// 			'click #query-btn7': '_addEvidenceCard',
// 			'click #query-btn8': '_addEvidenceCard',
// 			'click #query-btn9': '_addEvidenceCard',
// 		},
//
// 		initialize: function (vproot) {
// 			Component.prototype.initialize.apply(this, arguments);
//
// 			this.vproot = vproot;
// 			this.queries = vproot.queries;
// 			this.responses = vproot.responses;
// 			// debugger;
//
// 			this.createTestMenu();
//
// 		},
//
// 		createButton: function (text, color) {
// 			return new Button({
// 				model: new ButtonModel({
// 					text: text,
// 					color: color,
// 					// classes: ['querybtn'],
// 					id: 'query-btn'
// 					// +this.buttoncount
// 				})
// 			});
// 		},
//
// 		createTestMenu: function(){
//
// 			// for all menu items in collection,
// 			// add menu item button with a label (the query)
// 			// and give it a target (the respective patient's response)
// 			// and offset it relative to the previous button
//
// 			// this.buttoncount = 0;
// 			this.yOffset = 50;
// 			this.testMenu = [];
// 			var menuSize = this.queries.length;
//
// 			for (var i=0; i < menuSize; i++){
// 				// this.buttoncount++;
// 				this.menuBtn = this.createMenuButton(this.queries[i].text);
// 				// this.testMenu.push(this.menuBtn);
// 				this.addQueryEvidence(this.menuBtn, this.responses[i].text);
// 			}
//
// 			// this.add(testMenu);
//
// 		},
//
// 		createMenuButton: function(label){
//
// 			var button = this.createButton(label, 'primary');
// 			this.yOffset = this.yOffset+60;
// 			// console.log(this.yoffset);
// 			button.position.set(0, this.yOffset);
//
// 			return this.add(button);
// 		},
//
// 		// _addEvidenceCard: function(){
// 		// 	console.log('clicked');
// 		// 	alert('event');
// 		// 	this._addQueryEvidence();
// 		// },
//
// 		onToggleButton: function (button, queryevidence) {
// 			// debugger;
// 			// button.children.detached = true;
// 			// debugger;
// 			queryevidence.interactive = true;
// 			this.vproot.add(queryevidence);
// 			// debugger;
// 			// if(queryevidence.hidden){
// 			// 	queryevidence.show();
// 			// }
// 			// button.toggle();
//
// 		},
//
// 		addQueryEvidence: function(button, response){
//
// 			// create an evidence wth the evidence model containing the query and response.
// 			var queryevidence = this.addEvidence(new EvidenceModel({
// 				width: 200,
// 				height: 100,
// 				title: 'Evidence',
// 				color: 'info',
// 				body: "Question: "+button.model.attributes.text + "\n" + "Response: "+ response
// 				// body: dummy
// 			}));
//
// 			// add the evidence to the evidence collection
// 			// this.vproot.evidencecollection.add(queryevidence);
//
// 			var yTarget = button.position.y;
// 			queryevidence.position.y = yTarget - 310;
// 			queryevidence.position.x = -200;
// 			queryevidence.hide();
//
// 			// button.add(queryevidence);
//
// 			// bind queryevidence to the button click event.
// 			this.onToggleButton(button,queryevidence);
//
// 			// button.on('click', this.onToggleButton.bind(this, queryevidence));
// 			// queryevidence.detached = true;
//
// 		},
//
// 		addEvidence: function (model) {
//
// 			// add the evidence to the root virtual patient component.
// 			// var evidence = this.vproot.parent.add(new Evidence({
// 			var evidence = new Evidence({
// 				model: model
// 			});
// 			return evidence;
// 		},
//
// 	});
//
// });

define(function(require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/activity/virtualpatient/querypatient/Query.hbs');

	var Button = require('component/button/Button');
	var ButtonModel = require('model/Button');

	var Evidence = require('component/activity/issues/card/evidence/Evidence');
	var EvidenceCollection = require('collection/Evidence');
	var EvidenceModel = require('model/Evidence');
	// var Zim = require('behaviour/ZIndexManager');


	return Component.extend({
		template: template,
		classes: 'queries',
		styles: 'component/activity/virtualpatient/querypatient/Query.css',
		Events: {
			// 'click .query-btn': '_addEvidenceCard',
			'click #query-btn1': '_addEvidenceCard',
			'click #query-btn2': '_addEvidenceCard',
			'click #query-btn3': '_addEvidenceCard',
			'click #query-btn4': '_addEvidenceCard',
			'click #query-btn5': '_addEvidenceCard',
			'click #query-btn6': '_addEvidenceCard',
			'click #query-btn7': '_addEvidenceCard',
			'click #query-btn8': '_addEvidenceCard',
			'click #query-btn9': '_addEvidenceCard',
		},

		initialize: function (vproot) {
			Component.prototype.initialize.apply(this, arguments);

			this.vproot = vproot;
			this.queries = vproot.queries;
			this.responses = vproot.responses;
			// debugger;

			this.createTestMenu();

		},

		createButton: function (text, color) {
			return new Button({
				model: new ButtonModel({
					text: text,
					color: color,
					// classes: ['querybtn'],
					id: 'query-btn'+this.buttoncount
				})
			});
		},

		onToggleButton: function (button, event) {

			button.toggle();
			// debugger;
			// var evidencetarget = button.evidencetarget;
			// this.evidencetarget.detached = true;
			// this.vproot.add(this.evidencetarget);
		},

		createTestMenu: function(){

			// for all menu items in collection,
			// add menu item button with a label (the query)
			// and give it a target (the respective response)
			// and offset it relative to the previous button

			this.yOffset = 50;
			this.testMenu = [];
			var menuSize = this.queries.length;

			for (var i=0; i < menuSize; i++){
				this.menuBtn = this.createMenuButton(this.queries[i].text);
				// this.testMenu.push(this.menuBtn);
				this.addEvidenceTarget(this.menuBtn, this.responses[i].text);
			}

			// this.add(testMenu);

		},

		createMenuButton: function(label){

			var button = this.createButton(label, 'primary');
			this.yOffset = this.yOffset+60;
			// console.log(this.yoffset);
			button.position.set(0, this.yOffset);

			return this.add(button);
		},

		_addEvidenceCard: function(){
			console.log('clicked');
			alert('event');
			this._addEvidenceTarget();
		},

		addEvidenceTarget: function(button, response){

			var evidencetarget = this.addEvidence(new EvidenceModel({
				width: 200,
				height: 150,
				title: 'Evidence',
				color: 'info',
				body: "<strong>Question:</strong> " +
					button.model.attributes.text +
					"</br>" + "<strong>Response: </strong>"+ response,
				classes: " queryevidence" // hack. needs a space. bug in panel.hbs...
				// body: dummy
			}));

			// add the evidence to the evidence collection
			// this.vproot.evidencecollection.add(evidencetarget);
			// button.add(evidencetarget);
			// debugger;
			this.evidencetarget = evidencetarget;
			var yTarget = button.position.y;
			this.evidencetarget.position.y = yTarget - 310;
			this.evidencetarget.position.x = -200;
			this.evidencetarget.hide();
			button.on('click', this.onToggleButton.bind(this, this.evidencetarget));
			// evidencetarget.detached = true;
			this.vproot.add(evidencetarget);
		},

		addEvidence: function (model) {

			// add the evidence to the root virtual patient component.
			var evidence = new Evidence({
				model: model
			});
			return evidence;
		},

	});

});
