define(function (require) {

	var Backbone = require('backbone');
	var ViewControllerLoader = require('controller/loader/ViewController');

	return Backbone.Router.extend({

		_navigation: null,
		_viewControllerLoader: null,

		routes: {
			'': 'menu',

			'cases': 'cases',
			'cases/:id/overview': 'caseOverview',
			'cases/:id/information': 'caseInformation',
			'cases/:id/information/background': 'caseBackground',
			'cases/:id/information/virtualpatient': 'virtualPatient',
			'cases/:id/activity/issues': 'caseIssues',

			'cases/:id/activity/goals': 'goalsActionActivity',
            'cases/:id/activity/goals/create': 'goalsActionActivityCreateGoal',
            'cases/:id/activity/goals/:id/actions': 'goalsActionActivityCreateActions'

        },

		initialize: function (navigation) {
			this._navigation = navigation;
            this._viewControllerLoader = new ViewControllerLoader(this);

			this._viewControllerLoader.on('configureBack', this.onConfigureBack, this);
			this._navigation.back.on('back', this.onBack, this);
		},

		/**
		 * Loads the previous page in the history.
		 */
		onBack: function () {
			Backbone.history.history.back();
		},

		/**
		 * Changes the visibility of the back button depending on the back configuration.
		 *
		 * @param back The back configuration.
		 */
		onConfigureBack: function (back) {
			var backNavigation = this._navigation.back;
			if (backNavigation) {
				var button = $(backNavigation.selector);
				// TODO add transitions
				if (back === false || Backbone.history.getPath() === '') {
					button.hide();
				} else {
					button.show();
				}
			}
		},

		/**
		 * Loads the page given the route.
		 *
		 * @param route The path to the base route.
		 * @param currentCase The current case.
		 * @private
		 */
		_load: function (route, currentCase) {
			currentCase = parseInt(currentCase, 10);
			this._viewControllerLoader.load(route, currentCase);
		},

		menu: function () {
			this._load('component/start/Start');
		},

		start: function () {
			this._load('component/start/Start');
		},

		cases: function () {
			this._load('component/cases/Cases');
		},

		caseOverview: function (caseId) {
			this._load('component/overview/CaseOverview', caseId);
		},

		caseInformation: function (caseId) {
			this._load('component/information/CaseInformation', caseId);
		},

		caseBackground: function (caseId) {
			this._load('component/information/background/Background', caseId);
		},

		caseIssues: function (caseId) {
			this._load('component/Issues_Evidence/IEModule', caseId);
		},

        /**
         * Goals and Actions Activity Board.
         */
		goalsActionActivity: function () {
			this._load('activity/goals/component/board/GoalsBoard');
		},

        goalsActionActivityCreateGoal: function () {
            this._load('activity/goals/component/create/CreateGoal');
        },

        goalsActionActivityCreateActions: function (caseId, goalId) {
	        // TODO goal id
            this._load('activity/goals/component/goal/actions/Actions', caseId);
        },

		virtualPatient: function (caseId) {
			this._load('component/virtualpatient/VirtualPatient', caseId);
		},

		questionsMenu: function (caseId) {
			this._load('component/virtualpatient/QuestionsMenu', caseId);
		},

		testsMenu: function (caseId) {
			this._load('component/virtualpatient/TestsMenu', caseId);
		},

		eventFeed: function (caseId) {
			this._load('component/virtualpatient/EventFeed', caseId);
		}

	});

});
