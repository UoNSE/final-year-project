define(function (require) {

	'use strict';

	var $ = require('jquery');

	var ViewController = require('controller/ViewController');
	var Animate = require('behaviour/Animate').getInstance();

	var Cases = require('collection/Cases');
	var CaseController = require('component/cases/case/CaseController');

	return ViewController.extend({

		collection: new Cases(),

		events: {
			'click #cases .case': 'onCaseClick'
		},

		initialize: function () {
			ViewController.prototype.initialize.apply(this, arguments);
			this.collection.fetch();
		},

		onBeforeRender: function () {
			var selector = '#cases';
			this.collection.each(function (model) {
				this.addNestedView(selector, new CaseController({
					model: model
				}));
			}.bind(this));
		},

		onAfterRender: function () {
			var colorClasses = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan',
				'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange'];

			var cases = this.$el.find('#cases').children();
			for (var i = 0, len = cases.length; i < len; i++) {
				var button = $(cases[i]).find('button');
				var angle = 2 * Math.PI * (i / len);
				var distance = 200;
				var cls = 'btn-material-' + colorClasses[Math.round(i * colorClasses.length / len)];
				button.addClass(cls);
				Animate.scaleIn(button, {
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

			Animate.scale($('#btn-select-case'), {
				css: {width: 150, height: 100, fontSize: 20},
				delay: 500,
				duration: 1000
			});
		},

		onReady: function () {
			this.listenTo(this.collection, 'add', this.render);
		},

		onCaseClick: function (event) {
			$(event.target).addClass('disabled');
			Animate.scaleOut(this.$el.find('#cases-container'), {
				duration: 500,
				easing: 'easeInBack'
			});
		}

	});

});
