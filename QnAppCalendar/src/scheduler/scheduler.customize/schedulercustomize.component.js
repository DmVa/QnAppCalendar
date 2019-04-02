import './schedulercustomize.component.scss';

(function () {
    'use strict';

    angular
        .module('scheduler.module')
        .component('pqSchedulerCustomize', {
            templateUrl: '/src/scheduler/scheduler.customize/schedulercustomize.component.html',
            controller: SchedulerCustomizeController
        });
    
    SchedulerCustomizeController.inject = ['$scope', '$window', '$document', '$timeout', 'schedulerDataService', 'Stage', 'Status'];
   

    function SchedulerCustomizeController($scope, $window, $document, $timeout, schedulerDataService, Stage, Status) {
        let $ctrl = this;
        $ctrl.removeFromArray = function (array, value) {
            var idx = array.indexOf(value);
            if (idx !== -1) {
                array.splice(idx, 1);
            }
            return array;
        };

        let allStatuses = [];
        
        allStatuses.push(new Status(1, 'In Quees', false));
        allStatuses.push(new Status(2, 'Walk', false))
        allStatuses.push(new Status(3, 'test3', false))
        allStatuses.push(new Status(4, 'test4', false))
        
        let availablestatuses = allStatuses.filter(function (item) {
            return item.id < 3;
        });

        availablestatuses.forEach(function (status) {
            status.stageId = -1;
        });
        

        let allStages = [];
        allStages.push(new Stage(1, "Expected"));
        allStages.push(new Stage(2, "Waiting"))
        allStages.push(new Stage(3, "In Service"))

        let statusesStage1 = allStatuses.filter(function (item) {
            return item.id > 2;
        });

        statusesStage1.forEach(function (status) {
            status.stageId = 1;
        });

        Array.prototype.push.apply(allStages[0].statuses, statusesStage1);

        $scope.stages = allStages;
        $scope.statuses = availablestatuses;

        // stateObj - object where drag new status, data - id of status which is drag.
        $scope.handledrop = function (event, stageobj, data) {
            let statusId = data;
            let statusObjs = allStatuses.filter(function (item) {
                return item.id == data;
            });

            let statusObj;
            if (statusObjs.length > 0) {
                statusObj = statusObjs[0];
            }

            if (!statusObj) {
                return;
            }

            let previousStageId = statusObj.stageId;
            if (previousStageId == -1) {
                $ctrl.removeFromArray(availablestatuses, statusObj);
            } else {
                let previousStage = allStages.find(item => item.id == previousStageId);
                if (previousStage) {
                    $ctrl.removeFromArray(previousStage.statuses, statusObj);
                }
            }

            if (stageobj) {
                statusObj.stageId = stageobj.id;
                stageobj.statuses.push(statusObj);
            }else {
                statusObj.stageId = -1;
                availablestatuses.push(statusObj);
            }

            $scope.$apply();
        }
    }
}
)();