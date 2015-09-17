define(function(require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/activity/virtualpatient/evidencefeed/EvidenceFeed.hbs');
	var Evidence = require('component/activity/issues/card/evidence/Evidence');

	return Component.extend({
		template: template,
		classes: 'Evidence-feed',
		styles: 'component/activity/virtualpatient/Evidencefeed/EvidenceFeed.css',

        // perhaps the feed will use a collection of Evidences.
        // Collection: new Responses(); // these Evidences will include responses
        initialize: function () {
			Component.prototype.initialize.apply(this, arguments);
			this.listenTo(this.collection, 'sync', this.onSync);
			// this.addTestEvidenceCard();
			// this.startEvidenceFeed();
			// this.collection.fetch();
		},
        // add test Evidence card after
        addTestEvidenceCard: function(){

			var Evidencecard = this.add(new Evidence());
			var posX = 0;
			var posY = 0;
			Evidencecard.position.set(posX, posY);
			return this.add(Evidencecard);

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

			// increment Evidence cards showed counter
			numEvidenceCardsShowingInFeed++;

			}, feedCardSchedule[i]);

		},

		_startEvidenceFeed: function() {

			var numEvidenceCards = EvidenceCardFeedQueue.length;
			console.log("num of Evidence cards in queue: "+numEvidenceCards);

			// while there are still feed item / Evidence cards unshown,
			// progressively show them as per the hardcoded schedule.
			// will Evidenceually depend on JSON data.
			// TODO: replace hardcoded schedule with JSON.

			// while(EvidenceFeedCardQueue.length > 0){

			// loop through card queue
			for (var i = 0; i < numEvidenceCards; i++) {

				// console.log("#"+EvidenceCardFeedQueue[i]);
				var thisCardId = EvidenceCardFeedQueue[i];
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
