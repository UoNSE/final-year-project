define(function (require) {
    'use strict';

    let backbone = require('backbone');

    // components
    let Component = require('core/Component');
    let Panel = require('component/panel/Panel');
    let ActionButton = require('component/actionbutton/ActionButton');

    // models
    let EvidenceModel = require('model/Evidence');
    let IssueModel = require('model/Issue');
    let GoalModel = require('model/Goal');
    let ActionModel = require('model/Action');
    let HelpModel = require('model/Help');

    // help
    var Help = require('component/help/Help');
    let HelpText = require('text!component/activity/reflection/HelpContent.hbs');

    // collections
    let EvidenceCollection = require('collection/Evidence');
    let IssuesCollection = require('collection/Issues');
    let GoalsCollection = require('collection/Goals');
    let ActionsCollection = require('collection/Actions');


    return Component.extend({

        collection: {
            evidence: new EvidenceCollection(),
            issues: new IssuesCollection(),
            goals: new GoalsCollection(),
            actions: new ActionsCollection()
        },

        template: template,

        initialize: function (caseID) {

            this.setupFixedComponents();

            this.caseID = caseID;

            this.setupActivityStartState();
        },

        setupFixedComponents: function () {

            // add help component to the page
            this.help = this.add(new Help({
                model: new HelpModel({
                    title: 'Help',
                    width: 300,
                    body: HelpText
                })
            }))
        },

        setupActivityStartState: function () {

            // Listen to the sync events on all collections, which waits for
            // the models to be loaded.
            this.listenToOnce(this.collection.evidence, 'sync', this.onEvidenceSync);
            this.listenToOnce(this.collection.issues, 'sync', this.onIssuesSync);
            this.listenToOnce(this.collection.goals, 'sync', this.onGoalsSync);
            this.listenToOnce(this.collection.actions, 'sync', this.onActionsSync);

            // load data
            this.collection.evidence.fetch();
            this.collection.issues.fetch();
            this.collection.goals.fetch();
            this.collection.actions.fetch();

        },

        onEvidenceSync: function (evidence) {

            let n = evidence.size();
            let separatorDistance = 10; // 10 px

            evidence.forEach(function (model, i) {

                // use the String to determine size
                let cardHeight = this.determineCardHeight(
                    model.get('content').length
                );

                Object.assign(model.attributes, {
                    width: this.width,
                    body: model.get('content')
                });

                // create card
                let panel = this.createPanel(model);

                let scale = i - ((n - 1) / 2);
                let x = () => {
                    return -50;
                };
                panel.position.set(x(), scale * (separatorDistance + cardHeight));

            }, this);
        },

        onIssuesSync: function (issues) {

            let n = issues.size();
            let separatorDistance = 10; // 10 px

            issues.forEach(function (model, i) {

                // use the String to determine size
                let cardHeight = this.determineCardHeight(
                    model.get('content').length
                );

                Object.assign(model.attributes, {
                    width: this.width,
                    body: model.get('content')
                });

                // create card
                let panel = this.createPanel(model);

                let scale = i - ((n - 1) / 2);
                let x = () => {
                    return -50;
                };
                panel.position.set(x(), scale * (separatorDistance + cardHeight));

            }, this);
        },

        onGoalsSync: function (goals) {

            let n = goals.size();
            let separatorDistance = 10; // 10 px

            goals.forEach(function (model, i) {

                // use the String to determine size
                let cardHeight = this.determineCardHeight(
                    model.get('content').length
                );

                Object.assign(model.attributes, {
                    width: this.width,
                    body: model.get('content')
                });

                // create card
                let panel = this.createPanel(model);

                let scale = i - ((n - 1) / 2);
                let x = () => {
                    return -50;
                };
                panel.position.set(x(), scale * (separatorDistance + cardHeight));

            }, this);

        },

        onActionsSync: function (actions) {

            let n = actions.size();
            let separatorDistance = 10; // 10 px

            actions.forEach(function (model, i) {

                // use the String to determine size
                let cardHeight = this.determineCardHeight(
                    model.get('content').length
                );

                Object.assign(model.attributes, {
                    width: this.width,
                    body: model.get('content')
                });

                // create panel
                let panel = this.createPanel(model);

                let scale = i - ((n - 1) / 2);
                let x = () => {
                    return -50;
                };
                panel.position.set(x(), scale * (separatorDistance + cardHeight));

            }, this);
        },

        createPanel: function (model) {
            return new Panel(model);
        },

        determineCardHeight: function (length) {
            // dimensions
            let height = 100;
            let goalHeight = 100;

            const scale = 80;
            if (length > 42) {
                return goalHeight = height * (length / scale);
            }
            return goalHeight;
        }
    });

});