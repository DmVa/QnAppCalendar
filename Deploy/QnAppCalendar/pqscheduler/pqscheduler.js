/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/pqscheduler.app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/pqscheduler.app.js":
/*!********************************!*\
  !*** ./src/pqscheduler.app.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scheduler_scheduler_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scheduler/scheduler.module.js */ "./src/scheduler/scheduler.module.js");
/* harmony import */ var _scheduler_scheduler_module_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scheduler_scheduler_module_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scheduler_scheduler_customize_stage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scheduler/scheduler.customize/stage.js */ "./src/scheduler/scheduler.customize/stage.js");
/* harmony import */ var _scheduler_scheduler_customize_stage_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scheduler_scheduler_customize_stage_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _scheduler_scheduler_customize_status_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scheduler/scheduler.customize/status.js */ "./src/scheduler/scheduler.customize/status.js");
/* harmony import */ var _scheduler_scheduler_customize_status_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_scheduler_scheduler_customize_status_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _scheduler_scheduler_services_modal_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scheduler/scheduler.services/modal.service */ "./src/scheduler/scheduler.services/modal.service.js");
/* harmony import */ var _scheduler_scheduler_services_modal_service__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_scheduler_scheduler_services_modal_service__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _scheduler_scheduler_services_schedulerData_service_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scheduler/scheduler.services/schedulerData.service.js */ "./src/scheduler/scheduler.services/schedulerData.service.js");
/* harmony import */ var _scheduler_scheduler_services_schedulerData_service_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_scheduler_scheduler_services_schedulerData_service_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _scheduler_scheduler_directives_draganddrop_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scheduler/scheduler.directives/draganddrop.js */ "./src/scheduler/scheduler.directives/draganddrop.js");
/* harmony import */ var _scheduler_scheduler_directives_draganddrop_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_scheduler_scheduler_directives_draganddrop_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _scheduler_scheduler_directives_modal_directive_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./scheduler/scheduler.directives/modal.directive.js */ "./src/scheduler/scheduler.directives/modal.directive.js");
/* harmony import */ var _scheduler_scheduler_component_scheduler_component_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./scheduler/scheduler.component/scheduler.component.js */ "./src/scheduler/scheduler.component/scheduler.component.js");
/* harmony import */ var _scheduler_scheduler_customize_schedulercustomize_component_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./scheduler/scheduler.customize/schedulercustomize.component.js */ "./src/scheduler/scheduler.customize/schedulercustomize.component.js");
﻿











/***/ }),

/***/ "./src/scheduler/scheduler.component/scheduler.component.js":
/*!******************************************************************!*\
  !*** ./src/scheduler/scheduler.component/scheduler.component.js ***!
  \******************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scheduler_component_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scheduler.component.scss */ "./src/scheduler/scheduler.component/scheduler.component.scss");
/* harmony import */ var _scheduler_component_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scheduler_component_scss__WEBPACK_IMPORTED_MODULE_0__);
﻿

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

/***/ }),

/***/ "./src/scheduler/scheduler.component/scheduler.component.scss":
/*!********************************************************************!*\
  !*** ./src/scheduler/scheduler.component/scheduler.component.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/scheduler/scheduler.customize/schedulercustomize.component.js":
/*!***************************************************************************!*\
  !*** ./src/scheduler/scheduler.customize/schedulercustomize.component.js ***!
  \***************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _schedulercustomize_component_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedulercustomize.component.scss */ "./src/scheduler/scheduler.customize/schedulercustomize.component.scss");
/* harmony import */ var _schedulercustomize_component_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_schedulercustomize_component_scss__WEBPACK_IMPORTED_MODULE_0__);
﻿

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

/***/ }),

/***/ "./src/scheduler/scheduler.customize/schedulercustomize.component.scss":
/*!*****************************************************************************!*\
  !*** ./src/scheduler/scheduler.customize/schedulercustomize.component.scss ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/scheduler/scheduler.customize/stage.js":
/*!****************************************************!*\
  !*** ./src/scheduler/scheduler.customize/stage.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

﻿(function () {
    'use strict';

    var app = angular.module('scheduler.module');
    app.factory('Stage', function () {
        function Stage(id, name, statuses) {
            this.id = id;
            this.name = name;
            this.statuses = [];
            if (statuses) {
                this.statuses = statuses;
            }
        }
        return Stage;
    });
})();



/***/ }),

/***/ "./src/scheduler/scheduler.customize/status.js":
/*!*****************************************************!*\
  !*** ./src/scheduler/scheduler.customize/status.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

﻿(function () {
    'use strict';
    angular
        .module('scheduler.module')
        .factory('Status', function () {
            function Status(id, name, isQflow) {
                this.id = id;
                this.name = name;
                this.isQflow = isQflow;
                this.stageId = -1;
            };

            return Status
        }
        );
}     
)();




/***/ }),

/***/ "./src/scheduler/scheduler.directives/draganddrop.js":
/*!***********************************************************!*\
  !*** ./src/scheduler/scheduler.directives/draganddrop.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

﻿angular
    .module('scheduler.module')
    .directive('dragMe', dragMe)
    .directive('dropOnMe', dropOnMe);

dragMe.$inject = [];

function dragMe() {
    var DDO = {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.prop('draggable', true);
            element.on('dragstart', function (event) {
                if (event.target.attributes['drag-me']) {
                    let dragmeattribute = event.target.attributes['drag-me'].value;
                    let dataid = event.target.attributes[dragmeattribute].value;
                    event.dataTransfer.setData('data', dataid)
                }
            });
        }
    };
    return DDO;
}

dropOnMe.$inject = [];
function dropOnMe() {
    var DDO = {
        restrict: 'A',
        scope: {
            onDrop: '&'
        },
        link: function (scope, element, attrs) {
            element.on('dragover', function (event) {
                event.preventDefault();
            });
            element.on('drop', function (event) {
                event.preventDefault();
                let dataid = event.dataTransfer.getData('data');
                scope.onDrop({ event: event, data: dataid });
            });
        }
    };
    return DDO;
}

/***/ }),

