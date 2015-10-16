define(function (require) {
    'use strict';

    var Component = require('core/Component');
    var template = require('text!component/activity/issues/Issues.hbs');
    var TWEEN = require('tweenjs');
    var Vector2 = require('math/Vector2');

    var IssuesCollection = require('collection/Issues');
    var EvidenceCollection = require('collection/Evidence');
    var IssueGroupCollection = require('collection/IssueGroups')
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
    var Panel = require('component/panel/Panel');
    var PopupPanel = require('component/panel/PopupPanel');
    var Hint = require('component/hint/Hint');
    var Help = require('component/help/help');
    var HelpModel = require('model/Help');

    return Component.extend({
        //hack to stop duplicating cards
        mergedYet: false,
        template: template,
        classes: 'issues',
        styles: 'component/activity/issues/Issues.css',

        menu: null,
        gameCredit: 0,

        /**
         * This provides the link to move forward to the Actions activity,
         * after all cards have been matched.
         */
        hiddenActionsActivityLink: {},
        /**
         * This provides a hint to click / touch the activity link.
         */
        hiddenActionsHint: {},
        /**
         * Minimum number of points required to unlock an issue
         */
        scoreTrigger: -6,
        /**
         * Provides a popup notification when the user has earnt points greater than or equal to scoreTrigger
         */
        scoreHint: {},
        /**
         * Provides a container for the score to sit in
         */
        scoreContainer: {},

        collection: {
            issues: new IssuesCollection(),
            evidence: new EvidenceCollection(),
            issueGroups: new IssueGroupCollection()
        },

        initialize: function (inventory, params) {

            Component.prototype.initialize.apply(this, arguments);
            this.gameCredit = 0;

            this.inventory = inventory;
            this.params = params;

            this.width = 300;
            this.height = 90;

            var issues = this.collection.issues;
            var evidence = this.collection.evidence;
            var issueGroups = this.collection.issueGroups;

            // Listen to the sync events on both collections, which waits for the models to be loaded.
            this.listenTo(issues, 'sync', this.onIssuesSync);
            this.listenTo(evidence, 'sync', this.onEvidenceSync);
            this.listenTo(issueGroups, 'sync', this.onIssueGroupSync);

            //update listener to sync to inventory
            //this.listenTo(issues, 'update', this.syncCards);
            //this.listenTo(evidence, 'update', this.syncCards);
            //this.listenTo(issueGroups, 'update', this.syncCards);

            this.setupFixedComponents(params['case_id']);
            if (this.canLoad()) {
                this.loadCards();
            }
            else {
                this.fetchCards(issues, evidence);
            }

            this.collection.issues = inventory.get('issues');
            this.collection.evidence = inventory.get('evidence');
            this.collection.issueGroups = inventory.get('issueGroups');

            this.menu = this.add(new Menu());
            this.menu.on({
                delete: this.onDelete.bind(this),
                split: this.onSplit.bind(this)
            });
            this.menu.hide();


        },

        /**
         * Check if there are cards in the inventory
         * @returns {boolean} true if the inventory has cards
         */
        canLoad: function () {
            return this.inventory.get('issues').size() > 0 || this.inventory.get('evidence').size() > 0 || this.inventory.get('issueGroups').size() > 0;
        },

        setupFixedComponents: function( caseID ){
            this.scoreContainer = this.add(new Score());

            this.add(new Help({
                model:new HelpModel({
                    body: 'Join pieces of evidence together to score points.<br>'+
                    'Once you have enough points you can unlock issues in the '+
                    '<button class="mtl-fab btn btn-material-blue btn-fab btn-raised mdi-action-shopping-cart" style="width: 25px;height: 25px;padding: 0px;"> </button> menu<br>'+
                    'Once all issues are linked with the correct evidence you will be able to continue'
                })
            }));

            this.scoreHint = this.add(new PopupPanel({
                model: {
                    body: 'You now have enough credit to purchase issues!',
                    width: 200
                }
            }));
            this.scoreHint.setOriginalPosition(this.scoreContainer.position);

            //add the topic unlock button
            var unlock = this.add(new ActionButton({
                model: new ActionButtonModel({
                    icon: 'action-shopping-cart',
                    color: 'blue',
                    href: 'cases/' + caseID + '/activity/issues/unlock',
                    classes: 'topic-unlock'
                })
            }));
			unlock.origin = 'top left';
            unlock.pageOrigin = 'top left';
			unlock.detached = true;
			unlock.position.y = -140;

            // add a link to the Actions activity
            this.hiddenActionsActivityLink = this.add(new ActionButton({
                model: {
                    color: 'light-green',
                    classes: 'help-btn actions-btn',
                    icon: 'content-send',
                    href: 'cases/'.concat(caseID, '/activity/goals')
                }
            }));

            this.hiddenActionsActivityLink.position.set(0, 100);

            this.hiddenActionsHint = this.add(new Hint({
                model: {
                    text: "Touch the Green Button to Continue"
                }
            }));

            this.hiddenActionsActivityLink.hide();
            this.hiddenActionsHint.hide();
        },

        /**
         * Load cards from inventory
         */
        loadCards: function () {
            //TODO load cards from inventory
            console.log("Load cards");
			let collection = this.collection;
            let issues = this.inventory.get('issues');
            let evidence = this.inventory.get('evidence');
            let issueGroups = this.inventory.get('issueGroups');

            collection.issues = issues;
            collection.evidence = evidence;
            collection.issueGroups = issueGroups;

			this.onIssuesLoad(issues);
			this.onEvidenceLoad(evidence);
			this.onIssueGroupsLoad(issueGroups);

        },


        /**
         * sync issuegroups to inventory
         */
        syncCards: function () {
            //clear existing collection
			let inventory = this.inventory;
			let evidence = inventory.get('evidence');
            let issues = inventory.get('issues');
            let issueGroups = inventory.get('issueGroups');

			evidence.reset();
            issues.reset();
            issueGroups.reset();

            //sync new collection
            evidence.set(this.collection.evidence.models);
            issues.set(this.collection.issues.models);
            issueGroups.set(this.collection.issueGroups.models);

        },

        /**
         * fetch card data from db
         */
        fetchCards: function (issues, evidence) {
            console.log("Fetch cards");
            //issues.fetch();
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
            issues.forEach((model, i) => {
                var card = this.addIssue(new IssueModel({
					width: this.width,
					height: this.height,
					title: 'Issue',
                    issueid: model.get('id'),
					body: model.get('data'),
                    cost: model.get('cost'),
					color: 'danger'
				}));
                var scale = i - ((n - 1) / 2);
                this.gameCredit -= card.model.get('cost');
                card.position.set(-300, scale * (distance + card.model.get('height')));
            });
            this.updateScore();
        },

        onIssuesLoad: function (issues) {
            var n = issues.size();
            var distance = 10;
            issues.forEach((model, i) => {
                //conditional model loading
                //model has data or body based on when it's defined
                let body = model.get('data') ? model.get('data') : model.get('body');
                let cost = model.get('cost');
                let card = this.addIssue(new IssueModel({
					width: this.width,
					height: this.height,
					title: 'Issue',
					issueid: model.get('issueid'),
					body: body,
					cost: cost,
					color: 'danger'
				}));
                var scale = i - ((n - 1) / 2);
                this.gameCredit -= cost;
                card.position.set(-300, scale * (distance + card.model.get('height')));
            });
            this.updateScore();
        },

        onEvidenceLoad: function (evidence) {
            var n = evidence.size();
            var distance = 10;
            evidence.forEach((model, i) => {
                let body = model.get('data') ? model.get('data') : model.get('body');
                let score = model.get('score');
				let card = this.addEvidence(new EvidenceModel({
					width: this.width,
					height: this.height,
					title: 'Evidence',
					body: body,
					score: score,
					maxscore: model.get('maxscore'),
					issueid: model.get('issueId'),
					color: 'info'
				}));
                var scale = i - ((n - 1) / 2);
                this.gameCredit += score;
                if (score < card.model.get('maxscore')) {
                    this.gameCredit -= 2;
                }
                card.position.set(300, scale * (distance + card.model.get('height')));
            });
            this.updateScore();
        },


        onIssueGroupsLoad: function (issueGroups) {
            var n = issueGroups.size();
            var distance = 10;
            issueGroups.forEach((model, i) => {
                let issue = model.get('issue');
                let evidence = model.get('evidence');
                let card = this.add(new IssueGroup({
                    model: new IssueGroupModel({
                        width: this.width,
                        title: 'Issues and evidence',
                        color: 'success',
                        issue: issue,
                        evidence: evidence
                    })
                }));
                var scale = i - ((n - 1) / 2);
                this.gameCredit += this.getScore(card);
                let height = ((issue || []).length + (evidence || []).length) * 100;
                card.position.set(300, scale * (distance + height));
                this.bindDraggableEvents(card);

            });
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
            evidence.forEach((model, i) => {
                var card = this.addEvidence({
					width: this.width,
					height: this.height,
					title: 'Evidence',
					body: model.get('data'),
                    score: model.get('score'),
                    maxscore: model.get('maxscore'),
                    issueid: model.get('issueId'),
					color: 'info'
				});
                var scale = i - ((n - 1) / 2);
                var score = card.model.get('score');
                this.gameCredit += score;
                if(score < card.model.get('maxscore')) {
                    this.gameCredit -= 2;
                }
                card.position.set(300, scale * (distance + card.model.get('height')));
            });
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
                model: new IssueModel(model)
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
                model: new EvidenceModel(model)
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
            if (this.mergedYet) {
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

            if (this.gameCredit >= this.scoreTrigger) {
                var popupPos = this.scoreContainer.position.clone().add(new Vector2(0,50));
                this.scoreHint.popup(popupPos);
            }

            if (this.collection.issues.length == 0 && this.gameCredit==0){
                this.hiddenActionsActivityLink.show();
                this.hiddenActionsHint.show();
            }
            else{
                this.hiddenActionsActivityLink.hide();
                this.hiddenActionsHint.hide();
            }

            this.inventory.attributes.saveScore = this.gameCredit;
        },

        onDelete: function (event) {
            // Refund score.
            let card = event.draggable;
            let model = card.model;
            let type = this.resolveType(card);
            let body = model.get('body');
            if (type.issue) {
                this.gameCredit+= model.get('cost');
                let issues = this.collection.issues;
                issues.remove(issues.where({data : body}));
                issues.remove(issues.where({body : body}));
            }
            else if (type.evidence) {
                let score = model.get('score');
                this.gameCredit -= score;
                if (score < model.get('maxscore')) {
                    this.gameCredit += 2;
                }
                let evidence = this.collection.evidence;
                evidence.remove(evidence.where({data : body}));
                evidence.remove(evidence.where({body : body}));
            }
            else {
                this.gameCredit -= this.getScore(card);
                this.removeIssueGroup(card);
            }

            card.remove();
            this.updateScore();
        },

        onSplit: function (event) {

            let issueGroup = event.draggable;
            let model = issueGroup.model;

            this.gameCredit -= this.getScore(issueGroup);

            let issue = model.get('issue');
            if (issue) {
                this.addIssue(issue);
                this.collection.issues.add(issue);
                this.gameCredit -= issue.get('cost');

            }

            let evidence = model.get('evidence');
            evidence.each(model => {
                var score = model.get('score');
                this.addEvidence(model);
                this.gameCredit += score;
                if (score < model.get('maxscore')) {
                    this.gameCredit -= 2;
                }
                this.collection.evidence.add(model);
            });
            this.removeIssueGroup(issueGroup);
            issueGroup.remove();
            this.updateScore();

        },

        removeIssueGroup: function (issueGroup) {
            //find group in collection.issuegroup
            let issueGroups = this.collection.issueGroups;
            let models = [];
            issueGroups.each(function (model) {
                if (model.get('evidence').where({body: issueGroup.model.get('evidence').models[0].get('body')}).length >0) {
                    models.push(model);
                }
            });
            issueGroups.remove(models);

        },

        merge: function (draggable, droppable) {

            var draggableType = this.resolveType(draggable);
            var droppableType = this.resolveType(droppable);

            if (droppable instanceof IssueGroup && draggable instanceof IssueGroup) {

                //only 1 issue allowed
                if (draggable.model.get('issue') && droppable.model.get('issue')) {
                    draggable.shake();
                    return;
                }
                //load old collections

                var issue = droppable.model.get('issue') || draggable.model.get('issue');
                var evidence = draggable.model.get('evidence');

                if (issue) {
                    var issueID = issue.attributes.issueid;
                    var correctmerge = true;
                    var Ielist = droppable.model.get('evidence');
                    evidence.each(model => {
                        if (issueID != model.get('issueid')) {
                            correctmerge = false
                        }
                    });
                    Ielist.each(function (model) {
                        if (issueID != model.get('issueid')) {
                            correctmerge = false
                        }
                    });
                    if (correctmerge === false) {
                        draggable.shake();
                        return;
                    }
                }

                evidence.add(droppable.model.get('evidence').toJSON());

                this.gameCredit -= this.getScore(draggable);
                this.gameCredit -= this.getScore(droppable);
                this.removeIssueGroup(draggable);
                this.removeIssueGroup(droppable);
            }
            else if (droppable instanceof IssueGroup || draggable instanceof IssueGroup) {
                var group = droppable instanceof IssueGroup ? droppable : draggable;
                var card = droppable instanceof IssueGroup ? draggable : droppable;
                var cardType = droppable instanceof IssueGroup ? draggableType : droppableType;
                //only 1 issue allowed
                if(card instanceof Issue && group.model.get('issue') != undefined){
                    draggable.shake();
                    return;
                }

                //load old collections

                var issue = cardType.issue || group.model.get('issue');
                var collection = [];
                var ev = group.model.get('evidence');
                if (cardType.evidence) {collection.push(cardType.evidence);}
                var evidence = new Backbone.Collection(collection);
                evidence.add(ev.toJSON());


                if (issue) {
                    var issueID = issue.get('issueid');
                    var correctmerge = true;
                    evidence.each(function (model) {
                        if (issueID !== model.get('issueid')) {
                            correctmerge = false;
                        }
                    });
                    if (!correctmerge) {
                        draggable.shake();
                        return;
                    }
                }

                var cardcost = cardType.issue ? card.model.get('cost') : -1* card.model.get('score');
                if (!cardType.issue && card.model.get('score') < card.model.get('maxscore')) {
                    this.gameCredit += 2;
                }
                this.gameCredit += cardcost;
                this.gameCredit -= this.getScore(group);
                this.removeIssueGroup(group);
            } else {
                //only 1 issue allowed
                if (draggable instanceof Issue && droppable instanceof Issue) {
                    draggable.shake();
                    return;
                }

                var issue = draggableType.issue || droppableType.issue;
                var collection = [];
                if (draggableType.evidence) {collection.push(draggableType.evidence);}
                if (droppableType.evidence) {collection.push(droppableType.evidence);}
                var evidence = new Backbone.Collection(collection);

                if (issue) {
                    var issueID = issue.get('issueid');
                    var correctmerge = true;
                    evidence.each(function (model) {
                        if (issueID != model.get('issueid')) {
                            correctmerge = false
                        }
                    });
                    if (!correctmerge) {
                        draggable.shake();
                        return;
                    }
                    this.gameCredit += issue.attributes.cost;
                }
                evidence.each(evidence => {
                    this.gameCredit -= evidence.get('score');
                    if (evidence.get('score') < evidence.get('maxscore')) {
                        this.gameCredit += 2;
                    }
                });
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
            //update collections
            this.collection.issueGroups.add(issueGroup.model);

            //remove old collection occurences
            if(issueGroup.model.get("evidence") != null) {
                issueGroup.model.get("evidence").each(function (groupModel) {
                    var mark;
                    this.collection.evidence.each(function (model) {

                        if (model.get('data') == groupModel.get('body') || model.get('body') == groupModel.get('body')) {
                            mark = model;
                            //return;
                        }
                    }, this);
                    this.collection.evidence.remove(mark);
                }, this)
            }

            if (issueGroup.model.get("issue")) {
                let issues = this.collection.issues;
                let issue = issueGroup.model.get('issue');
                let body = issue.get('body');
                issues.remove(issues.where({data : body}));
                issues.remove(issues.where({body : body}));
            }

            this.gameCredit += this.getScore(issueGroup);
            this.bindDraggableEvents(issueGroup);
            issueGroup.position.copy(droppable.position);
            //remove old cards
            draggable.remove();
            droppable.remove();

        },

         getScore: function(card){
             var cost = card.model.get('issue') != null ? card.model.get('issue').get('cost') : 0;
             var evlist = card.model.get('evidence');

             var count = 0;
             var max = 0;
             var penalty = 0;

             evlist.each(function (obj) {
                 count += obj.get('score');
                 let maxScore = obj.get('maxscore');
                 if (max === 0) {
                     max = maxScore;
                 }
                 else if (max !== maxScore) {
                     penalty += 1;
                     if (max > maxScore) {
                         max = maxScore;
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