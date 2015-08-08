define(function (require) {

	'use strict';

	var $ = require('jquery');

	var Controller = require('controller/Controller');
	var Animate = require('behaviour/Animate');

	return Controller.extend({

		displayBack: false,
		collection: 'Cases',

		events: {
			'click #btn-start': '_onStart',
			'click #cases .case': '_onCase'
		},

		_onAfterRender: function () {
			this._container = $('#cases-container');
		},

		_onReady: function () {
			this.listenTo(this.collection, 'add', this.render);
			//this.collection.add({name: 'New'});
		},

		_onStart: function (event) {
			var colorClasses = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan',
				'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange'];

			this._container.removeClass('hidden');
			var cases = this._container.find('#cases').children();
			for (var i = 0, len = cases.length; i < len; i++) {
				var button = $(cases[i]).find('button');
				var angle = 2 * Math.PI * (i / len);
				var distance = 200;
				var cls = 'btn-material-' + colorClasses[Math.round(i * colorClasses.length / len)];
				button.addClass(cls);
				Animate.scaleOut(button, {
					css: {
						width: 100,
						height: 100,
						fontSize: 12,
						textAlign: 'center'
					},
					delay: i * 50,
					animate: {transform: 'translate(' + distance * Math.cos(angle) + 'px, ' + distance * -Math.sin(angle) + 'px) scale(1)'}
				});
			}

			var startButton = $(event.target).addClass('disabled');
			Animate.scaleOut(startButton, {
				css: {opacity: 0},
				duration: 600,
				easing: 'easeInBack'
			});

			Animate.scale($('#btn-select-case'), {
				css: {width: 150, height: 100, fontSize: 20},
				delay: 500,
				duration: 1000
			});

		},

		_onCase: function (event) {
			$(event.target).addClass('disabled');
			Animate.scaleOut(this._container, {
				duration: 500,
				easing: 'easeInBack'
			});
		}

	});

});
