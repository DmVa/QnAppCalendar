import './schedulercustomize.component.scss';

(function () {
    'use strict';

    angular
        .module('scheduler.module')
        .component('pqSchedulerCustomize', {
            templateUrl: '/src/scheduler/scheduler.customize/schedulercustomize.component.html',
            controller: SchedulerCustomizeController
        });
    
    SchedulerCustomizeController.inject = ['$scope', '$window', '$document', '$timeout','modalService','schedulerDataService', 'Stage', 'Status'];
   

    function SchedulerCustomizeController($scope, $window, $document, $timeout, modalService, schedulerDataService, Stage, Status) {
        let $ctrl = this;
        $ctrl.removeFromArray = function (array, value) {
            var idx = array.indexOf(value);
            if (idx !== -1) {
                array.splice(idx, 1);
            }
            return array;
        };

        $ctrl.closeModal = function closeModal(save) {
            modalService.Close('scheduler-customize-modal');
        };
        let allStages = [];
        let availablestatuses = [];
        let allstatuses = [];

        schedulerDataService.getCustomizeData()
            .then(function (result) {
                if (result.error) {
                    schedulerDataService.handleWrappedError(result);
                    return;
                }
                if (result.data) {
                    $ctrl.allStages = result.data.stages;
                    $ctrl.availablestatuses = result.data.available;

                    //$ctrl.allStages.forEach(function (stage) {

                    //    stage.statuses.forEach(function(status) {
                    //        status.stageId = stage.id;
                    //        allstatuses.push(status);
                    //    });
                    //});

                    //$ctrl.availablestatuses.forEach(function (status) {
                    //    status.stageId = -1;
                    //    allstatuses.push(status);
                    //});

                    $scope.stages = $ctrl.allStages;
                    $scope.statuses = $ctrl.availablestatuses;

                    $scope.$apply();
                }
            }, function (result) {
                schedulerDataService.handleError(result);
                return;
            });

        $scope.stages = allStages;
        $scope.statuses = availablestatuses;

        // stateObj - object where drag new status, data - id of status which is drag.
        $scope.handledrop = function (event, stageobj, data) {
            let statusObj;
            let statusId = data;

            $ctrl.allStages.forEach(function (stage) {
                stage.statuses.forEach(function (status) {
                    if (status.id == statusId) {
                        statusObj = status;
                    }
                });
            });

            if (!statusObj) {
                $ctrl.availablestatuses.forEach(function (status) {
                    if (status.id == statusId) {
                        statusObj = status;
                    }
                });
            }

          
            if (!statusObj) {
                return;
            }

            let previousStageId = statusObj.stageId;
            if (previousStageId == -1) {
                $ctrl.removeFromArray($ctrl.availablestatuses, statusObj);
            } else {
                let previousStage = $ctrl.allStages.find(item => item.id == previousStageId);
                if (previousStage) {
                    $ctrl.removeFromArray(previousStage.statuses, statusObj);
                }
            }

            if (stageobj) {
                statusObj.stageId = stageobj.id;
                stageobj.statuses.push(statusObj);
            }else {
                statusObj.stageId = -1;
                $ctrl.availablestatuses.push(statusObj);
            }

            $scope.$apply();
        }
    }
}
)();