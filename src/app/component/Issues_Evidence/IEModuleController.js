define(function (require) {

    'use strict';

    var $ = require('jquery');

    var ViewController = require('controller/ViewController');

    var template = require('text!component/Issues_Evidence/IEModuleView.html');

    var Animate = require('behaviour/Animate').getInstance();

    var Issues = require('collection/Issues');
    var Evidence = require('collection/Evidence');

    var IssueViewController = require('component/Issues_Evidence/issue/card/IssueController');
    var EvidenceViewController = require('component/Issues_Evidence/evidence/EvidenceController');

    var MultiTouchManager = require('behaviour/MultiTouchManager').getInstance();
    var DraggableBehaviour = require('behaviour/DraggableBehaviour');

    return ViewController.extend({

        template: template,
        styles: 'issues-evidence.css',
        menu: null,
        deleteCard: null,
        splitCard: null,
        mergeCard: null,
        dragging: null,

        events: {
            'mouseover #btn-delete': 'onDeleteMouseOver',
            'mouseover #btn-split': 'onSplitMouseOver',
            'mouseover .card': 'onCardMouseOver',
            'mouseleave .card': 'onCardMouseLeave',
            'mouseleave #btn-delete': 'onDeleteMouseLeave',
            'mouseleave #btn-split': 'onSplitMouseLeave'
        },

        collection: {
            issues: new Issues(),
            evidence: new Evidence()
        },

        initialize: function () {

            ViewController.prototype.initialize.apply(this, arguments);

            var issues = this.collection.issues;
            var evidence = this.collection.evidence;

            // Listen to the sync events on both collections, which waits for the models to be loaded.
            this.listenTo(issues, 'sync', this.onIssuesSync);
            this.listenTo(evidence, 'sync', this.onEvidenceSync);

            // Fetch both collections and call the sync method when they are both loaded.
            $.when(issues.fetch(), evidence.fetch()).done(this.onSync.bind(this));

            this.deleteCard = false;
            this.splitCard = false;
            this.mergeCard = false;
            this.dragging = false;

            this.buttonColour = 'btn-material-yellow';
            this.buttonHoverColour = 'btn-material-orange';

        },

        /**
         * An event triggered when the issues collection has synced upon a fetch call.
         *
         * @param issues The issues collection.
         */
        onIssuesSync: function (issues) {
            this.addIssues(issues);
            this.listenTo(issues, 'add', this.render);
        },

        /**
         * An event triggered when the evidence collection has synced upon a fetch call.
         *
         * @param evidence The evidecne collection.
         */
        onEvidenceSync: function (evidence) {
            this.addEvidence(evidence);
            this.listenTo(evidence, 'add', this.render);
        },

        /**
         * An event triggered when the issues and evidence collection have been fetched. This method renders the view.
         */
        onSync: function () {
            this.render();
        },

        /**
         * Iterates through the issue collection and adds the cards to the view.
         *
         * @param collection The issues collection.
         */
        addIssues: function (collection) {
            collection.forEach(function (model) {
                this.addCard('#issues', IssueViewController, model);
            }.bind(this));
        },

        /**
         * Iterates through the evidence collection and adds the cards to the view.
         *
         * @param collection The evidence collection.
         */
        addEvidence: function (collection) {
            collection.forEach(function (model) {
                this.addCard('#evidence', EvidenceViewController, model);
            }.bind(this));
        },

        /**
         * Adds a card nested view given the selector, controller and a model it is associated with.
         *
         * @param selector The selector within the view to append the nested view.
         * @param ViewController Either a Issue or Evidence ViewController.
         * @param model The model associated with the card from the collection.
         */
        addCard: function (selector, ViewController, model) {
            this.addNestedView(selector, new ViewController({
                model: model
            }));
        },

        onAfterRender: function () {

            this.menu = $('#menu');

            var issues = this.$el.find('#issues').children();
            var evidence = this.$el.find('#evidence').children();

            issues.each(this.placeCard.bind(this));
            evidence.each(this.placeCard.bind(this));

        },

        placeCard: function (index, card) {
            var viewport = $(window);
            var $card = $(card);
            this.addCardBehaviour($card);
            var left = (viewport.width() * 0.5) - ($card.width() * 0.5);
            var top = (viewport.height() * 0.5) - ($card.height() * 0.5);
            Animate.scale($card, {
                delay: index * 50,
                animate: {
                    left: left,
                    top: top
                }
            });
        },

        onDragEnd: function (event) {
            var $card = $(event.currentTarget);
            var position = $card.offset();



        },

        /**
         * Adds the multi-touch behaviour to the card.
         *
         * @param $card The jQuery card element.
         */
        addCardBehaviour: function ($card) {
            MultiTouchManager.addElementRTS($card);
            var element = MultiTouchManager.addElementDraggable($card);
            this.bindDraggableEvents(element);
        },

        /**
         * Binds the draggable events to the multi-touch element.
         *
         * @param element The multi-touch element.
         */
        bindDraggableEvents: function (element) {
            $(element).on({
                drag: this.onDrag.bind(this),
                drop: this.onDrop.bind(this)
            });
        },

        /**
         * An event triggered when a card is being dragged.
         */
        onDrag: function () {
            this.menu.toggleClass('hidden', false);
            this.dragging = true;
        },

        /**
         * An event triggered when a card is being dropped.
         *
         * @param event
         */
        onDrop: function (event) {
            this.dragging = false;
            var multiTouchElement = event.currentTarget;
            var $card = multiTouchElement.element;
            // Check if we are currently hovering on the delete button.
            if (this.deleteCard) {
                $card.remove();
            }
            // Check if we are currently hovering on the split button.
            if (this.splitCard) {
                // split
                this.cardSplit($card);
            }
            // Check if hovering over another card
            if (this.mergeCard != null) {
                //merge
                this.cardMerge(event, this.mergeCard);
            }
            this.menu.toggleClass('hidden', true);
            console.log(this.getScore($card));
        },

        cardSplit: function($card){
            //dependent on merging function
            
            if(!($card.hasClass("issuestack")||$card.hasClass("evidencestack"))){
                return;
            }
            var childElem = $card.children().children();
            childElem.each(function(i, element){
                //skip panel-body elements
                if(i % 2 == 1){
                    return true;
                }
                var nextRow = childElem.eq(i + 1);
                var newcard = this.createCard($(element).text().trim(), $(nextRow).html().trim());
                if($(element).text().trim()=="Issue"){
                    $("#issues").append(newcard);
                    var list = $("#issues").children();
                    for(var i=0; i<list.length;i++){
                        var card = list[i];
                        if($(card).html()==$(newcard).html())
                            this.placeCard(i,card);
                    }
                }
                else{
                    $("#evidence").append(newcard);
                    var list = $("#evidence").children();
                    for(var i=0; i<list.length;i++){
                        var card = list[i];
                        if($(card).html()==$(newcard).html())
                            this.placeCard(i,card);
                    }
                }
            }.bind(this));
            $card.remove();

        },

        getScore: function(card){
            var list=$(card).find(".score");
            var maxlist = $(card).find(".max-score");
            var count = 0;
            var max = 0;
            var penalty = 0;
            list.each(function(){
                count += parseInt($(this).text(),10);
            })
            maxlist.each(function(){
                if(max==0){
                    max = parseInt($(this).text(),10);
                }
                else if(max != parseInt($(this).text(),10)){
                    penalty += 1;
                    if(max > parseInt($(this).text(),10)){
                        max = parseInt($(this).text(),10);
                    }
                }
            })
            if (penalty != 0){
                console.log("penalty");
                count -= penalty;
            }
            else if (max != count) {

                count -= 2;
            }
            return count;
        },


        cardMerge: function (event, card){
            event = event.currentTarget.element;
            //allow multiple evidence cards but only one issue card per stack
            var parent = card.parent();
            if(!(($(event).hasClass("issuestack") && (card.hasClass("issue"))) || ($(parent).hasClass("issuestack") && ($(event).children().hasClass("issue"))) || (card.hasClass("issue") && $(event).children().hasClass("issue")))) {
                //store parent for deletion
                var newclass = $(card).hasClass("issue")||$(event).children().hasClass("issue") ? "issuestack" : "evidencestack";
                if($(card).hasClass("issue")){
                    $(card).append(event.children().children());
                    parent.addClass(newclass);
                    $(event).remove();
                }
                else {
                    event.children().append(card.children());
                    $(event).addClass(newclass);
                    parent.remove();
                }
            }
        },

        onDeleteMouseOver: function (event) {
            // TODO do in nicer way
            var button = $(event.currentTarget);
            button.removeClass(this.buttonColour).addClass(this.buttonHoverColour).addClass(this.buttonColour);
            this.deleteCard = true;
        },

        onSplitMouseOver: function (event) {
            var button = $(event.currentTarget);
            button.removeClass(this.buttonColour).addClass(this.buttonHoverColour).addClass(this.buttonColour);
            this.splitCard = true;
        },

        onDeleteMouseLeave: function (event) {
            var button = $(event.currentTarget);
            button.removeClass(this.buttonHoverColour);
            this.deleteCard = false;
        },

        onSplitMouseLeave: function (event) {
            var button = $(event.currentTarget);
            button.removeClass(this.buttonHoverColour);
            this.splitCard = false;
        },

        onCardMouseOver: function (event) {
            if(this.dragging && this.mergeCard== null){
                var card = $(event.currentTarget);
                this.mergeCard = card;
            }
        },

        onCardMouseLeave: function (event) {
            if(this.mergeCard != null){
                var card = $(event.currentTarget);
                this.mergeCard = null;
            }
        },

        createCard: function (cardType, content) {
			var panelType =  ( cardType === "Issue" ) ? "info" : "danger";
            var classes = ( cardType === "Issue" ) ? "issue": "";

            "<div style='z-index: 7; position: absolute; transform: translate(0px, 0px) rotate(0rad) skewX(0rad) scale(1, 1); left: 411px; top: 421px;'>" +
            "</div>"

			return "<div >" +
                "\n<div class='panel panel-" + panelType + " card " + classes + "' >"+
                "\n<div class='panel-heading'>"+
                "\n<h3 class='panel-title'>" + cardType + "</h3>"+
                "\n</div>"+
                "\n<div class='panel-body'>" +
                "\n"+ content +
                "\n</div>"+
                "\n</div>"+
                "\n</div>";
		}

    });


});