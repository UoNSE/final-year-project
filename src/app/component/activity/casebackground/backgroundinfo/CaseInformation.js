define(function (require) {
    'use strict';
    /* TODO:
     - flag event for finished activity
     - state save (for completion)
    */
    var Component = require('core/Component');
    var template = require('text!component/activity/casebackground/backgroundinfo/CaseInformation.hbs');

    var CaseInfoCollection = require('collection/CaseInfos');
    var CaseInfoCardsCollection = require('collection/CaseInfoCards');
    var CaseInfoCardModel = require('model/CaseInfoCard');
    var TimerModel = require('model/Timer');
    var SelectableText = require('model/SelectableText');
    let ActionButton = require('component/actionbutton/ActionButton');
    // help
    let Help = require('component/help/Help');
    let HelpText = require('text!component/activity/casebackground/backgroundinfo/help/Help.hbs');
    let HelpModel = require('model/Help');

    // hint
    let Hint = require('component/hint/Hint');


    var Timer = require('component/activity/casebackground/timer/Timer');
    var Card = require('component/activity/casebackground/card/caseinfo/CaseInfoCard');

    return Component.extend({

        template: template,
        classes: ['caseinfos'],
        styles: 'component/activity/casebackground/card/caseinfo/CaseInfoCard.css',
        caseid: '0',
        /**
         * The help component manages the instructions.
         */
        help: {},
        /**
         * This provides the link to move forward to the Actions activity,
         * after all cards have been matched.
         */
        hiddenLink: {},
        /**
         * This provides a hint to click / touch the activity link.
         */
        hiddenHint: {},
        collection: {
            caseinfos: new CaseInfoCollection(),
            caseinfocards : new CaseInfoCardsCollection()
        },

        textCounter: 0,
        total:0,
        hiddenCards : null,


        initialize: function (caseID) {
            Component.prototype.initialize.apply(this, arguments);
            this.setupFixedComponents(caseID);

            var caseinfos  = this.collection.caseinfos;

            this.width = 300;
            this.height = 200;
            this.hiddenCards = $('.hidden-info');
            // Listen to the sync events on caseinfo, which waits for the models to be loaded.
            this.listenToOnce(caseinfos, 'sync', this.onCaseInfoSync);

            caseinfos.fetch();
        },

        setupFixedComponents: function (caseID) {

            // add help component to the page
            this.help = this.add(new Help({
                model: new HelpModel({body: HelpText})
            }));

            this.help.show();

            // add a link to the Actions activity
            this.hiddenLink = this.add(new ActionButton({
                model: {
                    color: 'light-green',
                    classes: 'help-btn actions-btn',
                    icon: 'content-send',
                    href: 'cases/'.concat(caseID, '/information')
                }
            }));

            this.hiddenLink.position.set(0, 100);

            this.hiddenHint = this.add(new Hint({
                model: {
                    text: "Touch the Green Button to Continue"
                }
            }));

            // hide these components until matching is completed
            this.hiddenLink.hide();
            this.hiddenHint.hide();
        },

        /**
         * An event triggered when the collection has synced upon a fetch call.
         *
         * @param caseinfo The caseinfo collection.
         */
        onCaseInfoSync: function (caseinfo) {
            // Card positioning vars
            var yloc = this.height + 10;
            var xloc = -400;
            var casefirst = caseinfo.first();
            this.total = casefirst.get('total');

            /*
            // Add Timer component
            this.addTimer(new TimerModel({
                body : caseinfo.first().get('timer'),
                width:128,
                title : 'Activity Timer',
                'update-period' : 1000
            })).position.set(500,-300);

            */

            var caseCards = casefirst.get('cards');
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
                    total: casefirst.get('total'),
                    color: 'info'
                }));
                card.position.set(xloc, yloc);
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