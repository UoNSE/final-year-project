define(function (require) {

	'use strict';

	var $ = require('jquery');

	var Controller = require('controller/Controller');
	var Animate = require('behaviour/Animate');

	var styles = [
		//'main.css'
	];

	return Controller.extend({

		styles: styles,
		back: false,

		render: function () {
			// TODO fix hack
			//this.content.previous.push('controller/Main');
			$('#btn-start').click(this._onStart.bind(this));
		},

		_onStart: function () {

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
			$('#content').append(container);

			for (var i = 0; i < numItems; i++) {
				var btn = $('<button class="btn btn-default btn-fab btn-raised btn-material-red abs-center">' + texts[i] + '</button>');

				var angle = 2 * Math.PI * (i / numItems);
				var distance = 200;
				var cls = 'btn-material-' + colorClasses[Math.round(i * colorClasses.length / numItems)];
				btn.addClass(cls).click(this._onClick.bind(this, container));
				Animate.scaleOut(btn, {
					css: {
						width: 100,
						height: 100,
						fontSize: 12,
						textAlign: 'center'
					},
					delay: i * 50,
					animate: {transform: 'translate(' + distance * Math.cos(angle) + 'px, ' + distance * -Math.sin(angle) + 'px) scale(1)'}
				});

				container.append(btn);

				var startButton = $('#btn-start');
				startButton.addClass('disabled');
				Animate.scaleOut(startButton, {
					css: {opacity: 0},
					duration: 600,
					easing: 'easeInBack'
				});
			}

			var info = $('<button class="btn btn-default disabled abs-center">Pick a<br>Case</button>');
			Animate.scale(info, {
				css: {width: 150, height: 100, fontSize: 20},
				delay: 500,
				duration: 1000
			});
			container.append(info);

		},

		_onClick: function (container, event) {
			$(event.target).addClass('disabled');
			Animate.scaleOut(container, {
				duration: 500,
				easing: 'easeInBack',
				complete: function () {
					this.load('case/overview');
				}.bind(this)
			});
		}

	});

});
