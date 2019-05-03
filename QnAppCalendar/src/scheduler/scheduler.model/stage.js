(function () {
    'use strict';

    var app = angular.module('scheduler.module');
    app.factory('Stage', function () {
        function Stage(id, name, stageType, statuses) {
            this.id = id;
            this.name = name;
            this.stageType = stageType;
            this.statuses = [];
            if (statuses) {
                this.statuses = statuses;
            }
            this.schedulerEvents = [];
        }
        return Stage;
    });
})();

