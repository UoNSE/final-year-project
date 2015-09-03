define(function (require) {

    'use strict';

    var $ = require('jquery');

    var ViewController = require('controller/ViewController');

    var template = require('text!component/Issues_Evidence/Topic_Unlock/TopicUnlockView.html');

    var Animate = require('behaviour/Animate').getInstance();

    var Topics = require('collection/Topics');

    var TopicViewController = require('component/Issues_Evidence/topic/TopicController');

    var MultiTouchManager = require('behaviour/MultiTouchManager').getInstance();
    var DraggableBehaviour = require('behaviour/DraggableBehaviour');

    return ViewController.extend({

        template: template,
        styles: 'issues-evidence.css',

        collection: {
            topics: new Topics()
        },

        initialize: function () {

            ViewController.prototype.initialize.apply(this, arguments);

            var topics = this.collection.topics;

            this.listenTo(topics, 'sync', this.onTopicsSync);

            $.when(topics.fetch()).done(this.onSync.bind(this));
        },

        onTopicsSync: function(topic) {
            this.addTopic(topic);
            this.listenTo(topic, 'add', this.render);
        },

        onSync: function () {
            this.render();
        },

        addTopic: function(collection) {
            collection.forEach(function(model) {
                this.addCard("#topics",TopicViewController, model);
            }.bind(this));
        },

        addCard: function (selector, ViewController, model) {
            this.addNestedView(selector, new ViewController({
                model: model
            }));
        },


        onAfterRender: function () {

            var topics = this.$el.find('#topics').children();
            topics.each(this.placeCard.bind(this));
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

    });
});