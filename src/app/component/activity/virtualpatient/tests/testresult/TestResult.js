define(function(require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/activity/virtualpatient/tests/testresult/TestResult.hbs');
	var Evidence = require('component/activity/issues/card/evidence/Evidence');
	var EvidenceCollection = require('collection/Evidence');
	var EvidenceModel = require('model/Evidence');

	return Component.extend({
		template: template,
		classes: 'urine-analysis',
		styles: 'component/activity/virtualpatient/tests/testresult/TestResult.css',
		events:{
			'click #hide-chart-button': '_onHide',
			'click .flag-btn-high': '_addHighEvidenceCard',
			'click .flag-btn-low': '_addLowEvidenceCard',

		},
		initialize: function (results) {
			Component.prototype.initialize.apply(this, arguments);
			this.results = results;
			// debugger;
			// var TestResultResult = TestResults[0];
		},

		createTestResults: function () {

		},

		_onHide: function(){
			this.hide();
		},
		_addHighEvidenceCard: function(){
			this._addEvidenceCard("high");

			// this.vproot = this.parent.parent.parent;
			// debugger;
			// this.vproot.addEvidenceCard("high");
			// this.dispatchEvent('createNewEvidenceCard', event);

			// ._addEvidenceCard("high");
		},
		_addLowEvidenceCard: function(){
			this._addEvidenceCard("low");
			// this.parent.parent.parent._addEvidenceCard("low");
		},

		/**
		 * Iterates through the evidence collection and adds the cards to the view.
		 *
		 * @param model The evidence model.
		 * @returns {*}
		 */
		addEvidence: function (model) {

			// assume root is here
			this.vproot = this.parent.parent.parent.parent;
			// console.log(this.vproot);
			// if a testresult is made in another child component
			// (eg. in a bloodtest, we can get the root by checking the parent.

			// while(this.vproot.el.className != 'component virtual-patient'){
			while(this.vproot.cid != 'view7'){	// hack

				this.vproot = this.vproot.parent;
			}

			// var evidence = this.add(new Evidence({
			var evidence = this.vproot.add(new Evidence({
				model: model
			}));
			// this.bindDraggableEvents(evidence);
			return evidence;
		},

		_addEvidenceCard: function(flag){
			// console.log(flag);
			var metric = "Glucose";
			var evidenceCard = this.addEvidence(new EvidenceModel({
				width: 200,
				height: 100,
				title: 'Evidence',
				color: 'info',
				body: metric + "is "+flag 
			}));

			evidenceCard.position.x = 200;

		}

	});

});
