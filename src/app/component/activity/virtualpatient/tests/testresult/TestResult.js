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
		initialize: function (params) {
			Component.prototype.initialize.apply(this, arguments);
			this.model = params.model.attributes.metrics;
			this.results = this.model;
			this.vproot = params.vproot;
			// debugger;
			// this.metrics = this.results.attributes.metrics;
		},

		createTestResults: function () {

		},

		_onHide: function(){
			this.hide();
		},
		_addHighEvidenceCard: function(){
			var attribute = event.target.parentElement.parentElement;
			// debugger;
			var value = attribute.children.namedItem("value").innerHTML;
			// debugger;
			this._addEvidenceCard("high", attribute, value);
		},
		_addLowEvidenceCard: function(){
			var attribute = event.target.parentElement.parentElement;
			var value = attribute.children.namedItem("value").innerHTML;
			this._addEvidenceCard("low", attribute, value);
		},

		_addEvidenceCard: function(flag, attribute, value){

			// find right result for the element clicked with attribute
			var result = this.getResultMatching(attribute.id);
			// debugger;

			var evidenceCard = this.addEvidence(new EvidenceModel({
				width: 200,
				height: 100,
				title: 'Evidence',
				color: 'info',
				body: result.name + " is "+flag + " ("+value + ")",
				correct: result.correct
			}));

			evidenceCard.position.x = 200;
			this.vproot.add(evidenceCard);
		},

		addEvidence: function (model) {
			var evidence = new Evidence({
				model: model
			});
			return evidence;
		},


		getResultMatching: function(id){
			// for(var result in this.results){
			for(var i=0;i<this.results.length;i++){
				// console.log(result.name);
				// console.log(id);
				var result = this.results[i];
				// debugger;
				if(result.name === id){
					return result;
				}
			}
		}


	});

});
