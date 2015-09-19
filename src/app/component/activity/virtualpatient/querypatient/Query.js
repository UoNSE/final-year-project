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

			// this.testresults = testresults;
			// this.UrineAnalysisResult = this.testresults.get(1);
			this.vproot = vproot;
			// console.log(this.vproot);
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

			this.testMenu = [];
			this.buttoncount = 1;
			// for all menu items in collection, add menu item
			this.yOffset = 50;

			// for all menu items in JSON make a button with a label
			// and give it a target
			this.menuBtn1 = this.createMenuButton('What is the problem?')
			// this.testMenu.push(this.menuBtn1);
			this.addEvidenceTarget(this.menuBtn1, "I hurt my knee");
			this.buttoncount++;
			this.menuBtn2 = this.createMenuButton('Where does it hurt?');
			// this.testMenu.push(this.menuBtn2);
			this.addEvidenceTarget(this.menuBtn2, "On my knee");
			this.buttoncount++;
			this.menuBtn3 = this.createMenuButton('When did the pain begin?');
			// this.testMenu.push(this.menuBtn3);
			this.addEvidenceTarget(this.menuBtn3, "Yesterday");
			this.buttoncount++;
			this.menuBtn4 = this.createMenuButton('Have you noticed any swelling?');
			// this.testMenu.push(this.menuBtn4);
			this.addEvidenceTarget(this.menuBtn4, "On my knee");
			this.buttoncount++;
			this.menuBtn5 = this.createMenuButton('Has your skin been dry?');
			// this.testMenu.push(this.menuBtn5);
			this.addEvidenceTarget(this.menuBtn5, "No");
			this.buttoncount++;
			this.menuBtn6 = this.createMenuButton('How old are you?');
			// this.testMenu.push(this.menuBtn6);
			this.addEvidenceTarget(this.menuBtn6, "Im 75");
			this.buttoncount++;
			this.menuBtn7 = this.createMenuButton('How have you been sleeping?');
			// this.testMenu.push(this.menuBtn7);
			this.addEvidenceTarget(this.menuBtn7, "Not well. Iâ€™ve been waking up frequently.");
			this.buttoncount++;
			this.menuBtn8 = this.createMenuButton('Have you noticed any swelling?');
			// this.testMenu.push(this.menuBtn8);
			this.addEvidenceTarget(this.menuBtn8, "On my knee");
			this.buttoncount++;
			this.menuBtn9 = this.createMenuButton('Do you have family here?');
			// this.testMenu.push(this.menuBtn9);
			this.addEvidenceTarget(this.menuBtn9, "Yes, Toi song voi con gai cua toi");
			this.buttoncount++;
			// this.add(testMenu);
			// debugger;

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

		addEvidenceTarget: function(button, dummy){

			// var dummy = "dummy";
			// debugger;

			var target = this.addEvidence(new EvidenceModel({
				width: 200,
				height: 100,
				title: 'Evidence',
				color: 'info',
				body: "Question: "+button.model.attributes.text + "\n" + "Response: "+ dummy
				// body: dummy
			}));
			var yTarget = button.position.y;
			target.position.y = yTarget - 310;
			target.position.x = 100;
			target.hide();
			button.add(target);
			button.on('click', this.onToggleButton.bind(this, target));
		},

		addEvidence: function (model) {

			// debugger;
			// assume root is here
			// this.vproot = this.parent.parent.parent;
			// console.log(this.vproot);
			// if a testresult is made in another child component
			// (eg. in a bloodtest, we can get the root by checking the parent.
			// while(this.vproot.el.className != 'component virtual-patient'){
			// while(this.vproot.cid != 'view7'){	// hack
			//
			// 	this.vproot = this.vproot.parent;
			// }

			// var evidence = this.add(new Evidence({
			var evidence = this.vproot.parent.add(new Evidence({
				model: model
			}));
			return evidence;
		},

	});

});
