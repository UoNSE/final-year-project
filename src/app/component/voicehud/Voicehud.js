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
			this.dummygroupprogressscore = [0,3,2,3,2];
			for(var i = 0; i<5; i++){
				this.groupProgressTimeline = this.addTimeline(i);
				this.add(this.groupProgressTimeline);

				// offset the timelines
				if(i>0){
					var yPosition = this.position.y;
					this.groupProgressTimeline.position.set(0,yPosition-i*70);
				}

				// position each timeline
				var xPosition = this.position.x;
				var yPosition = this.groupProgressTimeline.position.y;
				// this.groupProgressTimeline.position.set(xPosition+100,yPosition+150);


				this.groupProgressTimeline.position.x = xPosition+100;
				this.groupProgressTimeline.position.y = yPosition+150;

				// // scale timeline buttons
				// this.groupProgressTimeline.scale.set(0.5,0.5);
				//
				// // scale distance between buttons
				// for(var i=0; i<this.groupProgressTimeline.children.length; i++){
				// 	var child = this.groupProgressTimeline.children[i];
				// 	var positionX = child.position.x;
				// 	child.position.set(positionX * 0.5, 1);
				// }

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

		// randGroupState: function(){
		// 	// var randomBool = Math.random() >= 0.5;
		// 	// return randomBool;
		// 	return Math.floor(Math.random() * 4) + 1;
		// },
		//
		stageCompleteBool: function(teststage, progress){
			if(progress >= teststage){
				return true;
			}
			else{
				return false;
			}
		},

		addTimeline: function(i){
			var progress = this.dummygroupprogressscore[i];
			var timeline = new Timeline({
				collection: new ActionButtons([
					{text: 'Case Info', disabled: this.stageCompleteBool(4,progress)},
					{text: 'Identify Issues',disabled: this.stageCompleteBool(3,progress)},
					{text: 'Goals Actions', disabled: this.stageCompleteBool(2,progress)},
					{text: 'Reflect', disabled: this.stageCompleteBool(1,progress)}
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
