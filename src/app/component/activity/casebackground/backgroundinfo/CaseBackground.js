/*
 * TODO: Update Help tooltip (component/activity/casebackground/backgroundinfo/help/Help.hbs)
 * */
define(function (require) {
    'use strict';

    let Component = require('core/Component');
    let template = require('text!component/activity/casebackground/backgroundinfo/CaseInformation.hbs');
    let InfoCard = require('component/activity/casebackground/card/info/InfoCard');
    let InfoGroupCard = require('component/activity/casebackground/card/infogroup/InfoGroupCard');

    let ActionButton = require('component/actionbutton/ActionButton');

    // help
    let Help = require('component/help/Help');
    let HelpText = require('text!component/activity/casebackground/backgroundinfo/help/Help.hbs');
    let HelpModel = require('model/Help');

    // hint
    let Hint = require('component/hint/Hint');

    // info
    let InfoCollection = require('collection/Info');
    let InfoModel = require('model/Info');
    let InfoGroupModel = require('model/InfoGroup');

    // positioning (from goals)
    let Positioning = require('component/activity/goals/Positioning');

    // rule based matching (from goals)
    let CardMatcher = require('component/activity/goals/match/CardMatcher');
    let Rule = require('component/activity/goals/match/Rule');

    /**
     * Defines the positioning for Matches, so that
     * they align with the inventory.
     */
    let MatchPositioning = {
        /**
         * The x position.
         */
        x: () => {
            return Positioning.widthLimit() * 0.70
        },
        /**
         * The y position.
         */
        y: () => {
            return Positioning.heightLimit() * 0.15;
        }
    };

    return Component.extend({

        height: (function () {
            return Positioning.heightLimit() * 0.05;
        }()),

        width: (function () {
            return Positioning.widthLimit() * 0.40;
        }()),

        template: template,
        collection: {
            info: new InfoCollection(),
            infogroup: new InfoCollection()
        },
        /**
         * The current screen number, corresponds to the 'groupId' property in db.
         */
        round: 0,
        /**
         * Case id of current dataset
         */
        caseID: 0,
        /**
         * The sidebar (original position, can be moved) of collected pieces of relevant information.
         */
        infogroup: null,
        /**
         * A count of the number of relevant pieces of information shown on this screen
         */
        relevantpieces: 0,
        /**
         * Rules based card matching.
         */
        cardMatcher: new CardMatcher(),
        /**
         * array of cards
         */
        infoCards: [],

        initialize: function (caseID, roundID) {
            Component.prototype.initialize.apply(this, arguments);
            this.round = +roundID;
            this.caseID = +caseID;
            this.registerRules();
            this.setupFixedComponents(caseID, roundID);
            this.setupActivityStartState();
        },

        registerRules: function () {

            /**
             * Definition => Type : TypeDefPair
             *
             * @type {Rule}
             */
            let InfoInfoGroupMatchRule = new Rule(function (infoCard, infoGroupCard) {

                let info = infoCard.model;
                let infoGroup = infoGroupCard.model;

                if (info.get('relevant')) {

                    let match = new InfoModel({
                        'infoid': info.get('id'),
                        'content': info.get('content'),
                        'short': info.get('short'),
                        'relevant': info.get('relevant')

                    });

                    infoGroup.get('info').add(match);
                    this.checkComplete();
                    // remove cards components as they will be
                    // replaced by match components
                    infoCard.remove();

                } else infoCard.shake();

            }.bind(this));

            this.cardMatcher.addRule('Info => InfoGroup', InfoInfoGroupMatchRule);
        },

        setupFixedComponents: function (caseID, roundID) {
            let nextRound = +roundID + 1;
            // add help component to the page
            this.help = this.add(new Help({
                model: new HelpModel({body: HelpText})
            }));

            this.help.show();

            // add a link to the next activity screen
            this.hiddenLink = this.add(new ActionButton({
                model: {
                    color: 'light-green',
                    classes: 'help-btn actions-btn',
                    icon: 'content-send',
                    href: 'cases/'.concat(caseID, '/activity/case-information/') + nextRound + '/info'
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

        setupActivityStartState: function () {
            // setup syncing
            let infoCollection = this.collection.info;
            let infoGroupCollection = this.collection.infogroup;

            //set up the info collection pane
            this.infogroup = this.addInfoGroup()
            this.infogroup.position.set(MatchPositioning.x(), 0);
            //attach collection to the sub-collection within the collected info pane
            this.infogroup.model.set('info', infoGroupCollection);


            // Listen to the sync events on both collections, which waits for
            // the models to be loaded.
            this.listenToOnce(infoCollection, 'sync', this.onInfoSync);
            this.listenTo(this.collection.infogroup, 'add', this.onAddInfoGroup);

            // fetch info collection to start activity
            infoCollection.fetch();
        },

        /**
         * An event triggered when the collection has synced upon a fetch call.
         *
         * @param info The information collection.
         */
        onInfoSync: function (info) {
            this.relevantpieces = this.infogroup.model.get('info').length;
            let rows = 4;
            let rowSpacing = 200;
            let colSpacing = this.width / 2 + 20;

            let context = this;
            /*
             filter - all info cards NOT from this group
             filter - all info cards already collected
             then add the rest of the cards to the screen
             * */
            info.filter((info) => this.round === info.get('groupId'))
                .filter((info) => !(this.collection.infogroup.find((rInfo) => rInfo.get('infoid') === info.get('id'))))
                .forEach(function (model, i) {
                    //increment the number of relevant pieces to match to determine completion
                    if (model.get('relevant')) {
                        this.relevantpieces++;
                    }
                    //assign model attributes
                    Object.assign(model.attributes, {
                        width: this.width,
                        id: model.get('id'),
                        title: 'Case Information',
                        body: model.get('content'),
                        short: model.get('short'),
                        color: 'pink'
                    });
                    let card = this.addInfo(model);
                    let x = (i < rows ? -colSpacing : colSpacing );

                    context.infoCards.push(card);

                    card.position.set(x, ((+(i % rows) - 1) * rowSpacing));
                }, this);

            let finalPage = info.filter((info) => (this.round + 1) === info.get('groupId')).length;
            // if there is no info items in the next group, change the hidden link
            // to point back to the top level case information menu
            if (finalPage == 0) {
                this.hiddenLink.model.href = 'cases/' + this.caseID + '/information';
                this.hiddenLink.render();
                this.hiddenHint.model.text = "Congratulations!<br> you've found all the pieces of case information.<br> Touch the GREEN button to continue";
                this.hiddenHint.render();
                //old jQuery link change
                //$('#'+this.hiddenLink.id)[0].firstElementChild.setAttribute('href','cases/'+this.caseID+'/information');
            }

            this.checkComplete();

        },

        onAddInfoGroup: function () {
            // remove body text and re-render component to show new items in info collection
            this.infogroup.model.set('body', '');
            this.infogroup.render();
        },

        addInfoGroup: function () {
            let model = new InfoGroupModel({
                    height: 600,
                    width: 400,
                    title: 'Information',
                    body: 'Drag infomation here to mark it as relevant',
                    color: 'orange'
                }
            );
            return this.createDraggableCard(model, InfoGroupCard);
        },


        addInfo: function (model) {
            return this.createDraggableCard(model, InfoCard);
        },

        createDraggableCard: function (model, CardClass) {
            var card = this.add(new CardClass({
                model: model
            }));
            this.bindDraggableEvents(card);
            return card;
        },

        checkComplete: function () {
            if (this.infogroup.model.get('info').length >= this.relevantpieces) {
                this.infoCards.forEach((card)=>{
                    card.remove();
                });
                this.hiddenLink.show();
                this.hiddenHint.show();
            }
        },

        /**
         * Binds the draggable events to the component.
         * @param component this component.
         */
        bindDraggableEvents: function (component) {
            component.on({
                dragendsink: this.cardMatcher.matchCards.bind(this.cardMatcher)
            });
        }

    });


});