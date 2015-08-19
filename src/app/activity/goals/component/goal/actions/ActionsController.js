define(function (require) {

    'use strict';

    var $ = require('jquery');

    var Animate = require('behaviour/Animate');
    var ViewController = require('controller/ViewController');

    var styles = [
        'goals-actions-activity.css'
    ];

    // TODO hack fix
    var Collection = require('collection/Goals');

    /**
     * This is the controller for the Goals / Action Activity.
     */
    return ViewController.extend({

        collection: 'Actions',
        styles: styles,

        events: {

        },

        onAfterRender: function () {

        },

        onBeforeRender: function () {
            var collection = new Collection();
            // todo HACK HACK
            this.listenTo(collection, 'sync', function (collection) {
                var url = window.location.href.split('/');
                var id = url[url.length - 2];
                this.model = collection.get(id);
                debugger;
                this.render();
            });
            collection.fetch();
            var selector = 'ul#actions';
            this.collection.each(function (model) {
                this.addChildView(selector, 'activity/goals/component/goal/actions/action/Action', {
                    model: model
                });
            }.bind(this));
        },

        onReady: function () {
            this.listenTo(this.collection, 'add', this.render);
        }

    });

});
