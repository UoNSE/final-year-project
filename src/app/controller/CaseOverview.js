define(function (require) {

	var Backbone = require('backbone');
	var Handlebars = require('handlebars');
	var template = require('text!view/CaseOverview.html');
	var styles = [
		'../resources/css/case-overview.css'
	];

	return Backbone.View.extend({
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
