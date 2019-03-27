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
        let stages = [];
        let statuses = [];
        let stage = new Stage(1, 'init');
        stages.push(stage);
        let stage2 = new Stage(2, 'complete');
        stages.push(stage2);

        statuses.push(new Status(1, 'In Quees', 1));
        statuses.push(new Status(2, 'Walk', 1));
        $scope.stages = stages;
        $scope.statuses = statuses;
    }
}
)();