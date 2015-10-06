define(function (require) {
    'use strict';

    var Component = require('core/Component');
    var template = require('text!component/activity/caseinformation/CaseInformation.hbs');

    var CaseInfoCollection = require('collection/CaseInfos');
    var CaseInfoCardsCollection = require('collection/CaseInfoCards');
    var CaseInfoCardModel = require('model/CaseInfoCard');
    var TimerModel = require('model/Timer');
    var SelectableText = require('model/SelectableText');

    var Timer = require('component/activity/caseinformation/timer/Timer');
    var Card = require('component/activity/caseinformation/card/CaseInfoCard');

    var totalEvidenceCount=0;


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
         * An event triggered when the collection has synced upon a fetch call.
         *
         * @param caseinfo The caseinfo collection.
         */
        onCaseInfoSync: function (caseinfo) {
            // Card positioning vars
            var yloc = this.height + 10;
            var xloc = -800;

            // Add Timer component
            this.addTimer(new TimerModel({
                body : caseinfo.first().get('timer'),
                width:128,
                title : 'Activity Timer',
                'update-period' : 1000
            })).position.set(500,-300);
            var caseCards = caseinfo.first().get('cards');

            // Add Card components
            caseCards.forEach(function (model, i) {
                var card = this.addCaseCard(new CaseInfoCardModel({
                    width: this.width,
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
                card.position.set(xloc, yloc);
                totalEvidenceCount += model.get('items').length;
                yloc = -yloc;
                xloc = (i % 2 == 0 ? xloc
                                   : xloc+this.width+10);
            }, this);


        },

        addTimer: function (model) {
            var timer = this.add(new Timer({
                model:model
            }));
            this.bindDraggableEvents(timer);
            return timer;
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