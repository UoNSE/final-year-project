define(function (require) {

	'use strict';

	var $ = require('jquery');
	require('jquery.transform2d');
	require('jquery.transform3d');
	var Backbone = require('backbone');
	var Handlebars = require('handlebars');
	var template = require('text!view/Main.html');
	var Content = require('controller/Content');
	var Color = require('util/Color');
	var styles = [
		//'../resources/css/main.css'
	];

	return Backbone.View.extend({
		template: Handlebars.compile(template),
		styles: styles,
		initialize: function () {

			$('#btn-start').click(this.onStart.bind(this));

		},
		onStart: function () {

			var texts = [
				"Bob &<br>Sally",
				"Joe &<br>Jane",
				"Frank &<br>Samantha",
				"Oscar &<br>Elizabeth",
				"Bob &<br>Sally",
				"Joe &<br>Jane",
				"Frank &<br>Samantha",
				"Oscar &<br>Elizabeth"
			];
			var numItems = texts.length;

			var colorClasses = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan',
						     	'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange'];

			var container = $('<div class="abs-center"></div>');
			$(document.body).append(container);
			for (var i = 0; i < numItems; i++) {
				var btn = $('<button class="btn btn-default btn-fab btn-raised btn-material-red abs-center">' + texts[i] + '</button>');

				var angle = 2 * Math.PI * (i / numItems);
				var distance = 400;
				//var hue = i / numItems;
				//var color = Color.HSVtoRGB(hue, 1, 1);
				btn.addClass('btn-material-' + colorClasses[Math.round(i * colorClasses.length / numItems)]);
				btn.css({
					transform: 'scale(0)',
					width: 100,
					height: 100,
					fontSize: 12,
					textAlign: 'center'
				});
				btn.delay(i * 50).animate({
					top: -distance * Math.sin(angle),
					left: distance * Math.cos(angle),
					transform: 'scale(1)'
				}, 200);
				container.append(btn);
				$('#btn-start').addClass('disabled').animate({
					opacity: 0,
					transform: 'scale(0)'
				}, 500);
				btn.click(function () {
					container.animate({
						transform: 'scale(0)'
					}, 300, function () {
						new Content().load('controller/CaseOverview');
					});
				});
			}

		}
	});

});
