define(function (require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/voicehud/Voicehud.hbs');
	var Timeline = require('component/timeline/Timeline');
	var Hint = require('component/hint/Hint');
	var ActionButtons = require('collection/ActionButtons');
	var Annyang = require('annyang');
	var Panel = require('component/panel/Panel');

	return Component.extend({
		template: template,
		styles: 'component/voicehud/Voicehud.css',
		classes: 'voicehud',

		initialize: function () {
			Component.prototype.initialize.apply(this, arguments);

			// var hud = new Panel({
			// 	class: 'hud'
			// });
			// this.add(hud);

			var numGroups = 5;
			var timelines = [];
			for(var i = 0; i<5; i++){
				var groupProgressTimeline = this.addTimeline();
				if(i>0){
					var yPosition = groupProgressTimeline.position.y;
					groupProgressTimeline.position.set(1,yPosition-i*70);
				}
				// timelines.push(groupProgressTimeline);
				// timelines.position.set(100,100);
				// this.add(timelines);
				var xPosition = groupProgressTimeline.position.x;
				var yPosition = groupProgressTimeline.position.y;

				groupProgressTimeline.position.set(xPosition,yPosition+150);
				this.add(groupProgressTimeline);

			}

			var hint = this.add(new Hint({
				model: {text: 'Tap an activity below'}
			}));
			hint.position.y = 120;
		},

		addTimeline: function(){
			var timeline = new Timeline({
				collection: new ActionButtons([
					{text: 'Case Information'},
					{text: 'Identify Issues'},
					{text: 'Goals and Actions', disabled: true},
					{text: 'Reflection', disabled: true}
				]),
				class: "timeline"
			});

			// scale timeline buttons
			timeline.scale.set(0.5,0.5);

			// scale distance between buttons
			for(var i=0; i<timeline.children.length; i++){
				var child = timeline.children[i];
				var positionX = child.position.x;
				child.position.set(positionX * 0.5, 1);
			}

			return timeline;
		}

	});

});
