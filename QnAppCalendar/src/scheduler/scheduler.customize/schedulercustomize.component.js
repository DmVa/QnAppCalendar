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
    
    SchedulerCustomizeController.inject = ['$scope', '$window', '$document', '$timeout', 'modalService', 'schedulerDataService', 'Stage', 'alertService'];
   

    function SchedulerCustomizeController($scope, $window, $document, $timeout, modalService, schedulerDataService, Stage, alertService) {
        let $ctrl = this;
        let $ctrlAddColumn = $('pq-scheduler-edit-column');
        let allStages = [];
        let notShownServices = [];
        $scope.stages = allStages;
        $scope.notShownServices = notShownServices;

        $ctrlAddColumn.hide();

        let onInitCustomizeListener = $scope.$on('pq-board-init-customize', function (e) {
            $ctrl.getCustomizeData();
        });
           
       $scope.$on('$destroy', function () {
           onInitCustomizeListener();
       });

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

        function getMinStageIdForNewStage() {
            let result = -1000;
            for (let i = 0; i < $ctrl.allStages.length; i++) {
                let stage = $ctrl.allStages[i];
                if (stage.id < result) {
                    result = stage.id;
                }
            }

            return result;
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
            let newStageId = getMinStageIdForNewStage() - 1;
            let newStage = new Stage(newStageId, stagename, 3, []); //3- service.

            $ctrl.allStages.splice(index, 0, newStage);
            
        };

        $ctrl.closeModal = function closeModal(save) {
            if (save) {
                let data = { stages: $ctrl.allStages, notShownServices: $ctrl.notShownServices};
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
                alertService.Error('undefined stage');
                return;
            }


            stageobj.services.forEach(function (service) {
                $ctrl.notShownServices.push(service);
            });

            $ctrl.removeFromArray($ctrl.allStages, stageobj);
        };

        $ctrl.changeIsServiceDefault = function changeIsServiceDefault($event, stageobj) {
            if (stageobj.isServiceDefault) {
                for (let i = 0; i < $ctrl.allStages.length; i++) {
                    let stage = $ctrl.allStages[i];
                    if (stage != stageobj) {
                        stage.isServiceDefault = false;
                    }
                }
            }
        };

        $ctrl.addStage = function addStage($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $ctrlAddColumn.show();
        };

        $ctrl.getCustomizeData = function getCustomizeData() {
            schedulerDataService.getCustomizeData()
                .then(function (result) {
                    if (result.error) {
                        schedulerDataService.handleWrappedError(result);
                        return;
                    }
                    if (result.data) {
                        $ctrl.allStages = result.data.stages;
                        $ctrl.notShownServices = result.data.notShownServices;

                        $scope.stages = $ctrl.allStages;
                        $scope.notShownServices = $ctrl.notShownServices;

                        $scope.$apply();
                    }
                }, function (result) {
                    schedulerDataService.handleError(result);
                    return;
                });

        };
        // stateObj - object where drag new service, data - id of service which is drag.
        $scope.handledrop = function (event, stageobj, data) {
            let serviceObj;
            let serviceId = data;

            $ctrl.allStages.forEach(function (stage) {
                stage.services.forEach(function (service) {
                    if (service.serviceId == serviceId) {
                        serviceObj = service;
                    }
                });
            });

            if (!serviceObj) {
                $ctrl.notShownServices.forEach(function (service) {
                    if (service.serviceId == serviceId) {
                        serviceObj = service;
                    }
                });
            }

          
            if (!serviceObj) {
                return;
            }

            let previousStageId = serviceObj.calendarStageId;
            if (previousStageId == -1) {
                $ctrl.removeFromArray($ctrl.notShownServices, serviceObj);
            } else {
                let previousStage = $ctrl.allStages.find(item => item.id == previousStageId);
                if (previousStage) {
                    $ctrl.removeFromArray(previousStage.services, serviceObj);
                }
            }

            if (stageobj) {
                serviceObj.calendarStageId = stageobj.id;
                stageobj.services.push(serviceObj);
            }else {
                serviceObj.calendarStageId = -1;
                $ctrl.notShownServices.push(serviceObj);
            }

            $scope.$apply();
        }
    }
}
)();