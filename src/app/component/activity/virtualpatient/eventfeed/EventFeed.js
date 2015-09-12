define(function(require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/activity/virtualpatient/eventfeed/EventFeed.hbs');

	return Component.extend({
		template: template,
		classes: 'event-feed',
		styles: 'component/activity/virtualpatient/eventfeed/EventFeed.css',

        // perhaps the feed will use a collection of events.
        // Collection: new Responses(); // these events will include responses
        initialize: function () {
			Component.prototype.initialize.apply(this, arguments);
			this.listenTo(this.collection, 'sync', this.onSync);

			// this.startEventFeed();
			// this.collection.fetch();
		},
        // add test event card after
        addTestEventCard: function(){

			var eventcard = this.add(new EventCard(100));
			// var posX = -400;
			// var posY = 100;
			eventcard.position.set(posX, posY);
			return this.add(eventcard);

		}

        // startEventFeed: function(){
        //
        //
        // }


	});

});
