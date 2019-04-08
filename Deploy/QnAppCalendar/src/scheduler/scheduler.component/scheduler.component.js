import './scheduler.component.scss';

(function () {
    'use strict';

    angular
        .module('scheduler.module')
        .component('pqScheduler', {
            templateUrl: '/src/scheduler/scheduler.component/scheduler.component.html',
            controller: SchedulerController,
        });

    SchedulerController.inject = ['$scope', '$window', '$document', '$timeout', 'schedulerDataService', 'modalService'];

    function SchedulerController($scope, $window, $document, $timeout, schedulerDataService, modalService) {
        let $ctrl = this;
        $scope.scheduler = $ctrl.scheduler; //fix old logic (?)
        $scope.viewModel = $ctrl.viewModel; //fix old logic (?)
        let scheduler = $window.scheduler;

        let _originalEvent = new Map();

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

        $ctrl.rollbackEvent = function (ev) {
            let originalEvent = _originalEvent.get(ev.appointmentId);
            if (!originalEvent)
                return;
            _originalEvent.delete(en.appointmentId);

            ev.start_date = originalEvent.start_date;
            ev.end_date = originalEvent.end_date;
            scheduler.updateView();

        };

        scheduler.config.xml_date = "%Y-%m-%d %H:%i";
        scheduler.locale.labels.unit_tab = "Stage";

        var sections = scheduler.serverList("units");
        scheduler.createUnitsView({
            name: "unit",
            property: "unitid",
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
                        scheduler.parse(result.data, "json");
                    }
                }, function (result) {
                    $ctrl.handleError(result);
                    return;
                });
            return true;
        });

       

        schedulerDataService.loadUnits()
            .then(function (result) {
                if (result.error) {
                    $ctrl.handleWrappedError(result);
                    return;
                }
                if (result.data) {
                    scheduler.updateCollection("units", result.data);
                }
            }, function (result) {
                $ctrl.handleError(result);
                return;
            });

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

            schedulerDataService.saveAppointment(theEventCopy)
                .then(function (result) {
                    if (result.error) {
                        $ctrl.handleWrappedError(result);
                        $ctrl.rollbackEvent(ev);
                        return;
                    }

                    linkToEvent.appointmentId = result.data.appointmentId;
                    console.log('saved');
                }, function (result) {
                    $ctrl.handleError(result);
                    $ctrl.rollbackEvent(ev);
                });
        });
    }
}
)();