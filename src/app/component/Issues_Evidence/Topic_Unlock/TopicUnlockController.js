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
        elementSize: '150',

        collection: {
            topics: new Topics(),
            issues: new Issues()
        },

        events: {
            'click #topics .Topic' : 'onTopicClick',
            'click #issues .issue' : 'onIssueClick'
        },

        //TODO:Move data such as topic id, cost, etc... out of the DOM(HTML)

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
            this.renderCreditAmount();
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
                        width: 120,
                        height: 120
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

            $('#btn-select-topic').html ("Select an<br/> Issue");

            var topicId = $topic.attr('topicid');

            var issues = $('#issues').find('[topicid=' + topicId + ']');

            var originX = parseInt($topic.css('left'));
            var originY = parseInt($topic.css('top'));

            var angleSpan = Math.PI / 2;
            var baseAngle = this.getAngleBetweenObjects($topic,$("#btn-select-topic")) - angleSpan;
            var distance = 200 + (issues.length * 100 * ( angleSpan / (Math.PI * 2))) / (Math.PI * 2) * 20;

            issues.each( function( index, issue ) {
                var $issue = $(issue);

                var angle = baseAngle + (index / issues.length) * angleSpan;

                var left = originX + Math.cos(angle) * distance;
                var top = originY + Math.sin(angle) * distance;

                $issue.show();
                Animate.scale($issue, {
                    css: {
                        width: 120,
                        height: 120,
                        left: originX,
                        top: originY,
                        fontSize: 12,
                        textAlign: 'center'
                    },
                    animate: {
                        left: left,
                        top: top
                    }
                });
            });
        },

        onTopicClick: function ( event ) {
            var $topic = $(event.currentTarget);
            this.showIssues($topic);
        },

        getAngleBetweenObjects: function ( $obj1, $obj2 ) {
            var pos1 = $obj1.position();
            var pos2 = $obj2.position();

            return (Math.atan2(pos1.left - pos2.left, pos1.top - pos2.top) + Math.PI * 2) % (Math.PI * 2);
        },

        onIssueClick: function( event ) {
            var $issue = $(event.currentTarget);

            if ( this.getCredit() >= $issue.attr("cost") && !$issue.hasClass("purchased") ) {

                $issue.addClass( "purchased" );
                this.renderCreditAmount();
            }
            else if ( !$issue.hasClass("purchased") ){
                $(".score-display").each( function (index, display){
                    var $display = $(display);
                    $display.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
                } );
            }
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