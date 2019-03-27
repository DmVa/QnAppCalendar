(function () {
    'use strict';

    angular
        .module('scheduler.module')
        .component('pqSchedulerCustomize', {
            templateUrl: '/components/scheduler/scheduler.customize/schedulercustomize.component.html',
            controller: SchedulerCustomizeController
        });

    SchedulerCustomizeController.inject = ['$scope', '$window', '$document', '$timeout', 'schedulerDataService' ];

    function SchedulerCustomizeController($scope, $window, $document, $timeout, schedulerDataService) {
        let $ctrl = this;
      
    }
}
)();