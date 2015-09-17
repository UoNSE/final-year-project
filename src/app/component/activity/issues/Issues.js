define(function (require) {
    'use strict';

    var Component = require('core/Component');
    var template = require('text!component/activity/issues/Issues.hbs');

    var IssuesCollection = require('collection/Issues');
    var EvidenceCollection = require('collection/Evidence');
    var IssueModel = require('model/Issue');
    var EvidenceModel = require('model/Evidence');
    var IssueGroupModel = require('model/IssueGroup');
    var ActionButtonModel = require('model/ActionButton');

    var Menu = require('component/activity/issues/menu/Menu');
    var Issue = require('component/activity/issues/card/issue/Issue');
    var Evidence = require('component/activity/issues/card/evidence/Evidence');
    var IssueGroup = require('component/activity/issues/card/issuegroup/IssueGroup');
    var ActionButton = require('component/actionbutton/ActionButton');
    var Score = require('component/activity/issues/score/Score');


    return Component.extend({
        gameCredit: 0,
        //hack to stop duplicating cards
        mergedYet: false,
        template: template,
        classes: ['issues'],
        styles: 'component/activity/issues/Issues.css',

        menu: null,

        collection: {
            issues: new IssuesCollection(),
            evidence: new EvidenceCollection(),
        },

        initialize: function (params) {

            Component.prototype.initialize.apply(this, arguments);
            this.gameCredit = 0;
			this.width = 300;
			this.height = 90;

            var issues = this.collection.issues;
            var evidence = this.collection.evidence;

            // Listen to the sync events on both collections, which waits for the models to be loaded.
            this.listenTo(issues, 'sync', this.onIssuesSync);
            this.listenTo(evidence, 'sync', this.onEvidenceSync);

            if(this.canLoad()){
                this.loadCards(issues, evidence);
            }
            else{
                this.fetchCards(issues, evidence);
            }


            this.menu = this.add(new Menu());
            this.menu.on({
                delete: this.onDelete.bind(this),
                split: this.onSplit.bind(this)
            });
            this.menu.hide();

            //add the topic unlock button
            this.add(new ActionButton({
                model: new ActionButtonModel({
                    icon: 'action-shopping-cart',
                    color: 'blue',
                    href: 'cases/' + params.case_id + '/activity/issues/unlock',
                    //styles: {
                    //    width:100,
                    //    height:100,
                    //    'font-size':40
                    //}
                })
            })).position.set(-400,-300);//TODO:position in relation to bottom left of 'viewport'

            this.scoreContainer = this.add(new Score());
        },

        /**
         * Check if there are cards in the inventory
         * @returns true if the inventory has cards
         */
        canLoad: function(){
            //TODO check if inventory has cards
            console.log("No loading");
            return false;
        },

        /**
         * Load cards from inventory
         */
        loadCards: function(issues, evidence){
            //TODO load cards from inventory
            console.log("Load cards");
        },

        /**
         * fetch card data from db
         */
        fetchCards: function(issues, evidence){
            console.log("Fetch cards");
            issues.fetch();
            evidence.fetch();
        },

        /**
         * An event triggered when the issues collection has synced upon a fetch call.
         *
         * @param issues The issues collection.
         */
        onIssuesSync: function (issues) {
            var n = issues.size();
            var distance = 10;
            issues.forEach(function (model, i) {
                var card = this.addIssue(new IssueModel({
					width: this.width,
					height: this.height,
					title: 'Issue',
					body: model.get('data'),
                    cost: model.get('cost'),
					color: 'danger'
				}));
                var scale = i - ((n - 1) / 2);
                this.gameCredit -= card.model.attributes.cost;
                card.position.set(-300, scale * (distance + card.model.get('height')));
            }, this);
            this.updateScore();
        },

        /**
         * An event triggered when the evidence collection has synced upon a fetch call.
         *
         * @param evidence The evidecne collection.
         */
        onEvidenceSync: function (evidence) {
            var n = evidence.size();
            var distance = 10;
            evidence.forEach(function (model, i) {
                var card = this.addEvidence(new EvidenceModel({
					width: this.width,
					height: this.height,
					title: 'Evidence',
					body: model.get('data'),
                    score: model.get('score'),
                    maxscore: model.get('maxscore'),
					color: 'info'
				}));
                var scale = i - ((n - 1) / 2);
                this.gameCredit += card.model.attributes.score;
                if(card.model.attributes.score < card.model.attributes.maxscore){
                    this.gameCredit -= 2;
                }
                card.position.set(300, scale * (distance + card.model.get('height')));
            }, this);
            this.updateScore();
        },

        /**
         * Iterates through the issue collection and adds the cards to the view.
         *
         * @param model The issue model.
         * @returns {*}
         */
        addIssue: function (model) {
			var issue = this.add(new Issue({
                model: model
            }));
            this.bindDraggableEvents(issue);
            return issue;
        },

        /**
         * Iterates through the evidence collection and adds the cards to the view.
         *
         * @param model The evidence model.
         * @returns {*}
         */
        addEvidence: function (model) {
			var evidence = this.add(new Evidence({
                model: model
            }));
            this.bindDraggableEvents(evidence);
            return evidence;
        },

        /**
         * Binds the draggable events to the component.
         *
         * @param component The .
         */
        bindDraggableEvents: function (component) {
            component.on({
                drag: this.onDrag.bind(this),
                dragendsource: this.onDragEnd.bind(this),
                dropsink: this.onDrop.bind(this)
            });
        },

        /**
         * An event triggered when a card is being dragged.
         */
        onDrag: function () {
            this.menu.show();
            this.mergedYet = false;
        },

        onDragEnd: function(){
            this.menu.hide();
        },

        /**
         * An event triggered when a card is being dropped.
         *
         * @param event
         */
        onDrop: function (event) {
            if (this.mergedYet){
                return;
            }
            this.mergedYet = true;
            var draggable = event.draggable;
            var droppable = event.droppable;
            this.merge(draggable, droppable);
            this.updateScore();
        },

        updateScore: function(){
            this.scoreContainer.setScore(this.gameCredit);
            //$(".score-display").text("CREDIT: " + this.gameCredit);
        },

        onDelete: function (event) {
            //refund score
            var card = event.draggable;
            if(this.resolveType(card).issue){
                this.gameCredit+= card.model.attributes.cost;
            }
            else if(this.resolveType(card).evidence){

                this.gameCredit -= card.model.attributes.score;
                if (card.model.attributes.score < card.model.attributes.maxscore){
                    this.gameCredit += 2;
                }
            }
            else{
                this.gameCredit -= this.getScore(card)
            }

            card.remove();

            this.updateScore();
        },

        onSplit: function (event) {

            var issueGroup = event.draggable;
            var cardcost = this.getScore(issueGroup);
            this.gameCredit -= cardcost;
            var model = issueGroup.model;

            var issue = model.get('issue');
            var evidence = model.get('evidence');

            if (issue) {
                this.addIssue(issue);
                this.gameCredit -= issue.attributes.cost;
            }

            evidence.each(function (model) {
                this.addEvidence(model);
                this.gameCredit += model.attributes.score;
                if(model.attributes.score < model.attributes.maxscore){
                    this.gameCredit -= 2;
                }
            }, this);

            issueGroup.remove();
            this.updateScore();

        },

        merge: function (draggable, droppable) {

            var draggableType = this.resolveType(draggable);
            var droppableType = this.resolveType(droppable);
            if(droppable instanceof IssueGroup && draggable instanceof IssueGroup){
                //TODO merging two stacks

                //only 1 issue allowed
                if(draggable.model.get('issue') != undefined && droppable.model.get('issue') != undefined){
                    return;
                }
                //load old collections

                var issue = droppable.model.get('issue') || draggable.model.get('issue') || null ;
                var evidence = draggable.model.get('evidence');
                evidence.add(droppable.model.get('evidence').toJSON());

                this.gameCredit -= this.getScore(draggable);
                this.gameCredit -= this.getScore(droppable);

            }
            else if (droppable instanceof IssueGroup || draggable instanceof IssueGroup) {
                var group = droppable instanceof IssueGroup ? droppable : draggable;
                var card = droppable instanceof IssueGroup ? draggable : droppable;
                var cardType = droppable instanceof IssueGroup ? draggableType : droppableType;
                //only 1 issue allowed
                if(card instanceof Issue && group.model.get('issue') != undefined){
                    return;
                }

                //load old collections

                var issue = cardType.issue || group.model.get('issue') || null ;
                var collection = [];
                var ev = group.model.get('evidence');
                if (cardType.evidence) {collection.push(cardType.evidence);}
                var evidence = new Backbone.Collection(collection);
                evidence.add(ev.toJSON());

                var cardcost = cardType.issue ? card.model.attributes.cost : -1* card.model.attributes.score;
                if(!cardType.issue && card.model.attributes.score < card.model.attributes.maxscore){
                    this.gameCredit += 2;
                }
                this.gameCredit += cardcost;
                this.gameCredit -= this.getScore(group);


            } else {
                //only 1 issue allowed
                if(draggable instanceof Issue && droppable instanceof Issue){
                    return;
                }
                var issue = draggableType.issue || droppableType.issue || null;

                // TODO make nicer?
                var collection = [];
                if (draggableType.evidence) {collection.push(draggableType.evidence);}
                if (droppableType.evidence) {collection.push(droppableType.evidence);}
                var evidence = new Backbone.Collection(collection);
                if(issue != null){
                    this.gameCredit += issue.attributes.cost;
                }
                evidence.each(function(ev){
                    this.gameCredit -= ev.attributes.score;
                    if(ev.attributes.score < ev.attributes.maxscore){
                        this.gameCredit += 2;
                    }
                })




            }
            //create new card
            var issueGroup = this.add(new IssueGroup({
                model: new IssueGroupModel({
                    width: this.width,
                    title: 'Issues and evidence',
                    color: 'success',
                    issue: issue,
                    evidence: evidence
                })
            }));
            this.gameCredit += this.getScore(issueGroup);
            this.bindDraggableEvents(issueGroup);
            issueGroup.position.copy(droppable.position);
            //remove old cards
            draggable.remove();
            droppable.remove();

        },

         getScore: function(card){
             var cost = card.model.get('issue') != null ? card.model.get('issue').attributes.cost : 0;
             var evlist = card.model.get('evidence');

             var count = 0;
             var max = 0;
             var penalty = 0;

             evlist.each(function(obj){
                 count += obj.attributes.score;
                 if(max==0){
                     max = obj.attributes.maxscore;
                 }
                 else if(max != obj.attributes.maxscore){
                     penalty += 1;
                     if(max > obj.attributes.maxscore){
                         max = obj.attributes.maxscore;
                     }
                 }
             });

            if (penalty != 0){
                count -= penalty;
            }
            else if (max != count) {

                count -= 2;
            }
            if(cost > 0) {
                count -= cost;
            }

            return count;
        },

        resolveType: function (view) {

            var type = {};

            if (view instanceof Issue) {
                type['issue'] = view.model;
            }

            if (view instanceof Evidence) {
                type['evidence'] = view.model;
            }

            if (view instanceof IssueGroup) {
                type['issuegroup'] = view.model;
            }

            return type;


        }

    });


});