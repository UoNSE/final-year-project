define(function (require) {

	'use strict';

	var $ = require('jquery');

	var ViewController = require('controller/ViewController');
	var animate = require('behaviour/Animate').getInstance();

	return ViewController.extend({

		collection: 'Cases',

		events: {
			'click #cases .case': 'onCaseClick'
		},

		onAfterRender: function () {
			this._container = $('#cases-container');
			var colorClasses = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan',
				'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange'];

			var cases = this._container.find('#cases').children();
			for (var i = 0, len = cases.length; i < len; i++) {
				var button = $(cases[i]).find('button');
				var angle = 2 * Math.PI * (i / len);
				var distance = 200;
				var cls = 'btn-material-' + colorClasses[Math.round(i * colorClasses.length / len)];
				button.addClass(cls);
				animate.scaleIn(button, {
					css: {
						width: 100,
						height: 100,
						fontSize: 12,
						textAlign: 'center',
						transform: 'scale(0)'
					},
					delay: i * 50,
					animate: {transform: 'translate(' + distance * Math.cos(angle) + 'px, ' + distance * -Math.sin(angle) + 'px) scale(1)'}
				});
			}

			animate.scale($('#btn-select-case'), {
				css: {width: 150, height: 100, fontSize: 20},
				delay: 500,
				duration: 1000
			});
		},

		onReady: function () {
			this.listenTo(this.collection, 'add', this.render);
			this.collection.add({name: 'New'});
		},

		onCaseClick: function (event) {
			$(event.target).addClass('disabled');
			animate.scaleOut(this._container, {
				duration: 500,
				easing: 'easeInBack'
			});
		}

	});

});
