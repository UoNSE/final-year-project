define(function(require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/activity/virtualpatient/tests/urineanalysis/UrineAnalysis.hbs');

	return Component.extend({
		template: template,
		classes: 'urine-analysis',
		styles: 'component/activity/virtualpatient/tests/urineanalysis/UrineAnalysis.css',
		events:{
			'click #hide-chart-button': '_onHide'
		},
		initialize: function () {
			Component.prototype.initialize.apply(this, arguments);
			debugger;
			// var UrineAnalysisResult = TestResults[0];
		},
		_onHide: function(){
			this.hide();
		}

	});

});
