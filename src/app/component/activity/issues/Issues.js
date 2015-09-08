define(function (require) {
    'use strict';

    var Component = require('core/Component');
    var template = require('text!component/activity/issues/Issues.hbs');

    var IssuesCollection = require('collection/Issues');
    var EvidenceCollection = require('collection/Evidence');
    var IssueModel = require('model/Issue');
    var EvidenceModel = require('model/Evidence');
    var IssueGroupModel = require('model/IssueGroup');

    var Menu = require('component/activity/issues/menu/Menu');
    var Issue = require('component/activity/issues/card/issue/Issue');
    var Evidence = require('component/activity/issues/card/evidence/Evidence');
    var IssueGroup = require('component/activity/issues/card/issuegroup/IssueGroup');

    return Component.extend({

        template: template,
        classes: ['issues'],
        styles: 'component/activity/issues/Issues.css',

        menu: null,

        collection: {
            issues: new IssuesCollection(),
            evidence: new EvidenceCollection()
        },

        initialize: function () {

            Component.prototype.initialize.apply(this, arguments);

			this.width = 300;
			this.height = 90;

            var issues = this.collection.issues;
            var evidence = this.collection.evidence;

            // Listen to the sync events on both collections, which waits for the models to be loaded.
            this.listenTo(issues, 'sync', this.onIssuesSync);
            this.listenTo(evidence, 'sync', this.onEvidenceSync);

            issues.fetch();
            evidence.fetch();

            this.menu = this.add(new Menu());
            this.menu.on({
                delete: this.onDelete.bind(this),
                split: this.onSplit.bind(this)
            });
            this.menu.hide();

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
					body: model.get('content'),
					color: 'danger'
				}));
                var scale = i - ((n - 1) / 2);
                card.position.set(-300, scale * (distance + card.model.get('height')));
            }, this);
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
					body: model.get('content'),
					color: 'info'
				}));
                var scale = i - ((n - 1) / 2);
                card.position.set(300, scale * (distance + card.model.get('height')));
            }, this);
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
                dragendsink: this.onDrop.bind(this)
            });
        },

        /**
         * An event triggered when a card is being dragged.
         */
        onDrag: function () {
            this.menu.show();
        },

        /**
         * An event triggered when a card is being dropped.
         *
         * @param event
         */
        onDrop: function (event) {
            var draggable = event.draggable;
            var droppable = event.droppable;
            this.merge(draggable, droppable);

            this.menu.hide();
        },

        onDelete: function (event) {
            event.draggable.remove();
        },

        onSplit: function (event) {

            var issueGroup = event.draggable;
            var model = issueGroup.model;

            var issue = model.get('issue');
            var evidence = model.get('evidence');

            if (issue) {
                this.addIssue(issue);
            }

            evidence.each(function (model) {
                this.addEvidence(model);
            }, this);

            issueGroup.remove();

        },

        merge: function (draggable, droppable) {

            var draggableType = this.resolveType(draggable);
            var droppableType = this.resolveType(droppable);

            if (droppable instanceof IssueGroup) {

                // TODO
                //droppable.collection.add(draggable.model);
                draggable.remove();

            } else {

                var issue = draggableType.issue || droppableType.issue || null;

                // TODO make nicer?
                var collection = [];
                if (draggableType.evidence) {collection.push(draggableType.evidence);}
                if (droppableType.evidence) {collection.push(droppableType.evidence);}
                var evidence = new Backbone.Collection(collection);

                var issueGroup = this.add(new IssueGroup({
                    model: new IssueGroupModel({
						width: this.width,
                        title: 'Issues and evidence',
                        color: 'success',
                        issue: issue,
                        evidence: evidence
                    })
                }));

                issueGroup.position.copy(droppable.position);
                draggable.remove();
                droppable.remove();

            }

        },

        resolveType: function (view) {

            var type = {};

            if (view instanceof Issue) {
                type['issue'] = view.model;
            }

            if (view instanceof Evidence) {
                type['evidence'] = view.model;
            }

            return type;


        }

    });


});