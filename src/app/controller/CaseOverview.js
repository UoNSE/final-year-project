define(function (require) {

	var Controller = require('controller/Controller');
	var Handlebars = require('handlebars');
	var template = require('text!view/CaseOverview.html');
	var styles = [
		'../resources/css/case-overview.css'
	];

	return Controller.extend({
		template: Handlebars.compile(template),
		styles: styles,
		render: function () {
			// Get all the buttons from the view.
			$('.case-overview').css({
				transform: 'scale(0)'
			}).animate({
				transform: 'scale(1)'
			}, 300);
		}
	});

});
