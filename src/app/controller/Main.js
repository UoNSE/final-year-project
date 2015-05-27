define(function (require) {

	'use strict';

	var $ = require('jquery');
	require('jquery.transform2d');
	require('jquery-ui');
	var Handlebars = require('handlebars');
	var Controller = require('controller/Controller');
	var template = require('text!view/Main.html');
	var styles = [
		//'../resources/css/main.css'
	];

	return Controller.extend({
		template: Handlebars.compile(template),
		styles: styles,
		render: function () {
			// TODO fix hack
			this.content.previous.push('controller/Main');
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
				var distance = 200;
				var cls = 'btn-material-' + colorClasses[Math.round(i * colorClasses.length / numItems)];
				btn.addClass(cls).css({
					transform: 'scale(0)',
					width: 100,
					height: 100,
					fontSize: 12,
					textAlign: 'center'
				}).delay(i * 50).animate({
					transform: 'translate(' + distance * Math.cos(angle) + 'px, ' + distance * -Math.sin(angle) + 'px) scale(1)'
				}, {
					duration: 1500,
					easing: 'easeOutElastic'
				}).click(function (event) {
					$(event.target).addClass('disabled');
					container.animate({
						transform: 'scale(0)'
					}, {
						duration: 500,
						easing: 'easeInBack',
						complete: function () {
							this.load('controller/CaseOverview');
						}.bind(this)
					});
				}.bind(this));

				container.append(btn);

				$('#btn-start').addClass('disabled').animate({
					opacity: 0,
					transform: 'scale(0)'
				}, {
					duration: 600,
					easing: 'easeInBack'
				});
			}

			var info = $('<button class="btn btn-default disabled abs-center">Pick a<br>Case</button>');
			info.css({
				height: 100,
				width: 150,
				fontSize: 20,
				transform: 'scale(0)'
			}).delay(500).animate({
				transform: 'scale(1)'
			}, {
				duration: 1000,
				easing: 'easeOutElastic'
			});
			container.append(info);

		}
	});

});
