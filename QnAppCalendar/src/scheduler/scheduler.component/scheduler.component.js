import './scheduler.component.scss';

(function () {
    'use strict';

    angular
        .module('scheduler.module')
        .component('pqScheduler', {
            // templateUrl: './scheduler.component.html',
            template: require('./scheduler.component.html'),
            controller: SchedulerController,
        });

    SchedulerController.inject = ['$scope', '$window', '$document', '$timeout', 'schedulerDataService', 'modalService'];

    function SchedulerController($scope, $window, $document, $timeout, schedulerDataService, modalService) {
        let $ctrl = this;
        $scope.scheduler = $ctrl.scheduler; //fix old logic (?)
        $scope.viewModel = $ctrl.viewModel; //fix old logic (?)
        let scheduler = $window.scheduler;

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
                    alert(result.error.message);
                }
                else {
                    console.log('undefined error');
                }
            }
            else {
                console.log('not wrapped error');
            }
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
            scheduler.updateView();

        };

        $ctrl.rollbackEventTime = function (ev) {
            let originalEvent = _originalEvent.get(ev.appointmentId);
            if (!originalEvent)
                return;
            _originalEvent.delete(ev.appointmentId);

            ev.start_date = originalEvent.start_date;
            ev.end_date = originalEvent.end_date;
            scheduler.updateView();

        };

        // config
        scheduler.config.xml_date = "%Y-%m-%d %H:%i";
        scheduler.locale.labels.unit_tab = "Stage";
        scheduler.config.dblclick_create = false;
        scheduler.config.drag_create = false;
        scheduler.config.readonly_form = true;

        var sections = scheduler.serverList("units");
        scheduler.createUnitsView({
            name: "unit",
            property: "unitid",
            skip_incorrect: true,
            list: sections
        });

        scheduler.parse([], "json");//without it  appears popup says

        scheduler.init('scheduler_here', new Date(), "unit");

        
        scheduler.attachEvent("onBeforeViewChange", function (old_mode, old_date, mode, date) {
            var a_date = schedulerDataService.getDate(date);
            var a_minDate = schedulerDataService.getDate(scheduler.getState().min_date);
            var a_maxDate = schedulerDataService.getDate(scheduler.getState().max_date);

            if (a_date < a_minDate)
                a_minDate = a_date;

            if (a_date > a_maxDate)
                a_maxDate = a_date;

            schedulerDataService.loadAppointments(a_minDate, a_maxDate)
                .then(function (result) {
                    if (result.error) {
                        $ctrl.handleWrappedError(result);
                        return;
                    }
                    if (result.data) {
                        scheduler.clearAll();
                        scheduler.parse(result.data, "json");
                    }
                }, function (result) {
                    $ctrl.handleError(result);
                    return;
                });
            return true;
        });

        $ctrl.LoadUnits =  function(reloadCustomize) {
            schedulerDataService.loadUnits()
                .then(function (result) {
                    if (result.error) {
                        $ctrl.handleWrappedError(result);
                        return;
                    }
                    if (result.data) {
                        $ctrl.units = result.data;
                        scheduler.updateCollection("units", $ctrl.units);
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

        $ctrl.LoadUnits(false);

        $ctrl.LoadCustomizeData = function() {
            schedulerDataService.getCustomizeData()
                .then(function (result) {
                    if (result.error) {
                        $ctrl.handleWrappedError(result);
                        return;
                    }
                    if (result.data) {
                        $ctrl.customizeData = result.data;
                        $ctrl.RemapEventToUnits();
                    }
                }, function (result) {
                    $ctrl.handleError(result);
                    return;
                });
        };

        $ctrl.RemapEventToUnits = function () {
            var evs = scheduler.getEvents();
            if (!evs || evs.length == 0)
                return;

            for (var eventIdx = 0; eventIdx < evs.length; eventIdx++) {
                var ev = evs[eventIdx];
                ev.unitid = $ctrl.getUnitIdForServiceid(ev.serviceId, ev.calendarStageType)
            }
        }

        $ctrl.getUnitIdForServiceid = function (serviceId, stageTypeId) {
            if (!$ctrl.customizeData)
                return - 1;
            let result = -1;

            for (var stageIdx = 0; stageIdx < $ctrl.customizeData.length; stageIdx++) {
                var stage = $ctrl.customizeData[stageIdx];
                for (var statusIdx = 0; statusIdx < stage.statuses.length; statusIdx++) {
                    if (status.Id == serviceId) {
                        result = stage.Id;
                        break;
                    }
                };

                if (result >= 0) {
                    break;
                }
            }
            return result;
        }

        scheduler.attachEvent("onBeforeEventChanged", function (ev, e, is_new, original) {
            _originalEvent.set(ev.appointmentId, $.extend(true, {}, original));
            return true;
        });

        scheduler.attachEvent("onEventChanged", function (id, ev) {
            let linkToEvent = ev;

            let theEventCopy = $.extend(true, {}, ev); // make a copy.
            let timeZoneOffsetMs = ev.start_date.getTimezoneOffset() * 60000;
            theEventCopy.start_date = new Date(ev.start_date.getTime() - timeZoneOffsetMs);
            theEventCopy.end_date = new Date(ev.end_date.getTime() - timeZoneOffsetMs);
            let originalEvent = _originalEvent.get(ev.appointmentId);
            let previousUnitId = 0;
            if (originalEvent) {
                previousUnitId = originalEvent.unitid;
            }
            

            schedulerDataService.eventChanged({ previousUnitId: previousUnitId, schedulerEvent: theEventCopy})
                .then(function (result) {
                    
                    if (result.error) {
                        $ctrl.handleWrappedError(result);
                        $ctrl.rollbackEvent(ev);
                        return;
                    }
                    if (result.data.appointmentId) {
                        linkToEvent.appointmentId = result.data.appointmentId;
                    }

                    $ctrl.rollbackEventTime(ev);
                    console.log('saved');
                }, function (result) {
                    $ctrl.handleError(result);
                    $ctrl.rollbackEvent(ev);
                });
        });
    }
}
)();