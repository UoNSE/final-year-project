define(function (require) {

    'use strict';

    var $ = require('jquery');

    var ViewController = require('controller/ViewController');

    var template = require('text!component/Issues_Evidence/Topic_Unlock/TopicUnlockView.html');

    var Animate = require('behaviour/Animate').getInstance();

    var Topics = require('collection/Topics');

    var Issues = require('collection/Issues');

    var TopicViewController = require('component/Issues_Evidence/topic/TopicController');

    var IssueViewController = require('component/Issues_evidence/issue/topic/IssueController');

    return ViewController.extend({

        template: template,
        styles: 'issues-evidence.css',

        collection: {
            topics: new Topics(),
            issues: new Issues()
        },

        events: {
            'click #topics .Topic' : 'onTopicClick'
        },

        initialize: function () {

            ViewController.prototype.initialize.apply(this, arguments);

            var topics = this.collection.topics;

            var issues = this.collection.issues;

            this.listenTo(topics, 'sync', this.onTopicsSync);

            this.listenTo(issues, 'sync', this.onIssuesSync);

            $.when(topics.fetch(),issues.fetch()).done(this.onSync.bind(this));
        },

        onTopicsSync: function(topic) {
            this.addTopic(topic);
            this.listenTo(topic, 'add', this.render);
        },

        onIssuesSync: function(issue) {
            this.addIssue(issue);
        },

        onSync: function () {
            this.render();
        },

        addTopic: function(collection) {
            collection.forEach(function(model) {
                this.addCard("#topics",TopicViewController, model);
            }.bind(this));
        },

        addIssue: function(collection) {
            collection.forEach(function(model) {
                this.addCard("#issues",IssueViewController, model);
            }.bind(this));
        },

        addCard: function (selector, ViewController, model) {
            this.addNestedView(selector, new ViewController({
                model: model
            }));
        },


        onAfterRender: function () {
            var topics = this.$el.find('#topics').children();
            this.placeTopics(topics);

            //hide all issues for now
            this.hideAllIssues();

            Animate.scale($('#btn-select-topic'), {
                css: {width: 150, height: 100, fontSize: 20},
                delay: 500,
                duration: 1000
            });
        },

        placeTopics: function ( $topics ) {
            var distance = 300;

            $topics.each( function ( index, topic ) {
                var $topic = $(topic).find('.Topic');

                var angle = index / $topics.length * Math.PI * 2;
                var left =  Math.cos( angle ) * distance;
                var top = Math.sin( angle ) * distance;

                Animate.scale($topic, {
                    css: {
                        fontSize:12,
                        textAlign: 'center',
                        width: 100,
                        height: 100
                    },
                    delay: index * 50,
                    animate: {
                        left: left,
                        top: top
                    }
                });
            });
        },

        hideAllIssues: function() {
            var issues = this.$el.find('#issues').children();
            issues.each( function ( index, issue ){
                $(issue).find(".issue").hide();
            });
        },

        showIssues: function( $topic ) {
            this.hideAllIssues();

            var topicId = $topic.attr('topicid');

            var issues = this.$el.find('#issues').children();

            var originX = parseInt($topic.css('left'));
            var originY = parseInt($topic.css('top'));

            var baseAngle = this.getAngleBetweenObjects($topic,$("#btn-select-topic"));
            var angleSpan = Math.PI / 2;
            var distance = 300;

            issues.each( function( index, issueContainer ) {
                var $issue = $(issueContainer).find('.issue');

                if (topicId === $issue.attr('topicid')){
                    var angle = baseAngle + (index / issues.length - issues.length / 2) * angleSpan;

                    var left = originX + Math.cos(angle) * distance;
                    var top = originY + Math.sin(angle) * distance;

                    $issue.show();
                    Animate.scale($issue, {
                        css: {
                            width: 10,
                            height: 10,
                            left: originX,
                            top: originY,
                            fontSize: 12,
                            textAlign: 'center',
                        },
                        animate: {
                            left: left,
                            top: top,
                            width:100,
                            height:100
                        }
                    });
                }
            });
        },

        onTopicClick: function ( event ) {
            var $topic = $(event.currentTarget);
            this.showIssues($topic);
        },

        getAngleBetweenObjects: function ( $obj1, $obj2 ) {
            var pos1 = $obj1.position();
            var pos2 = $obj2.position();

            return Math.atan2(pos1.left - pos2.left, pos1.top - pos2.top);
        }

    });
});