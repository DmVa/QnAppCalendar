(function () {
    'use strict';

    var app = angular.module('scheduler.module');
    app.factory('Stage', function () {
        function Stage(id, name, statuses) {
            this.id = id;
            this.name = name;
            this.statuses = [];
            if (statuses) {
                this.statuses = statuses;
            }
        }
        return Stage;
    });
})();

