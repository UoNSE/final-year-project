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
			var buttons = $('.case-overview button');
			for (var i = 0, len = buttons.length; i < len; i++) {
				var button = $(buttons[i]);
				button.height(button.width());
			}
			debugger;
		}
	});

});
