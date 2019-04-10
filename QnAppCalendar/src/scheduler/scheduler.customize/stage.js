(function () {
    'use strict';

    var app = angular.module('scheduler.module');
    app.factory('Stage', function () {
        function Stage(id, name, isServiceType, statuses) {
            this.id = id;
            this.name = name;
            this.isServiceType = isServiceType;
            this.statuses = [];
            if (statuses) {
                this.statuses = statuses;
            }
        }
        return Stage;
    });
})();

