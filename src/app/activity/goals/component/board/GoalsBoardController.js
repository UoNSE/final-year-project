define(function (require) {

    'use strict';

    var $ = require('jquery');

    var Animate = require('behaviour/Animate');
    var ViewController = require('controller/ViewController');
    var GoalView = require('../goal/GoalController');

    var styles = [
        'goals-actions-activity.css'
    ];

    /**
     * This is the controller for the Goals / Action Activity.
     */
    return ViewController.extend({

        collection: 'Goals',

        styles: styles,

        events: {
            'keyup .goal-content-search': 'searchGoals',
            'form:close': 'createFormClose'
        },

        _onAfterRender: function () {
            this.goalsContainer = $('.goals-container');
            this.emptyGoalsPlaceholder = this.$('.empty-goals-placeholder');
            this.emptySearchPlaceholder = $('empty-search-goals-placeholder');
            this.goalsContainer.empty();
        },

        onBeforeRender: function () {

        },

        _onReady: function () {
            this.listenTo(this.collection, 'add', this.render);
        },

        searchGoals: function (event) {
            var searchTerm = $.trim(this.$('.goal-content-search').val());
            if (searchTerm) {
                var filtered = this.collection.search(searchTerm);
                if (filtered.length) {
                    this.goalsContainer.empty();
                    this.emptySearchPlaceholder.empty();
                    _.each(filtered, this.renderOne, this);
                } else {
                    this.goalsContainer.empty();
                    var html = [
                        '<div class="well text-center">',
                        '<h3>There are no Goals matching search</h3>',
                        '</div>'
                    ].join('');
                    this.emptySearchPlaceholder.html(html);
                }
            } else {
                this.render();
            }
        },  

    });

});
