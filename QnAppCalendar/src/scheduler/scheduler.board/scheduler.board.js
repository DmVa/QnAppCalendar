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
        $scope.currentDateStr = '';
        $scope.stages = [];
        let schedulerEvents = [];
        //$scope.scheduler = $ctrl.scheduler; //fix old logic (?)
        //$scope.viewModel = $ctrl.viewModel; //fix old logic (?)
      //  let scheduler = $window.scheduler;

        let _originalEvent = new Map();
        let customizeData = null;
        let units = null;

        $ctrl.openCustomize = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
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
            $ctrl.LoadUnits(true);
        };

        $ctrl.rollbackEvent = function (ev) {
            let originalEvent = _originalEvent.get(ev.appointmentId);
            if (!originalEvent)
                return;
            _originalEvent.delete(ev.appointmentId);

            ev.start_date = originalEvent.start_date;
            ev.end_date = originalEvent.end_date;
            ev.unitid = originalEvent.unitid;
          //  scheduler.updateView();

        };

        $ctrl.rollbackEventTime = function (ev) {
            let originalEvent = _originalEvent.get(ev.appointmentId);
            if (!originalEvent)
                return;
            _originalEvent.delete(ev.appointmentId);

            ev.start_date = originalEvent.start_date;
            ev.end_date = originalEvent.end_date;
          //  scheduler.updateView();

        };

        // config
        //scheduler.config.xml_date = "%Y-%m-%d %H:%i";
        //scheduler.locale.labels.unit_tab = "Stage";
        //scheduler.xy.scale_width = 0;//sets the height of the X-Axis
        //scheduler.config.dblclick_create = false;
        //scheduler.config.drag_create = false;
        //scheduler.config.readonly_form = true;

        //var sections = scheduler.serverList("units");
        //scheduler.createUnitsView({
        //    name: "unit",
        //    property: "unitid",
        //    skip_incorrect: true,
        //    list: sections
        //});

        //scheduler.parse([], "json");//without it  appears popup says

        //scheduler.init('scheduler_here', new Date(), "unit");

        
        //scheduler.attachEvent("onBeforeViewChange", function (old_mode, old_date, mode, date) {
        //    var a_date = schedulerDataService.getDate(date);
        //    var a_minDate = schedulerDataService.getDate(scheduler.getState().min_date);
        //    var a_maxDate = schedulerDataService.getDate(scheduler.getState().max_date);

        //    if (a_date < a_minDate)
        //        a_minDate = a_date;

        //    if (a_date > a_maxDate)
        //        a_maxDate = a_date;

        //    schedulerDataService.loadAppointments(a_minDate, a_maxDate)
        //        .then(function (result) {
        //            if (result.error) {
        //                $ctrl.handleWrappedError(result);
        //                return;
        //            }
        //            if (result.data) {
        //                scheduler.clearAll();
        //                scheduler.parse(result.data, "json");
        //            }
        //        }, function (result) {
        //            $ctrl.handleError(result);
        //            return;
        //        });
        //    return true;
        //});

        $ctrl.LoadUnits =  function(reloadCustomize) {
            schedulerDataService.loadUnits()
                .then(function (result) {
                    if (result.error) {
                        $ctrl.handleWrappedError(result);
                        return;
                    }
                    if (result.data) {
                        $ctrl.units = result.data;
                      //  scheduler.updateCollection("units", $ctrl.units);
                        if (reloadCustomize) {
                            $ctrl.LoadCustomizeData();
                            return;
                        }
                    }
                }, function (result) {
                    $ctrl.handleError(result);
                    return;
                });
        };

       // $ctrl.LoadUnits(false);
       
        $ctrl.UpdateStages = function () {
            if (!$ctrl.customizeData) {
                $scope.stages = [];
                $scope.$apply();
                return;
            }


            for (var stIdx = 0; stIdx < $ctrl.customizeData.stages.length; stIdx++) {
                var stage = $ctrl.customizeData.stages[stIdx];
                stage.schedulerEvents = $ctrl.schedulerEvents.filter(ev => ev.unitid == stage.id);
            }

            $scope.stages = $ctrl.customizeData.stages;
            $scope.$apply();
        };

        $ctrl.LoadCustomizeData = function() {
            schedulerDataService.getCustomizeData()
                .then(function (result) {
                    if (result.error) {
                        $ctrl.handleWrappedError(result);
                        return;
                    }
                    if (result.data) {
                        $ctrl.customizeData = result.data;
                        $ctrl.UpdateStages();
                       // $ctrl.RemapEventToUnits();
                    }
                }, function (result) {
                    $ctrl.handleError(result);
                    return;
                });
        };

        $ctrl.LoadTodayAppointments = function () {
            schedulerDataService.loadTodayAppointments()
                .then(function (result) {
                    if (result.error) {
                        $ctrl.handleWrappedError(result);
                        return;
                    }
                    if (result.data) {
                        $scope.currentDateStr = result.data.currentDateStr;
                        $ctrl.schedulerEvents = result.data.schedulerEvents;
                        $ctrl.UpdateStages();
                        $scope.$apply();
                    }
                }, function (result) {
                    $ctrl.handleError(result);
                    return;
                });
            return true;
        };

        $ctrl.LoadCustomizeData();
        $ctrl.LoadTodayAppointments();
        

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
                if (stage.id == scheduledEvent.unitid) {
                    previousStage = stage;
                    break;
                }
            }

            if (!previousStage) {
                return;
            };

            let previousUnitId = scheduledEvent.unitid;
            let nextUnitId = stageobj.id;
            if (previousUnitId == nextUnitId) {
                return;
            }

            schedulerDataService.eventChanged({ previousUnitId: previousUnitId, nextUnitId: nextUnitId, schedulerEvent: scheduledEvent })
                .then(function (result) {

                    if (result.error) {
                        $ctrl.handleWrappedError(result);
                        return;
                    }
                    if (result.data.appointmentId) {
                        scheduledEvent.appointmentId = result.data.appointmentId;
                        scheduledEvent.serviceId = result.data.serviceId;
                        scheduledEvent.unitid = result.data.unitid;
                        scheduledEvent.serviceName = result.data.serviceName;
                        $ctrl.removeFromArray(previousStage.schedulerEvents, scheduledEvent);
                        let newStageObj = $ctrl.getStageObjectById(scheduledEvent.unitid);
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

        //scheduler.attachEvent("onBeforeEventChanged", function (ev, e, is_new, original) {
        //    _originalEvent.set(ev.appointmentId, $.extend(true, {}, original));
        //    return true;
        //});

        //scheduler.attachEvent("onEventChanged", function (id, ev) {
        //    let linkToEvent = ev;

        //    let theEventCopy = $.extend(true, {}, ev); // make a copy.
        //    let timeZoneOffsetMs = ev.start_date.getTimezoneOffset() * 60000;
        //    theEventCopy.start_date = new Date(ev.start_date.getTime() - timeZoneOffsetMs);
        //    theEventCopy.end_date = new Date(ev.end_date.getTime() - timeZoneOffsetMs);
        //    let originalEvent = _originalEvent.get(ev.appointmentId);
        //    let previousUnitId = 0;
        //    if (originalEvent) {
        //        previousUnitId = originalEvent.unitid;
        //    }
            

        //    schedulerDataService.eventChanged({ previousUnitId: previousUnitId, schedulerEvent: theEventCopy})
        //        .then(function (result) {
                    
        //            if (result.error) {
        //                $ctrl.handleWrappedError(result);
        //                $ctrl.rollbackEvent(ev);
        //                return;
        //            }
        //            if (result.data.appointmentId) {
        //                linkToEvent.appointmentId = result.data.appointmentId;
        //                linkToEvent.serviceId = result.data.serviceId;
        //                linkToEvent.unitid = result.data.unitid;
        //                linkToEvent.text = result.data.text;
        //            }

        //            $ctrl.rollbackEventTime(ev);
        //            console.log('saved');
        //        }, function (result) {
        //            $ctrl.handleError(result);
        //            $ctrl.rollbackEvent(ev);
        //        });
        //});
    }
}
)();