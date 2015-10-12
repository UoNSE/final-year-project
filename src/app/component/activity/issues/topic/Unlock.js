define(function (require) {

    'use strict';

    var Component = require('core/Component');

    var TWEEN = require('tweenjs');
    var Vector2 = require('math/Vector2');

    var Hint = require('component/hint/Hint');
    var Topic = require('component/activity/issues/topic/Topic');
    var Issue = require('component/activity/issues/topic/issue/Issue');
    var Score = require('component/activity/issues/score/Score');
    var ActionButton = require('component/actionbutton/ActionButton');
    var Help = require('component/help/help');

    var IssueModel = require('model/Issue');
    var HelpModel = require('model/Help');
    var IssuesCollection = require('collection/Issues');
    var TopicCollection = require('collection/Topics');

    return Component.extend({
        collection: {
            topics: new TopicCollection(),
            issues: new IssuesCollection(),
            loadedIssues: new IssuesCollection()
        },

        gameCredit: 0,
        availableCredit: 0,
        inventory: null,

        initialize: function (inventory, params) {
            this.inventory = inventory;
            this.availableCredit = this.inventory.attributes.saveScore;
            this.gameCredit = this.availableCredit;
            Component.prototype.initialize.apply(this, arguments);

            this.topics = [];
            this.topicSelected = null;

            var topicCollection = this.collection.topics;
            var issueCollection = this.collection.issues;

            // Listen to the sync events on both collections, which waits for the models to be loaded.
            this.listenTo(topicCollection, 'sync', this.onTopicsSync);
            this.listenTo(issueCollection, 'sync', this.onIssuesSync);

            topicCollection.fetch();
            issueCollection.fetch();

            this.topicHint = this.add(new Hint({model: {text: 'Select a topic'}}));
            this.issueHint = this.add(new Hint({model: {text: 'Select an issue to<br/>purchase it'}}));
            this.issueHint.hide();

            this.scoreContainer = this.add(new Score({title:'Credit'}));

            this.updateCredit();

            this.add(new Help({
                model: new HelpModel({
                    body: 'Click topics to explore issues. Click issues to purchases them. Once purchased the cost will be deducted from your credit tally and the issue will appear red.'
                })
            }));
        },

        onLoad: function () {
            this.placeTopics();
        },

        onTopicsSync: function (topics) {
            this.addTopics(topics);
        },

        onIssuesSync: function (issues) {
            issues.forEach(model => {
                var issue = this.addIssue(model);
                issue.hide();
            });
        },

        addTopics: function (topics) {
            topics.forEach(model => {
                this.addTopic(model);
            });
            this.placeTopics();
        },

        addTopic: function (model) {
            var topic = this.add(new Topic({
                topicId: model.get('id'),
                name: model.get('data')
            }));

            this.topics.push(topic);

            topic.on('topicSelected', this.onTopicSelected.bind(this));

            return topic;
        },

        addIssue: function(model) {

            var issue = this.add(new Issue({
                issueid: model.get('id'),
                name: model.get('data'),
                cost: model.get('cost'),
                topicId: model.get('topicId')
            }));
            issue.on('issueSelected', this.onIssueSelected.bind(this));

            //Check if issue exists in the inventory
            let inventoryIssues = this.inventory.get('issues').models[0].attributes;
            inventoryIssues.forEach((inventModel, i) => {
                if ( model.get('data') === inventModel.get('data') || model.get('data') === inventModel.get('body')){
                    issue.purchase();
                }
            });

            this.topics.forEach(topic => {
                if (topic.topicId === issue.topicId){
                    topic.addIssue(issue);
                }
            });

            return issue;
        },

        onTopicSelected: function (topicSelected) {
            this.topicSelected = topicSelected;

            this.topics.forEach(topic => {
                topic.hide();
            });

            this.topicHint.hide();
            this.issueHint.show();
        },

        onIssueSelected: function (issue) {
            if (issue.canPurchase(this.gameCredit)){
                issue.purchase();
                //this.updateCredit();
                this.gameCredit -= issue.model.attributes.cost;
                this.scoreContainer.setScore(this.gameCredit);
                this.collection.loadedIssues = this.inventory.get('issues').models[0].attributes;
                this.collection.loadedIssues.add(issue.model);
                this.inventory.attributes.issues.reset();
                this.inventory.attributes.issues.add(this.collection.loadedIssues);
            }
            else {
                this.scoreContainer.invalidAction();
            }
        },

        placeTopics: function() {
            var n = this.topics.length;
            var radius = 200;

            this.topics.forEach((topic, index) => {
                topic.show();
                topic.position.set(0,0);

                new TWEEN.Tween(topic.position)
                    .to(Vector2.fromPolar(radius, index / n * Math.TAU), 1000)
                    .easing(TWEEN.Easing.Elastic.Out)
                    .start();
            });
        },

        onTopicBack: function (event) {
            this.topicSelected.hideIssues();
            this.topicSelected = null;

            this.topicHint.show();
            this.issueHint.hide();

            this.placeTopics();
        },

        //analyses all evidence stacks and current expenditures and returns the credit available for use
        updateCredit: function () {
            //available credit will be determined by evidence card stacks persisted by the inventory


            this.topics.forEach(topic => {
                topic.issues.forEach(issue => {
                    if (issue.purchased) {
                        this.availableCredit -= issue.getCost();
                    }
                });
            });
            this.scoreContainer.setScore(this.gameCredit);

            this.gameCredit = this.availableCredit;
        }

    });
});