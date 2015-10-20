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
			var evidenceCard = this.addEvidence(new EvidenceModel({
				width: 200,
				height: 100,
				title: 'Evidence',
				color: 'info',
				body: attribute.id + " is "+flag + " ("+value + ")"
			}));

			evidenceCard.position.x = 200;
			this.vproot.add(evidenceCard);
		},

		addEvidence: function (model) {
			var evidence = new Evidence({
				model: model
			});
			return evidence;
		}


	});

});
