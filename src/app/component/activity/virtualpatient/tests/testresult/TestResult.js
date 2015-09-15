define(function(require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/activity/virtualpatient/tests/testresult/TestResult.hbs');

	return Component.extend({
		template: template,
		classes: 'urine-analysis',
		styles: 'component/activity/virtualpatient/tests/testresult/TestResult.css',
		events:{
			'click #hide-chart-button': '_onHide'
		},
		initialize: function (results) {
			Component.prototype.initialize.apply(this, arguments);
			this.results = results;
			// debugger;
			// var TestResultResult = TestResults[0];
		},

		createTestResults: function () {
			this.add(new EvidenceCard());
		},

		_onHide: function(){
			this.hide();
		}

	});

});
