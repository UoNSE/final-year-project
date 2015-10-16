define(function (require) {
    'use strict';

    // components
    let Component = require('core/Component');
    let DefCard = require('component/activity/casebackground/card/definition/DefinitionCard');
    let TypeCard = require('component/activity/casebackground/card/type/TypeCard');
    let TypeDefMatch = require('component/activity/casebackground/card/typedefinition/TypeDefinitionMatch');
    let ActionButton = require('component/actionbutton/ActionButton');

    // help
    let Help = require('component/help/Help');
    let HelpText = require('text!component/activity/casebackground/matching/help/MatchingHelp.hbs');
    let HelpModel = require('model/Help');

    // hint
    let Hint = require('component/hint/Hint');

    // models
    let TypeDefPair = require('model/TypeDefPair');

    // collections
    let TypesCollection = require('collection/Types');
    let DefinitionsCollection = require('collection/Definitions');
    let MatchCollection = require('collection/TypeDefMatches');

    // positioning
    let Positioning = require('component/activity/goals/Positioning');

    // rule based matching
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

    /**
     * @class CaseBackground
     * @classdesc The view class for Case Background 4 D's Matching Activity.
     */
    return Component.extend({

        height: (function () {
            return Positioning.heightLimit() * 0.05;
        }()),

        width: (function () {
            return Positioning.widthLimit() * 0.40;
        }()),

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
        /**
         * An array of references to the Match components is kept to
         * rearrange these upon new Matches being made.
         */
        matches: [],

        /**
         * The collections managed by this activity.
         */
        collection: {
            types: new TypesCollection(),
            definitions: new DefinitionsCollection(),
            matches: new MatchCollection()
        },

        /**
         * Rules based card matching.
         */
        cardMatcher: new CardMatcher(),

        /**
         * Initialise the Activity.
         *
         * @param caseID the id of the selected case, obtained from the URL params.
         */
        initialize: function (caseID) {
            // invoke super(arguments)
            Component.prototype.initialize.apply(this, arguments);

            this.registerRules();

            let matchesCollection = this.collection.matches;

            this.setupFixedComponents(caseID);

            this.setupActivityStartState();

            this.matches = [];

            matchesCollection.map((model) => this.onAddMatch(model));

        },

        /**
         * Register rules for matching with the CardMatcher.
         */
        registerRules: function () {

            /**
             * Definition => Type : TypeDefPair
             *
             * @type {Rule}
             */
            let TypeDefMatchRule = new Rule(function (defCard, typeCard) {

                let type = typeCard.model;
                let definition = defCard.model;

                if (definition.matchesType(type)) {

                    let match = new TypeDefPair({
                        type: type,
                        definition: definition,
                        color: 'light-green',
                        width: this.width
                    });

                    this.collection.matches.add(match);

                    // remove cards components as they will be
                    // replaced by match components
                    defCard.remove();
                    typeCard.remove();
                }

            }.bind(this));

            /**
             * Handles other direction: Type => Definition : TypeDefPair
             *
             * @type {Rule}
             */
            let TypeDefMatchRule2 = new Rule((typeCard, definitionCard) => {
                return TypeDefMatchRule.execute(definitionCard, typeCard);
            });

            this.cardMatcher.addRule('Definition => Type', TypeDefMatchRule);
            this.cardMatcher.addRule('Type => Definition', TypeDefMatchRule2);
        },

        /**
         * This sets up the components that are state-invariant.
         *
         * @param caseID the id of the current case.
         */
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
                    href: 'cases/'.concat(caseID, '/activity/casebackground/info')
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
         * Invoked the first time the activity is loaded
         */
        setupActivityStartState: function () {
            // setup syncing
            let typesCollection = this.collection.types;
            let definitionsCollection = this.collection.definitions;

            // Listen to the sync events on both collections, which waits for
            // the models to be loaded.
            this.listenToOnce(typesCollection, 'sync', this.onTypesSync);
            this.listenToOnce(definitionsCollection, 'sync', this.onDefinitionsSync);
            this.listenTo(this.collection.matches, 'add', this.onAddMatch);

            // fetch types and definitions ready for matching to begin
            typesCollection.fetch();
            definitionsCollection.fetch();
        },

        /**
         * Check if we have matched all types and definitions.
         */
        checkMatches: function () {
            if (this.collection.matches.length === this.collection.definitions.length) {
                // activate actions activity link
                this.hiddenLink.show();
                this.hiddenHint.show();
            }
        },

        /**
         * When an TypeDefPair is added to its collection,
         * this function is called.
         *
         * @param model the TypeDefPair
         */
        onAddMatch: function (model) {

            let definition = model.get('definition');
            let type = model.get('type');

            definition.set('body', definition.get('content'));
            type.set('body', type.get('content'));

            let match = new TypeDefMatch({
                model: model
            });

            // storage
            this.add(match);
            this.matches.push(match);

            // positioning
            match.setInteractive();
            this.matches.forEach((element, index, array) => {
                let scale = index - ((array.length - 1) / 2);
                element.position.set(MatchPositioning.x(), scale * 270);
            });

            // check if we have matched all definitions and types
            this.checkMatches();
        },

        /**
         * An event triggered when the types collection has synced upon a fetch call.
         *
         * @param types The types collection.
         */
        onTypesSync: function (types) {
            let n = types.size();
            let separatorDistance = 10; // 10 px
            let matches = this.collection.matches;

            // first filter any types that we have already matched
            types.filter((type) => {

                let existingMatch =
                    matches.find((match) => match.get('type').id === type.id);
                return !existingMatch;

            }).forEach(function (model, i) {
                // now create Type Cards for any unmatched types

                // use the String to determine size
                let cardHeight = this.determineCardHeight(
                    model.get('content').length
                );

                Object.assign(model.attributes,
                    {
                        width: this.width,
                        title: 'Type',
                        body: model.get('content'),
                        color: 'orange'
                    }
                );

                let card = this.addType(model);
                let scale = i - ((n - 1) / 2);

                let x = () => {
                    return -(this.width) - 100;
                };

                card.position.set(x(), scale * (separatorDistance + cardHeight));

            }, this);
        },

        /**
         * An event triggered when the types collection has synced upon a fetch call.
         *
         * @param definitions The definitions collection.
         */
        onDefinitionsSync: function (definitions) {
            var n = definitions.size();
            let separatorDistance = 10; // 10 px
            let matches = this.collection.matches;
/*
            definitions.map((definition) => {
                // mark all definitions as incomplete
                definition.set('complete', false);
                definition.save();
            });*/

            definitions.filter((definition) => {
                // filter any definitions that we have already matched

                let existingMatch =
                    matches.find((match) => match.get('definition').id === definition.id);
                return !existingMatch;

            }).forEach(function (model, i) {

                // use the String to determine size
                let cardHeight = this.determineCardHeight(
                    model.get('content').length
                );

                Object.assign(model.attributes, {
                    width: this.width,
                    title: 'Definition',
                    body: model.get('content'),
                    color: 'light-blue'
                });

                // create card
                let card = this.addDefinition(model);

                let scale = i - ((n - 1) / 2);
                let x = () => {
                    return this.width - 200;
                };
                card.position.set(x(), scale * (separatorDistance + cardHeight));

            }, this);

        },

        /**
         * Iterates through the type collection and adds the cards to the view.
         *
         * @param model The type model.
         * @returns Card
         */
        addType: function (model) {
            return this.createDraggableCard(model, TypeCard);
        },

        /**
         * @param model the Definition model.
         * @returns Card
         */
        addDefinition: function (model) {
            return this.createDraggableCard(model, DefCard);
        },

        /**
         * Card Creation Factory.
         *
         * @param model
         * @param CardClass
         * @returns {*}
         */
        createDraggableCard: function (model, CardClass) {
            var card = this.add(new CardClass({
                model: model
            }));
            this.bindDraggableEvents(card);
            return card;
        },

        /**
         * Binds the draggable events to the component.
         *
         * @param component The component to setup.
         */
        bindDraggableEvents: function (component) {
            component.on({
                dragendsink: this.cardMatcher.matchCards.bind(this.cardMatcher)
            });
        },

        /**
         * Determines the appropriate card height, based on
         * the length of the content body.
         *
         * @param length the number of characters in the
         * body of the card.
         * @returns {number} the optimal card height.
         */
        determineCardHeight: function (length) {
            // dimensions
            let height = 100;
            let definitionHeight = 100;

            const scale = 80;
            if (length > 42) {
                return definitionHeight = height * (length / scale);
            }
            return definitionHeight;
        }

    });

});