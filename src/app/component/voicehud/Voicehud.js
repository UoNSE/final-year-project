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

		initialize: function (rootcomponent) {
			Component.prototype.initialize.apply(this, arguments);

			this.rootcomponent = rootcomponent;

			var numGroups = 5;
			var timelines = [];
			for(var i = 0; i<5; i++){
				this.groupProgressTimeline = this.addTimeline();
				this.add(this.groupProgressTimeline);
				if(i>0){
					var yPosition = this.groupProgressTimeline.position.y;
					this.groupProgressTimeline.position.set(1,yPosition-i*70);
				}
				// timelines.push(groupProgressTimeline);
				// timelines.position.set(100,100);
				// this.add(timelines);
				var xPosition = this.groupProgressTimeline.position.x;
				var yPosition = this.groupProgressTimeline.position.y;

				this.groupProgressTimeline.position.set(xPosition+100,yPosition+150);

				// this.add(groupProgressTimeline);
				var groupNum = i+1;
				var hint = this.add(new Hint({
					model: {text: 'Group '+ groupNum}
				}));
				hint.position.x = -100;
				hint.position.y = yPosition+150;
			}
			this.interactive = true;


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
