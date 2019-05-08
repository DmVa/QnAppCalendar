(function () {
    'use strict';

    var app = angular.module('scheduler.module');
    app.factory('Stage', function () {
        function Stage(id, name, stageType, services) {
            this.id = id;
            this.name = name;
            this.stageType = stageType;
            this.isServiceDefault = false;
            this.services = [];
            if (services) {
                this.services = services;
            }
            this.schedulerEvents = [];
        }
        return Stage;
    });
})();

