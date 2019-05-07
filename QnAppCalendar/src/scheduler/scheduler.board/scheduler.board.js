import './scheduler.board.scss';

(function () {
    'use strict';

    angular
        .module('scheduler.module')
        .component('pqSchedulerBoard', {
            // templateUrl: './scheduler.component.html',
            template: require('./scheduler.board.html'),
            controller: SchedulerController,
        });

    SchedulerController.inject = ['$scope', '$window', '$document', '$timeout', 'schedulerDataService', 'modalService', 'alertService'];

    function SchedulerController($scope, $window, $document, $timeout, schedulerDataService, modalService, alertService) {
        let $ctrl = this;
        $scope.obj = {};

        $scope.currentDateStr = '';
        $scope.stages = [];
        let schedulerEvents = [];

        let customizeData = null;
        let units = null;

        $ctrl.openCustomize = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.$broadcast('pq-board-init-customize');
            modalService.Open('scheduler-customize-modal');
        };

        $ctrl.openModal = function (id) {
            modalService.Open(id);
        };

       

        $ctrl.closeModal = function closeModal(id) {
            modalService.Close(id);
        };

        $ctrl.handleWrappedError = function(result) {
            if (result.error) {
                if (result.error.message) {
                    alertService.Error(result.error.message);
                }
                else {
                    console.log('undefined error');
                }
            }
            else {
                console.log('not wrapped error');
            }
        };
        $ctrl.removeFromArray = function (array, value) {
            var idx = array.indexOf(value);
            if (idx !== -1) {
                array.splice(idx, 1);
            }
            return array;
        };

        $ctrl.handleError = function(result) {
            if (result && result.statusText) {
                console.log(result.statusText);
            }
            else {
                if (result)
                    console.log(result);
                else
                    console.log('error');
            }
        };

        $ctrl.onSaveCustomize = function onSaveCustomize() {
            $ctrl.loadCustomizeData(false);
        };
      

        $ctrl.remapEventsToStages = function () {
            var evs = $ctrl.schedulerEvents;
            if (!evs || evs.length == 0)
                return;

            for (var eventIdx = 0; eventIdx < evs.length; eventIdx++) {
                var ev = evs[eventIdx];
                let stageId = $ctrl.getStageIdForServiceid(ev.serviceId);
                if (stageId == -1)
                    ev.stageId = -1;
                else {
                    if (ev.stageType == 3) { //inservice
                        ev.stageId == stageId;
                    }
                    else {
                        ev.stageId = $ctrl.getStageIdByStageType(ev.stageType);
                    }
                }
            }
        }

        $ctrl.getStageIdForServiceid = function (serviceId) {
            if (!$ctrl.customizeData)
                return -1;
            let result = -1;

            for (var stageIdx = 0; stageIdx < $ctrl.customizeData.stages.length; stageIdx++) {
                var stage = $ctrl.customizeData.stages[stageIdx];
                for (var serviceIdx = 0; serviceIdx < stage.services.length; serviceIdx++) {
                    var service = stage.services[serviceIdx];
                    if (service.id == serviceId) {
                        result = stage.id;
                        break;
                    }
                };

                if (result >= 0) {
                    break;
                }
            }
            return result;
        }

        $ctrl.getStageIdByStageType = function (stageType) {
            let result = -1;
            if (!$ctrl.customizeData)
                return -1;

            for (var stageIdx = 0; stageIdx < $ctrl.customizeData.stages.length; stageIdx++) {
                var stage = $ctrl.customizeData.stages[stageIdx];
                if (stage.stageType == stageType) {
                    result = stage.id;
                    break;
                }
            }

            return result;
        }

        $ctrl.getStageObjectById = function (stageId) {
            let result = null;
            if (!$ctrl.customizeData)
                return null;

            for (var stageIdx = 0; stageIdx < $ctrl.customizeData.stages.length; stageIdx++) {
                var stage = $ctrl.customizeData.stages[stageIdx];
                if (stage.id == stageId) {
                    result = stage;
                    break;
                }
            }

            return result;
        }

        $ctrl.updateStages = function () {
            if (!$ctrl.customizeData) {
                $scope.stages = [];
                $scope.$apply();
                return;
            }


            for (var stIdx = 0; stIdx < $ctrl.customizeData.stages.length; stIdx++) {
                var stage = $ctrl.customizeData.stages[stIdx];
                if (!$ctrl.schedulerEvents) {
                    stage.schedulerEvents = [];
                }
                else {
                    stage.schedulerEvents = $ctrl.schedulerEvents.filter(ev => ev.stageId == stage.id);
                }
            }

            $scope.stages = $ctrl.customizeData.stages;
            $scope.$apply();
        };

        $ctrl.loadCustomizeData = function(loadAppointments) {
            schedulerDataService.getCustomizeData()
                .then(function (result) {
                    if (result.error) {
                        $ctrl.handleWrappedError(result);
                        return;
                    }
                    if (result.data) {
                        $ctrl.customizeData = result.data;
                        if (loadAppointments) {
                            $ctrl.loadTodayAppointments();
                        }
                        else {
                            $ctrl.remapEventsToStages();
                        }

                        $ctrl.updateStages();
                    }
                }, function (result) {
                    $ctrl.handleError(result);
                    return;
                });
        };

        $ctrl.loadTodayAppointments = function () {
            schedulerDataService.loadTodayAppointments()
                .then(function (result) {
                    if (result.error) {
                        $ctrl.handleWrappedError(result);
                        return;
                    }
                    if (result.data) {
                        $scope.currentDateStr = result.data.currentDateStr;
                        $ctrl.schedulerEvents = result.data.schedulerEvents;             
                        $ctrl.updateStages();
                    }
                }, function (result) {
                    $ctrl.handleError(result);
                    return;
                });
            return true;
        };

     
        

      

        $scope.handledrop = function (event, stageobj, data) {

            let scheduledEvent;
            let previousStage;
            let appointmentId = data;

            $ctrl.schedulerEvents.some(function (sev) {
                if (sev.appointmentId == appointmentId) {
                    scheduledEvent = sev;
                    return true;
                }
                return false;
            });

            if (!scheduledEvent) {
                return;
            };

            for (var stIdx = 0; stIdx < $ctrl.customizeData.stages.length; stIdx++) {
                var stage = $ctrl.customizeData.stages[stIdx];
                if (stage.id == scheduledEvent.stageId) {
                    previousStage = stage;
                    break;
                }
            }

            if (!previousStage) {
                return;
            };

            let previousStageId = scheduledEvent.stageId;
            let nextStageId = stageobj.id;
            if (previousStageId == nextStageId) {
                return;
            }

            schedulerDataService.eventChanged({ previousStageId: previousStageId, nextStageId: nextStageId, schedulerEvent: scheduledEvent })
                .then(function (result) {

                    if (result.error) {
                        $ctrl.handleWrappedError(result);
                        return;
                    }
                    if (result.data.appointmentId) {
                        scheduledEvent.appointmentId = result.data.appointmentId;
                        scheduledEvent.serviceId = result.data.serviceId;
                        scheduledEvent.stageId = result.data.stageId;
                        scheduledEvent.serviceName = result.data.serviceName;
                        $ctrl.removeFromArray(previousStage.schedulerEvents, scheduledEvent);
                        let newStageObj = $ctrl.getStageObjectById(scheduledEvent.stageId);
                        if (newStageObj) {
                            newStageObj.schedulerEvents.push(scheduledEvent);
                        }
                        $scope.$apply();
                    }

                    console.log('saved');
                }, function (result) {
                    $ctrl.handleError(result);
                    return;
                });

        }


        $ctrl.loadCustomizeData(true);
    }
}
)();