define(function (require) {

	var template = require('text!view/CaseOverview.html');
	var styles = [
		'../resources/css/case-overview.css'
	];

	return {
		template: template,
		styles: styles
	};

});
