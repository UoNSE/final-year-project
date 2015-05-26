define(function (require) {

	'use strict';

	var $ = require('jquery');
	require('jquery.transform2d');
	require('jquery.transform3d');
	var Backbone = require('backbone');
	var Handlebars = require('handlebars');
	var template = require('text!view/Main.html');
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
				"Bob & Sally",
				"Joe & Jane",
				"Frank & Samantha",
				"Oscar & Elizabeth",
				"Bob & Sally",
				"Joe & Jane",
				"Frank & Samantha",
				"Oscar & Elizabeth"
			];
			var numItems = texts.length;

			for (var i = 0; i < numItems; i++) {
				var btn = $('<button class="btn btn-default btn-fab btn-raised btn-material-red abs-center">' + texts[i] + '</button>');
				$(document.body).append(btn);


				var angle = 2 * Math.PI * (i / numItems);
				var distance = 500;
				btn.css('transform', 'scale(0, 0)');
				btn.delay(i * 50).animate({
					top: -distance * Math.sin(angle),
					left: distance * Math.cos(angle),
					transform: 'scale(1, 1)'
				}, 200);
			}

		}
	});

});
