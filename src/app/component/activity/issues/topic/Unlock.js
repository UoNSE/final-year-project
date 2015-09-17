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

    var ActionButtonModel = require('model/ActionButton');

    var IssuesCollection = require('collection/Issues');
    var TopicCollection = require('collection/Topics');

    return Component.extend({
        collection: {
            topics: new TopicCollection(),
            issues: new IssuesCollection()
        },

        gameCredit: 0,

        initialize: function (params) {
            Component.prototype.initialize.apply(this, arguments);

            this.topics = [];
            this.topicSelected = null;

            var topicCollection = this.collection.topics;
            var issueCollection = this.collection.issues;

            // Listen to the sync events on both collections, which waits for the models to be loaded.
            this.listenTo(topicCollection, 'sync', this.onTopicsSync);
            this.listenTo(issueCollection, 'sync', this.onIssuesSync);

            topicCollection.fetch();

            this.topicHint = this.add(new Hint({model: {text: 'Select a topic'}}));
            this.issueHint = this.add(new Hint({model: {text: 'Select an issue to<br/>purchase it'}}));
            this.issueHint.hide();

            this.scoreContainer = this.add(new Score({title:'Credit'}));

            this.updateCredit();
        },

        onLoad: function() {
            this.placeTopics();
        },

        onTopicsSync: function(topics) {
            topics.forEach(function (model, index) {
                this.addTopic(model);
            }, this);

            this.collection.issues.fetch();
        },

        onIssuesSync: function(issues) {
            issues.forEach(function (model, i) {
                var issue = this.addIssue(model);
                issue.hide();
            }, this);
        },

        addTopic: function(model) {
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
                name: model.get('data'),
                cost: model.get('cost'),
                topicId: model.get('topicId')
            }));

            issue.on('issueSelected', this.onIssueSelected.bind(this));

            this.topics.forEach(function(theTopic,index){
                if (theTopic.topicId === issue.topicId){
                    theTopic.addIssue(issue);
                }
            },this);

            return issue;
        },

        onTopicSelected: function ( theTopicSelected ) {
            this.topicSelected = theTopicSelected;

            this.topics.forEach(function(theTopic,index){
                theTopic.hide();
            },this);

            this.topicHint.hide();
            this.issueHint.show();
        },

        onIssueSelected: function( theIssue ) {

            if (theIssue.canPurchase(this.gameCredit)){
                theIssue.purchase();
                this.updateCredit();
            }
            else {
                this.scoreContainer.invalidAction();
            }
        },

        placeTopics: function() {
            var n = this.topics.length;
            var radius = 200;

            this.topics.forEach(function(theTopic,index){
                theTopic.show();
                theTopic.position.set(0,0);

                new TWEEN.Tween(theTopic.position)
                    .to(Vector2.fromPolar(radius, index / n * Math.TAU), 1000)
                    .easing(TWEEN.Easing.Elastic.Out)
                    .start();
            },this);
        },

        onTopicBack: function( event ) {
            this.topicSelected.hideIssues();
            this.topicSelected = null;

            this.topicHint.show();
            this.issueHint.hide();

            this.placeTopics();
        },

        //analyses all evidence stacks and current expenditures and returns the credit available for use
        updateCredit: function() {
            //available credit will be determined by evidence card stacks persisted by the inventory
            var availableCredit = 20;

            this.topics.forEach(function(theTopic,index){
                theTopic.issues.forEach(function(theIssue,index){
                    if ( theIssue.purchased ){
                        availableCredit -= theIssue.getCost();
                    }
                },this);
            },this);

            if (this.gameCredit !== availableCredit){
                this.scoreContainer.setScore(availableCredit);
            }

            this.gameCredit = availableCredit;
        }

    });
});