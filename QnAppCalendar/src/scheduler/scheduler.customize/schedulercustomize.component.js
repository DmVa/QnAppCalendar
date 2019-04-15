import './schedulercustomize.component.scss';

(function () {
    'use strict';

    angular
        .module('scheduler.module')
        .component('pqSchedulerCustomize', {
            template: require('./schedulercustomize.component.html'),
            controller: SchedulerCustomizeController,
            bindings: {
                onSaveCustomize: '&'
            }
        });
    
    SchedulerCustomizeController.inject = ['$scope', '$window', '$document', '$timeout','modalService','schedulerDataService', 'Stage', 'Status'];
   

    function SchedulerCustomizeController($scope, $window, $document, $timeout, modalService, schedulerDataService, Stage, Status) {
        let $ctrl = this;
        let $ctrlAddColumn = $('pq-scheduler-edit-column');
        $ctrlAddColumn.hide();

        function getLastIndexOfServiceStage() {
            let index = -1;
            for (let i = 0; i < $ctrl.allStages.length; i++) {
                let stage = $ctrl.allStages[i];
                if (stage.stageType == 3) {
                    index = i;
                }
            }

            return index;
        }

        $ctrl.removeFromArray = function (array, value) {
            var idx = array.indexOf(value);
            if (idx !== -1) {
                array.splice(idx, 1);
            }
            return array;
        };

        $ctrl.onAddStage = function onAddStage(stagename) {
            let index = getLastIndexOfServiceStage() + 1;
            let newStage = new Stage(-1, stagename, true, []);

            $ctrl.allStages.splice(index, 0, newStage);
            
        };

        $ctrl.closeModal = function closeModal(save) {
            if (save) {
                let data = { stages: $ctrl.allStages, available: $ctrl.availablestatuses};
                schedulerDataService.saveCustomizeData(data)
                .then(function (result) {
                    if (result.error) {
                        schedulerDataService.handleWrappedError(result);
                        return;
                    }

                    $ctrl.onSaveCustomize();
                    
                }, function (result) {
                    schedulerDataService.handleError(result);
                    return;
                    });

            };
            
            modalService.Close('scheduler-customize-modal');
        };

        $ctrl.removeStage = function removeStage($event, stageobj) {
            $event.preventDefault();
            $event.stopPropagation();

            if (!stageobj) {
                alert('undefined stage');
                return;
            }


            stageobj.statuses.forEach(function (status) {
                $ctrl.availablestatuses.push(status);
            });

            $ctrl.removeFromArray($ctrl.allStages, stageobj);
        };

        $ctrl.addStage = function addStage($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $ctrlAddColumn.show();
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