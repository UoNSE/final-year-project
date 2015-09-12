define(function(require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/activity/virtualpatient/eventfeed/EventFeed.hbs');
	var EventCard = require('component/activity/virtualpatient/eventfeed/eventcard/eventCard');

	return Component.extend({
		template: template,
		classes: 'event-feed',
		styles: 'component/activity/virtualpatient/eventfeed/EventFeed.css',

        // perhaps the feed will use a collection of events.
        // Collection: new Responses(); // these events will include responses
        initialize: function () {
			Component.prototype.initialize.apply(this, arguments);
			this.listenTo(this.collection, 'sync', this.onSync);
			this.addTestEventCard();
			// this.startEventFeed();
			// this.collection.fetch();
		},
        // add test event card after
        addTestEventCard: function(){

			var eventcard = this.add(new EventCard(100));
			var posX = 0;
			var posY = 0;
			eventcard.position.set(posX, posY);
			return this.add(eventcard);

		},

		_addNewCard: function(i, thisCardId, offsetCardsCallback){

			setTimeout(function(){

			// before adding new card, offset already showing cards.
			if (typeof(offsetCardsCallback) === "function"){

				// copy the list and pass it to the callback.
				var passedCardsDisplayList = cardsDisplayedList.slice();
				offsetCardsCallback(passedCardsDisplayList);
			}

			// show the new card
			$(thisCardId).show();

			// add this card to the cardsDisplayedList.
			cardsDisplayedList.push(thisCardId);

			// here the list is defined
			console.log("cardsDisplayedList: "+cardsDisplayedList);

			// increment event cards showed counter
			numEventCardsShowingInFeed++;

			}, feedCardSchedule[i]);

		},

		_startEventFeed: function() {

			var numEventCards = eventCardFeedQueue.length;
			console.log("num of event cards in queue: "+numEventCards);

			// while there are still feed item / event cards unshown,
			// progressively show them as per the hardcoded schedule.
			// will eventually depend on JSON data.
			// TODO: replace hardcoded schedule with JSON.

			// while(eventFeedCardQueue.length > 0){

			// loop through card queue
			for (var i = 0; i < numEventCards; i++) {

				// console.log("#"+eventCardFeedQueue[i]);
				var thisCardId = eventCardFeedQueue[i];
				console.log(thisCardId);

				// a reference to the callback
				var offsetCardsCallback = this._offsetDisplayedCards;

				this._addNewCard(i, thisCardId, offsetCardsCallback);
				if($(thisCardId).is(":visible")){
					console.log(thisCardId + " is visible");
				}
			} // end card loop
		}, // end feed function,



	});

});
