define(function (require) {
    'use strict';

    var Component = require('core/Component');
    var template = require('text!component/activity/caseinformation/CaseInformation.hbs');

    var CaseInfoCollection = require('collection/CaseInfos');
    var CaseInfoCardsCollection = require('collection/CaseInfoCards');
    var CaseInfoCardModel = require('model/CaseInfoCard');
    var SelectableText = require('model/SelectableText');

    var Card = /*require('component/activity/issues/card/issue/Issue'); */ require('component/activity/caseinformation/card/CaseInfoCard');

    return Component.extend({

        template: template,
        classes: ['caseinfos'],
        styles: 'component/activity/caseinformation/CaseInformation.css',

        collection: {
            caseinfos: new CaseInfoCollection(),
            caseinfocards : new CaseInfoCardsCollection()
        },

        initialize: function () {

            Component.prototype.initialize.apply(this, arguments);

            this.width = 300;
            this.height = 200;

            var caseinfos  = this.collection.caseinfos;
            // Listen to the sync events on caseinfo, which waits for the models to be loaded.
            this.listenTo(caseinfos, 'sync', this.onCaseInfoSync);

            caseinfos.fetch();
        },

        /**
         * An event triggered when the evidence collection has synced upon a fetch call.
         *
         * @param evidence The caseinfo collection.
         */
        onCaseInfoSync: function (caseinfo) {
            var caseCards = caseinfo.first().get('cards');
            var n = caseCards.size();
            var distance = 100;
            caseCards.forEach(function (model, i) {
                var card = this.addCaseCard(new CaseInfoCardModel({
                    width: this.width,
                    /*height: this.height,*/
                    /* TODO refactor again */
                    title: model.get('title'),
                    onion: model.get('id'), /* onion = id, don't ask hard questions*/
                    'show-threshold': model.get('show-threshold'),
                    mwidth:(this.width-24),
                    image: model.get('image'),
                    video: model.get('video'),
                    audio: model.get('audio'),
                    source: model.get('source'),
                    type: model.get('type'),
                    items: model.get('items'),
                    color: 'info'
                }));
                var scale = i - ((n - 1) / 2);
                card.position.set(300, scale * (distance));
            }, this);
        },

        addCaseCard: function (model) {
            var card = this.add(new Card({
                model: model
            }));
            this.bindDraggableEvents(card);
            return card;
        },

         /**
         * Binds the draggable events to the component.
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
        },

        /**
         * An event triggered when a card is being dropped.
         * @param event
         */
        onDrop: function (event) {
        }
    });


});