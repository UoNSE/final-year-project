define(function (require) {

    'use strict';

    var Component = require('core/Component');
    var template = require('text!component/activity/issues/topic/unlock/Unlock.hbs');

    var TWEEN = require('tweenjs');
    var Vector2 = require('math/Vector2');

    var Hint = require('component/hint/Hint');
    var Topic = require('component/activity/issues/topic/Topic');
    var Issue = require('component/activity/issues/topic/Issue');
    var ActionButton = require('component/actionbutton/ActionButton');

    var ActionButtonModel = require('model/ActionButton');

    var IssuesCollection = require('collection/Issues');
    var TopicCollection = require('collection/Topics');

    var gameCredit = 0;

    return Component.extend({

        template: template,
        styles: 'component/activity/issues/Issues.css',

        collection: {
            topics: new TopicCollection(),
            issues: new IssuesCollection()
        },

        initialize: function () {

            Component.prototype.initialize.apply(this, arguments);
            gameCredit = 0;

            this.topics = [];
            this.topicSelected = null;

            var topicCollection = this.collection.topics;
            var issueCollection = this.collection.issues;

            // Listen to the sync events on both collections, which waits for the models to be loaded.
            this.listenTo(topicCollection, 'sync', this.onTopicsSync);
            this.listenTo(issueCollection, 'sync', this.onIssuesSync);

            topicCollection.fetch();

            this.hint = this.add(new Hint({model: {text: 'Select a topic'}}));

            this.topicBackButton = this.add(new ActionButton({
                model: new ActionButtonModel({
                    text:'Back'
                })
            }));

            this.topicBackButton.on('click', this.onTopicBack.bind(this));

            this.topicBackButton.hide();
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
                topicId: model.get('topicId')
            }));

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

            this.hint.hide();
            this.topicBackButton.show();
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

        //onIssueClick: function( event ) {
        //    var $issue = $(event.currentTarget);
        //
        //    if ( this.getCredit() >= $issue.attr("cost") && !$issue.hasClass("purchased") ) {
        //
        //        $issue.addClass( "purchased" );
        //        this.renderCreditAmount();
        //    }
        //    else if ( !$issue.hasClass("purchased") ){
        //        $(".score-display").each( function (index, display){
        //            var $display = $(display);
        //            $display.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        //        } );
        //    }
        //},

        onTopicBack: function( event ) {
            this.topicSelected.hideIssues();
            this.topicSelected = null;

            this.hint.show();
            this.topicBackButton.hide();

            this.placeTopics();
        },

        renderCreditAmount: function() {
            var credit = this.getCredit();

            $(".score-display").text("Credit: $" + credit);
        },

        //analyses all evidence stacks and current expenditures and returns the credit available for use
        getCredit: function() {
            //available credit will be determined by evidence card stacks persisted by the inventory
            var availableCredit = 20;

            $("#issues").find(".issue").each(function(index,issue){
                var $issue = $(issue);

                if ( $issue.hasClass("purchased") )
                {
                    availableCredit -= $issue.attr("cost");
                }
            });

            return availableCredit;
        }

    });
});