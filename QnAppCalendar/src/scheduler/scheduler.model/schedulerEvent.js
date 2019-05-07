(function () {
    'use strict';

    var app = angular.module('scheduler.module');
    app.factory('SchedulerEvent', function () {
        function SchedulerEvent() {
            this.id = 0;
            this.serviceName = '';
            this.customerName = '';
            this.stageId = 0;
            this.serviceId = 0;
            this.appointmentId = 0;
            this.stageType = -1;
            this.processId = 0;
        }
        return SchedulerEvent;
    });
})();

