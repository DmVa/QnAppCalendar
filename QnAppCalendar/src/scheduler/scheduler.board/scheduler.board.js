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
        $scope.selectRoute = {};
        let schedulerEvents = [];

        let customizeData = null;
        let units = null;

        $ctrl.openCustomize = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.$broadcast('pq-board-init-customize');
            modalService.Open('scheduler-customize-modal');
        };

        $ctrl.openAppointmentWizard = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            let virtualPath = schedulerDataService.getAppVirtualName();
            window.location.href = virtualPath + '/Tools/AppointmentWizard.aspx';
        };
        
        $ctrl.openModal = function (id) {
            modalService.Open(id);
        };

        $ctrl.cancelAppointment = function ($event, scheduledEvent) {
            $event.preventDefault();
            $event.stopPropagation();

            swal({
                title: "Are you sure?",
                text: "This action will cancel the appointment, continue?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    let previousStage = $ctrl.getStageObjectById(scheduledEvent.stageId);
                    if (willDelete) {

                        schedulerDataService.appointmentCancel(scheduledEvent)
                            .then(function (result) {

                                if (result.error) {
                                    $ctrl.handleWrappedError(result);
                                    return;
                                }
                                if (result.data.eventData && result.data.eventData.appointmentId) {
                                    $ctrl.handleAppointmentChangedResult(scheduledEvent, previousStage, result);
                                    return;
                                }

                                $ctrl.removeFromArray(previousStage.schedulerEvents, scheduledEvent);
                                $scope.$apply();

                            }, function (result) {
                                $ctrl.handleError(result);
                                return;
                            });
                    } 
                });

         
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
                if (stageId == -1) {
                    ev.stageId = -1;
                }
                else {
                    if (ev.stageType == 3) { //inservice
                        ev.stageId = stageId;
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
                    if (service.serviceId == serviceId) {
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
                            $ctrl.updateStages();
                        }

                       
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

        $ctrl.needSelectRouteService = function (routeData, eventData) {
            
            let selectRoute = {
                selected: {},
                options: routeData,
                tostagename: eventData.nextStage.name,
                eventData: eventData
            };

            $scope.$broadcast('pq-board-select-route', selectRoute);
            $ctrl.openModal('scheduler-select-route-modal');
        };

        $ctrl.onSelectRoute = function (eventData, selected) {
            $ctrl.runEventChanged(eventData.previousStage, eventData.nextStage, eventData.scheduledEvent, selected.key);
        }

        $ctrl.handleAppointmentChangedResult = function (scheduledEvent, previousStage, result) {

            if (result.data.eventData && result.data.eventData.appointmentId) {
                scheduledEvent.appointmentId = result.data.eventData.appointmentId;
                scheduledEvent.serviceId = result.data.eventData.serviceId;
                scheduledEvent.stageId = result.data.eventData.stageId;
                scheduledEvent.serviceName = result.data.eventData.serviceName;
                scheduledEvent.stageType = result.data.eventData.stageType;
                $ctrl.removeFromArray(previousStage.schedulerEvents, scheduledEvent);
                let newStageObj = $ctrl.getStageObjectById(scheduledEvent.stageId);
                if (newStageObj) {
                    newStageObj.schedulerEvents.push(scheduledEvent);
                }
                $scope.$apply();
                return;
            }
          
        };

        $ctrl.runEventChanged = function (previousStage, nextStage, scheduledEvent, routeId) {

            schedulerDataService.eventChanged({ previousStageId: previousStage.id, nextStageId: nextStage.id, schedulerEvent: scheduledEvent, routeId: routeId })
            .then(function (result) {

                if (result.error) {
                    $ctrl.handleWrappedError(result);
                    return;
                }

                if (result.data.routeData && result.data.routeData.selection && result.data.routeData.selection.options.length > 0) {
                    let eventData = {
                        previousStage: previousStage,
                        nextStage: nextStage,
                        scheduledEvent: scheduledEvent
                    };

                    $ctrl.needSelectRouteService(result.data.routeData.selection.options, eventData);
                    return;
                };

                $ctrl.handleAppointmentChangedResult(scheduledEvent, previousStage, result);
            }, function (result) {
                $ctrl.handleError(result);
                return;
                });
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
            $ctrl.runEventChanged(previousStage, stageobj, scheduledEvent, null);
       

            //schedulerDataService.eventChanged({ previousStageId: previousStageId, nextStageId: nextStageId, schedulerEvent: scheduledEvent, routeId: routeId })
            //    .then(function (result) {

            //        if (result.error) {
            //            $ctrl.handleWrappedError(result);
            //            return;
            //        }

            //        if (result.data.routeData && result.data.routeData.selection && result.data.routeData.selection.options.length > 0) {
            //            $ctrl.needSelectRouteService(stageobj.name, result.data.routeData.selection.options);
            //            return;
            //        };

            //        if (result.data.eventData && result.data.eventData.appointmentId) {
            //            scheduledEvent.appointmentId = result.data.eventData.appointmentId;
            //            scheduledEvent.serviceId = result.data.eventData.serviceId;
            //            scheduledEvent.stageId = result.data.eventData.stageId;
            //            scheduledEvent.serviceName = result.data.eventData.serviceName;
            //            $ctrl.removeFromArray(previousStage.schedulerEvents, scheduledEvent);
            //            let newStageObj = $ctrl.getStageObjectById(scheduledEvent.stageId);
            //            if (newStageObj) {
            //                newStageObj.schedulerEvents.push(scheduledEvent);
            //            }
            //            $scope.$apply();
            //            return;
            //        }
            //        $ctrl.handleError("data doesnot returned, refresh the page");
                    
            //    }, function (result) {
            //        $ctrl.handleError(result);
            //        return;
            //    });

        }


        $ctrl.loadCustomizeData(true);
    }
}
)();