define(function (require) {
    'use strict';

    var Component = require('core/Component');
    var template = require('text!component/activity/caseinformation/CaseInformation.hbs');

    var CaseInfoCollection = require('collection/CaseInfos');
    var CaseInfoModel = require('model/CaseInfo');

    var Card = require('component/activity/caseinformation/card/Card');

    return Component.extend({

        template: template,
        classes: ['caseinfos'],
        styles: 'component/activity/caseinformation/CaseInformation.css',

        collection: {
            caseinfocollection: new CaseInfoCollection()
        },

        initialize: function () {

            Component.prototype.initialize.apply(this, arguments);

            this.width = 300;
            this.height = 90;

            var caseinfos = this.collection.caseinfocollection;

            // Listen to the sync events on both collections, which waits for the models to be loaded.
            this.listenTo(caseinfos, 'sync', this.onCaseInfoSync);

            caseinfos.fetch();
        },

        /**
         * An event triggered when the evidence collection has synced upon a fetch call.
         *
         * @param evidence The evidecne collection.
         */
        onCaseInfoSync: function (caseinfo) {
            var n = caseinfo.size();
            var distance = 10;

            caseinfo.cards.forEach(function (model, i) {
                var card = this.addCaseCard(new CaseInfoModel({
                    width: this.width,
                    height: this.height,
                    title: model.get(''),
                    body: model.get('content'),
                    color: 'info'
                }));
                var scale = i - ((n - 1) / 2);
                card.position.set(300, scale * (distance + card.model.get('height')));
            }, this);
        },

        addCaseCard: function (model) {
            var issue = this.add(new Issue({
                model: model
            }));
            this.bindDraggableEvents(issue);
            return issue;
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
        }

    });


});