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
			if(button.visible){
				button.children().forEach(child => {
					child.hide();
				});
			}
			// button.children.hide();
			button.toggle();
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
				height: 100,
				title: 'Evidence',
				color: 'info',
				body: "Question: "+button.model.attributes.text + "\n" + "Response: "+ response
				// body: dummy
			}));

			// add the evidence to the evidence collection
			this.vproot.evidencecollection.add(evidencetarget);

			var yTarget = button.position.y;
			evidencetarget.position.y = yTarget - 310;
			evidencetarget.position.x = -200;
			evidencetarget.hide();
			button.add(evidencetarget);
			button.on('click', this.onToggleButton.bind(this, evidencetarget));
		},

		addEvidence: function (model) {

			// add the evidence to the root virtual patient component.
			var evidence = this.vproot.parent.add(new Evidence({
				model: model
			}));
			return evidence;
		},

	});

});
