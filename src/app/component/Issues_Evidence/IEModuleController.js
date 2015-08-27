define(function (require) {

    'use strict';

    var $ = require('jquery');

    var ViewController = require('controller/ViewController');

    var template = require('text!component/Issues_Evidence/IEModuleView.html');

    var Animate = require('behaviour/Animate').getInstance();

    var Issues = require('collection/Issues');
    var Evidence = require('collection/Evidence');

    var IssueViewController = require('component/Issues_Evidence/issue/IssueController');
    var EvidenceViewController = require('component/Issues_Evidence/evidence/EvidenceController');

    var MultiTouchManager = require('behaviour/MultiTouchManager').getInstance();
    var DraggableBehaviour = require('behaviour/DraggableBehaviour');

    return ViewController.extend({

        template: template,
        styles: 'issues-evidence.css',
        menu: null,
        deleteCard: null,
        splitCard: null,

        events: {
            'mouseover #btn-delete': 'onDeleteMouseOver',
            'mouseover #btn-split': 'onSplitMouseOver',
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

            //else if (this.touchOverElement(splitButton, event) ){
            //
            //    if ( !target.hasClass("merged") ){
            //        return;
            //    }
            //
            //    var children = target.children(".panel-body");
            //
            //    //check for blank lines
            //    var resultstring = "";
            //    for (var n=0;n<children.text().split("\n").length;n++){
            //        if(!children.text().split("\n")[n].trim()==" "){
            //            resultstring += children.text().split("\n")[n].trim()+"\n"
            //        }
            //    }
            //
            //    //create the respective issue & evidence
            //    $("#issues").append( createCard( "Issue", resultstring.split("\n")[0] ) );
            //    //create evidence cards
            //    var n = 1;
            //    while (resultstring.split("\n")[n]!= ""){
            //        $("#evidences").append(createCard("Evidence", resultstring.split("\n")[n]));
            //        n++;
            //    }
            //
            //    //delete the pair
            //    $card.remove();
            //
            //    //add RTS
            //    var list = $("#issues").children();
            //    for(var i=0; i<list.length;i++){
            //        var card = list[i];
            //        multiTouchManager.addElementRTS(card);
            //    }
            //
            //    //add RTS
            //    var list = $("#evidence").children();
            //    for(var i=0; i<list.length;i++){
            //        var card = list[i];
            //        multiTouchManager.addElementRTS(card);
            //    }
            //}
            //else {
            //    //check for card merging
            //
            //    var list;
            //    if (target.hasClass("issue")) {
            //        list = $('#evidence').children();
            //    }
            //    else {
            //        //check all issue cards
            //        list = $('#issues').children();
            //    }
            //    for (var i = 0; i < list.length; i++) {
            //        //div
            //        var card = $(list[i]);
            //       // if (!card.hasClass("merged")) {
            //
            //            if ( touchOverElement(card,event) ){
            //
            //
            //                var issue;
            //                var evidence;
            //
            //                //update card text
            //                if (target.hasClass("issue")) {
            //                    issue = target;
            //                    evidence = card;
            //                }
            //                else {
            //                    issue = card;
            //                    evidence = target;
            //                }
            //
            //                evidence.children().each( function() {
            //                    issue.append( this );
            //                });
            //
            //                issue.removeClass("panel-info");
            //                issue.addClass("panel-success");
            //                //add "merged" class to div
            //                issue.addClass("merged");
            //
            //                //This is dirty, I know
            //                issue.height( (issue.text().split("\n").length) * 22 - 75);
            //
            //                //remove old card
            //                evidence.remove();
            //
            //                break;
            //            }
            //        //}
            //    }
            //}

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
        },

        /**
         * An event triggered when a card is being dropped.
         *
         * @param event
         */
        onDrop: function (event) {
            var multiTouchElement = event.currentTarget;
            var $card = multiTouchElement.element;
            // Check if we are currently hovering on the delete button.
            if (this.deleteCard) {
                $card.remove();
            }
            // Check if we are currently hovering on the split button.
            if (this.splitCard) {
                // TODO
            }
            this.menu.toggleClass('hidden', true);
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

        createCard: function (cardType, content) {
			var panelType =  ( cardType === "Issue" ) ? "info" : "danger";
			return "<div class='panel panel-" + panelType + " abs-center "+cardType.toLowerCase()+" card' style='width: 300px; height: 100px'>"+"\n"+"<div class='panel-heading'>"+"\n"+"<h3 class='panel-title'>" + cardType + "</h3>"+"\n"+"</div>"+"\n"+"<div class='panel-body'>" +"\n"+ content +"\n"+ "</div>"+"\n"+"</div>";
		}

    });


});