define(function (require) {
    'use strict';
    /* TODO:
     - flag event for finished activity
     - state save (for completion)
     */
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

    let InfoCollection = require('collection/Info');
    let InfoGroupCollection = require('collection/InfoGroup');
    let InfoModel = require('model/Info');
    let InfoGroupModel = require('model/InfoGroup');

    //var ActionButtonModel = require('model/ActionButton');

    return Component.extend({

        template: template,
        collection:{
            info : new InfoCollection(),
            infogroup : new InfoGroupCollection()
        },
        round:0,
        caseID: 0,
        completion:null,

        initialize: function (caseID,roundID) {
            Component.prototype.initialize.apply(this, arguments);
            this.round = +roundID;
            this.caseID = +caseID;
            this.setupFixedComponents(caseID,roundID);
            this.setupActivityStartState();
        },

        setupFixedComponents: function (caseID,roundID) {
            let nextRound = +roundID +1;
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
                    href: 'cases/'.concat(caseID, '/activity/case-information/').concat(nextRound, '/info')
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

            // Listen to the sync events on both collections, which waits for
            // the models to be loaded.
            this.listenToOnce(infoCollection, 'sync', this.onInfoSync);
            this.listenTo(this.collection.infogroup, 'add', this.addInfoGroup);

            // fetch issues and goals ready for matching to begin
            infoCollection.fetch();
        },

        /**
         * An event triggered when the collection has synced upon a fetch call.
         *
         * @param caseinfo The caseinfo collection.
         */
        onInfoSync: function (info) {
            this.completion = this.completion || info.size();

            info.filter((info) => this.round === info.get('groupId'))
                .forEach(function (model, i){
                    Object.assign(model.attributes,{
                        height : 100,
                        width : 200,
                        body : model.get('content'),
                        color : 'pink'
                    });
                    let card = this.addInfo(model);
                    card.position.set(110*i - 400,100);

            },this);

            let finalPage = info.filter((info) => (this.round+1) === info.get('groupId')).length;
            // if there is no info items in the next group, change the hidden link
            // to point back to the top level information menu
            if (finalPage == 0){
                $('#'+this.hiddenLink.id)[0].firstElementChild.setAttribute('href','cases/'+this.caseID+'/information');
            }

            let collect = this.addInfoGroup();
            collect.position.set(400,200);
        },


        addInfoGroup: function () {
            let model = new InfoGroupModel({
                    height:600,
                    width:400,
                    title:'Information',
                    body:'Drag infomation here to mark it as relevant',
                    color:'orange'
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