/***/ "./src/scheduler/scheduler.directives/modal.directive.js":
/*!***************************************************************!*\
  !*** ./src/scheduler/scheduler.directives/modal.directive.js ***!
  \***************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal_directive_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.directive.scss */ "./src/scheduler/scheduler.directives/modal.directive.scss");
/* harmony import */ var _modal_directive_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modal_directive_scss__WEBPACK_IMPORTED_MODULE_0__);
﻿

(function () {
    'use strict';

    angular
        .module('scheduler.module')
        .directive('pqModal', Directive);

    function Directive(modalService) {
        return {
            link: function (scope, el, attrs) {
                let element = $(el);

                // ensure id attribute exists
                if (!attrs.id) {
                    console.error('modal must have an id');
                    return;
                }

                // move element to bottom of page (just before </body>) so it can be displayed above everything else
                element.appendTo('body');
                

                // close modal on background click
                element.on('click', function (e) {
                    var target = $(e.target);
                    if (!target.closest('.pq-modal-body').length) {
                        scope.$evalAsync(Close);
                    }
                });

                // add self (this modal instance) to the modal service so it's accessible from controllers
                var modal = {
                    id: attrs.id,
                    open: Open,
                    close: Close
                };
                modalService.Add(modal);

                // remove self from modal service when directive is destroyed
                scope.$on('$destroy', function () {
                    modalService.Remove(attrs.id);
                    element.remove();
                });

                // open modal
                function Open() {
                    element.show();
                    $('body').addClass('pq-modal-open');
                }

                // close modal
                function Close() {
                    element.hide();
                    $('body').removeClass('pq-modal-open');
                }
            }
        };
    }
})();

/***/ }),

/***/ "./src/scheduler/scheduler.directives/modal.directive.scss":
/*!*****************************************************************!*\
  !*** ./src/scheduler/scheduler.directives/modal.directive.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/scheduler/scheduler.module.js":
/*!*******************************************!*\
  !*** ./src/scheduler/scheduler.module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

﻿(function () {
    'use strict';

    angular
        .module('scheduler.module', []);
})();

/***/ }),

/***/ "./src/scheduler/scheduler.services/modal.service.js":
/*!***********************************************************!*\
  !*** ./src/scheduler/scheduler.services/modal.service.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

﻿(function () {
    'use strict';

    angular
        .module('scheduler.module')
        .factory('modalService', modalService);

    function modalService() {
        var modals = []; // array of modals on the page
        var service = {};

        service.Add = Add;
        service.Remove = Remove;
        service.Open = Open;
        service.Close = Close;

        return service;

        function FindWhere(id) {
            var arrayLength = modals.length;
            for (var i = 0; i < arrayLength; i++) {
                if (modals[i].id === id) {
                    return modals[i];
                }
            }
        }

        function Add(modal) {
            // add modal to array of active modals
            modals.push(modal);
        }

        function Remove(id) {
            // remove modal from array of active modals
            var modalToRemove = _.findWhere(modals, { id: id });
            modals = _.without(modals, modalToRemove);
        }

        function Open(id) {
            // open modal specified by id
            var modal = _.findWhere(modals, { id: id });
            modal.open();
        }

        function Close(id) {
            // close modal specified by id
            var modal = _.findWhere(modals, { id: id });
            modal.close();
        }
    }

})();


/***/ }),

/***/ "./src/scheduler/scheduler.services/schedulerData.service.js":
/*!*******************************************************************!*\
  !*** ./src/scheduler/scheduler.services/schedulerData.service.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

﻿(function () {
    'use strict';

    angular
        .module('scheduler.module')
        .factory('schedulerDataService', schedulerDataService);

    schedulerDataService.$inject = ['$http'];
    function schedulerDataService($http) {
        var basePath = '/ajax/PQAppCalendar.ashx?act=';

        return {
            getDate: function (date) {
                if (!date)
                    return date;

                let timeZoneOffsetMs = date.getTimezoneOffset() * 60000;
                let result = new Date(date.getTime() - timeZoneOffsetMs);
                return result;
            },

            handleWrappedError : function (result) {
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
            },
           handleError : function (result) {
                if (result && result.statusText) {
                    console.log(result.statusText);
                }
                else {
                    if (result)
                        console.log(result);
                    else
                        console.log('error');
                }
            },
            getCustomizeData: function () {
                return $.ajax({
                    url: '/ajax/PQAppCalendar.ashx?act=get-customizedata',
                    type: 'post',
                    async: true,
                    contentType: 'application/json; charset=utf-8',
                    data: [],
                    dataType: 'json'
                })
            },
            saveAppointment: function (params) {
               return $.ajax({
                    url: '/ajax/PQAppCalendar.ashx?act=save-appointment',
                    type: 'post',
                    async: true,
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify(params),
                    dataType: 'json'
                });
               
            },

            loadAppointments: function (from, to) {
                var params = { from: from, to: to };
               return $.ajax({
                   url: basePath + 'load-appointmens',
                    type: 'post',
                    async: true,
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify(params),
                    dataType: 'json'
                });
            },

            loadUnits: function (params) {
              return  $.ajax({
                    url: '/ajax/PQAppCalendar.ashx?act=load-units',
                    type: 'post',
                    async: true,
                    contentType: 'application/json; charset=utf-8',
                    data: [],
                    dataType: 'json',
                });
            }

        };
    }
})();

/***/ })

/******/ });
//# sourceMappingURL=pqscheduler.js.map