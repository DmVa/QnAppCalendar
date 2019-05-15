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

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/pqscheduler.app.js":
/*!********************************!*\
  !*** ./src/pqscheduler.app.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scheduler_sweetalert_min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scheduler/sweetalert.min.js */ "./src/scheduler/sweetalert.min.js");
/* harmony import */ var _scheduler_sweetalert_min_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scheduler_sweetalert_min_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scheduler_scheduler_module_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scheduler/scheduler.module.js */ "./src/scheduler/scheduler.module.js");
/* harmony import */ var _scheduler_scheduler_module_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scheduler_scheduler_module_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _scheduler_scheduler_model_stage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scheduler/scheduler.model/stage.js */ "./src/scheduler/scheduler.model/stage.js");
/* harmony import */ var _scheduler_scheduler_model_stage_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_scheduler_scheduler_model_stage_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _scheduler_scheduler_model_schedulerEvent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scheduler/scheduler.model/schedulerEvent.js */ "./src/scheduler/scheduler.model/schedulerEvent.js");
/* harmony import */ var _scheduler_scheduler_model_schedulerEvent_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_scheduler_scheduler_model_schedulerEvent_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _scheduler_scheduler_services_modal_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scheduler/scheduler.services/modal.service */ "./src/scheduler/scheduler.services/modal.service.js");
/* harmony import */ var _scheduler_scheduler_services_modal_service__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_scheduler_scheduler_services_modal_service__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _scheduler_scheduler_services_schedulerData_service_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scheduler/scheduler.services/schedulerData.service.js */ "./src/scheduler/scheduler.services/schedulerData.service.js");
/* harmony import */ var _scheduler_scheduler_services_schedulerData_service_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_scheduler_scheduler_services_schedulerData_service_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _scheduler_scheduler_services_alert_service_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./scheduler/scheduler.services/alert.service.js */ "./src/scheduler/scheduler.services/alert.service.js");
/* harmony import */ var _scheduler_scheduler_services_alert_service_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_scheduler_scheduler_services_alert_service_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _scheduler_scheduler_directives_draganddrop_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./scheduler/scheduler.directives/draganddrop.js */ "./src/scheduler/scheduler.directives/draganddrop.js");
/* harmony import */ var _scheduler_scheduler_directives_draganddrop_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_scheduler_scheduler_directives_draganddrop_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _scheduler_scheduler_directives_modal_directive_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./scheduler/scheduler.directives/modal.directive.js */ "./src/scheduler/scheduler.directives/modal.directive.js");
/* harmony import */ var _scheduler_scheduler_component_scheduler_component_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./scheduler/scheduler.component/scheduler.component.js */ "./src/scheduler/scheduler.component/scheduler.component.js");
/* harmony import */ var _scheduler_scheduler_board_scheduler_board_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./scheduler/scheduler.board/scheduler.board.js */ "./src/scheduler/scheduler.board/scheduler.board.js");
/* harmony import */ var _scheduler_scheduler_customize_schedulercustomize_component_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./scheduler/scheduler.customize/schedulercustomize.component.js */ "./src/scheduler/scheduler.customize/schedulercustomize.component.js");
/* harmony import */ var _scheduler_scheduler_editcolumn_schedulereditcolumn_component_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./scheduler/scheduler.editcolumn/schedulereditcolumn.component.js */ "./src/scheduler/scheduler.editcolumn/schedulereditcolumn.component.js");
﻿















/***/ }),

/***/ "./src/scheduler/scheduler.board/scheduler.board.html":
/*!************************************************************!*\
  !*** ./src/scheduler/scheduler.board/scheduler.board.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"pq-scheduler-board\"> <button ng-click=\"$ctrl.openCustomize($event)\">Customize</button> <div class=\"pq-board-container\"> <div class=\"pq-board-header\"> {{currentDateStr}} </div> <div class=\"pq-board-body\"> <div ng-repeat=\"stageobj in stages\" class=\"pq-stage\" id=\"stage_{{stageobj.id}}\" pq-drop-on-me=\"true\" on-drop=\"handledrop(event, stageobj, data)\"> <div class=\"pq-stageheader\"> <div> {{stageobj.name}}</div> </div> <div class=\"pq-stagebody\"> <div ng-repeat=\"schedulerEvent in stageobj.schedulerEvents\" class=\"pq-stageevent\" id=\"schedulerEvent_{{schedulerEvent.id}}\" pq-drag-me=\"appoitnmnetId\" appoitnmnetId=\"{{schedulerEvent.appointmentId}}\"> <div class=\"pq-appointment\"> <div> {{schedulerEvent.customerName}}</div> <div> {{schedulerEvent.serviceName}}</div> </div> </div> </div> </div> </div> </div> <pq-modal id=\"scheduler-customize-modal\"> <div class=\"pq-modal\"> <div class=\"pq-modal-body\"> <pq-scheduler-customize on-save-customize=\"$ctrl.onSaveCustomize()\" ng-init=\"\"></pq-scheduler-customize> </div> </div> <div class=\"pq-modal-background\"></div> </pq-modal> </div>";

/***/ }),

/***/ "./src/scheduler/scheduler.board/scheduler.board.js":
/*!**********************************************************!*\
  !*** ./src/scheduler/scheduler.board/scheduler.board.js ***!
  \**********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scheduler_board_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scheduler.board.scss */ "./src/scheduler/scheduler.board/scheduler.board.scss");
/* harmony import */ var _scheduler_board_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scheduler_board_scss__WEBPACK_IMPORTED_MODULE_0__);
﻿

(function () {
    'use strict';

    angular
        .module('scheduler.module')
        .component('pqSchedulerBoard', {
            // templateUrl: './scheduler.component.html',
            template: __webpack_require__(/*! ./scheduler.board.html */ "./src/scheduler/scheduler.board/scheduler.board.html"),
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

/***/ }),

/***/ "./src/scheduler/scheduler.board/scheduler.board.scss":
/*!************************************************************!*\
  !*** ./src/scheduler/scheduler.board/scheduler.board.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/scheduler/scheduler.component/scheduler.component.html":
/*!********************************************************************!*\
  !*** ./src/scheduler/scheduler.component/scheduler.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"pq-scheduler\"> <button ng-click=\"$ctrl.openCustomize($event)\">Customize</button> <div class=\"scheduler-container\"> <div id=\"scheduler_here\" class=\"dhx_cal_container\" style=\"width:100%;height:100vh\"> <div class=\"dhx_cal_navline\"> <div class=\"dhx_cal_prev_button\">&nbsp;</div> <div class=\"dhx_cal_next_button\">&nbsp;</div> <div class=\"dhx_cal_today_button\"></div> <div class=\"dhx_cal_date\"></div> <div class=\"dhx_cal_tab\" name=\"day_tab\"></div> <div class=\"dhx_cal_tab\" name=\"week_tab\"></div> <div class=\"dhx_cal_tab\" name=\"month_tab\"></div> <div class=\"dhx_cal_tab\" name=\"unit_tab\" style=\"right:280px\"></div> </div> <div class=\"dhx_cal_header\"></div> <div class=\"dhx_cal_data\"></div> </div> </div> <pq-modal id=\"scheduler-customize-modal\"> <div class=\"pq-modal\"> <div class=\"pq-modal-body\"> <pq-scheduler-customize on-save-customize=\"$ctrl.onSaveCustomize()\"></pq-scheduler-customize> </div> </div> <div class=\"pq-modal-background\"></div> </pq-modal> </div>";

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
﻿// after rrefactor /renaming it was not restored.


(function () {
    'use strict';

    angular
        .module('scheduler.module')
        .component('pqScheduler', {
            template: __webpack_require__(/*! ./scheduler.component.html */ "./src/scheduler/scheduler.component/scheduler.component.html"),
            controller: SchedulerController,
        });

    SchedulerController.inject = ['$scope', '$window', '$document', '$timeout', 'schedulerDataService', 'modalService', 'alertService'];

    function SchedulerController($scope, $window, $document, $timeout, schedulerDataService, modalService, alertService) {
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
            $ctrl.LoadStages(true);
        };

        $ctrl.rollbackEvent = function (ev) {
            let originalEvent = _originalEvent.get(ev.appointmentId);
            if (!originalEvent)
                return;
            _originalEvent.delete(ev.appointmentId);

            ev.start_date = originalEvent.start_date;
            ev.end_date = originalEvent.end_date;
            ev.stageId = originalEvent.stageId;
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
        scheduler.xy.scale_width = 0;//sets the height of the X-Axis
        scheduler.config.dblclick_create = false;
        scheduler.config.drag_create = false;
        scheduler.config.readonly_form = true;

        var sections = scheduler.serverList("units");
        scheduler.createUnitsView({
            name: "unit",
            property: "stageId",
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

        $ctrl.LoadStages =  function(reloadCustomize) {
            schedulerDataService.loadStages()
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

        $ctrl.LoadStages(false);

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
                ev.stageId = $ctrl.getStageIdForServiceid(ev.serviceId);
            }
        }

        $ctrl.getStageIdForServiceid = function (serviceId) {
            if (!$ctrl.customizeData)
                return - 1;
            let result = -1;

            for (var stageIdx = 0; stageIdx < $ctrl.customizeData.length; stageIdx++) {
                var stage = $ctrl.customizeData[stageIdx];
                for (var serviceIdx = 0; statusIdx < stage.services.length; statusIdx++) {
                    var service = stage.services[serviceIdx];
                    if (service.Id == serviceId) {
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
            let previousStageId = 0;
            if (originalEvent) {
                previousStageId = originalEvent.stageId;
            }
            

            schedulerDataService.eventChanged({ previousStageId: previousStageId, schedulerEvent: theEventCopy})
                .then(function (result) {
                    
                    if (result.error) {
                        $ctrl.handleWrappedError(result);
                        $ctrl.rollbackEvent(ev);
                        return;
                    }
                    if (result.data.appointmentId) {
                        linkToEvent.appointmentId = result.data.appointmentId;
                        linkToEvent.serviceId = result.data.serviceId;
                        linkToEvent.stageId = result.data.stageId;
                        linkToEvent.text = result.data.text;
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

/***/ }),

/***/ "./src/scheduler/scheduler.component/scheduler.component.scss":
/*!********************************************************************!*\
  !*** ./src/scheduler/scheduler.component/scheduler.component.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/scheduler/scheduler.customize/schedulercustomize.component.html":
/*!*****************************************************************************!*\
  !*** ./src/scheduler/scheduler.customize/schedulercustomize.component.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"scheduler-customize-container\"> <div class=\"scheduler-centered-content\"> <div class=\"avaiable-container\" pq-drop-on-me on-drop=\"handledrop(event, null, data)\"> <span class=\"availableservice\">Not shown services</span> <div ng-repeat=\"service in notShownServices\" class=\"stageservice\" pq-drag-me=\"serviceid\" id=\"service_{{service.id}}\" serviceid=\"{{service.serviceId}}\"> {{service.name}} </div> </div> <div class=\"stages-block\"> <div class=\"centered\"> <span> Stages </span> <span> <input type=\"submit\" class=\"flatbutton\" value=\"+\" title=\"Add Column\" ng-click=\"$ctrl.editStage($event, null)\"/> </span> </div> <div class=\"stages-container\"> <div ng-repeat=\"stageobj in stages\" class=\"stage\" pq-drop-on-me=\"{{stageobj.stageType == 3}}\" on-drop=\"handledrop(event, stageobj, data)\" id=\"stage_{{stageobj.id}}\"> <div class=\"stageheader\"> <span> <input ng-model=\"stageobj.name\" class=\"stageheadername\"/> </span> <span ng-if=\"stageobj.stageType == 3\"> <input type=\"submit\" class=\"flatbutton\" value=\"-\" title=\"Remove Column\" ng-click=\"$ctrl.removeStage($event, stageobj)\"/> </span> <span ng-if=\"stageobj.stageType == 3\"> <input type=\"submit\" class=\"flatbutton\" value=\"...\" title=\"Edit Column\" ng-click=\"$ctrl.editStage($event, stageobj)\"/> </span> </div> <div ng-repeat=\"stageservice in stageobj.services\" class=\"stageservice\" pq-drag-me=\"serviceid\" id=\"service_{{stagestatus.id}}\" serviceid=\"{{stageservice.serviceId}}\"> {{stageservice.name}} </div> </div> </div> </div> </div> <div class=\"pq-modal-footer\"> <button type=\"button\" ng-click=\"$ctrl.closeModal(false)\" class=\"btn btn-default\" focus-element=\"autofocus\" data-dismiss=\"pq-modal\">Close</button> <button type=\"button\" ng-click=\"$ctrl.closeModal(true)\" class=\"btn btn-primary\">Save changes</button> </div> </div> <pq-scheduler-edit-column on-edit-stage=\"$ctrl.onEditStage()\"></pq-scheduler-edit-column>";

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
            template: __webpack_require__(/*! ./schedulercustomize.component.html */ "./src/scheduler/scheduler.customize/schedulercustomize.component.html"),
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
        let unitId = -1;
        let configId = -1;
        $scope.editingStage = new Stage(-1, '', 3, []);
        $scope.editingStage.buttonName = '11';

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
                if (stage.stageType <= 3) {
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

        $ctrl.closeModal = function closeModal(save) {
            if (save) {
                let data = { unitId: $ctrl.unitId, configId: $ctrl.configId, stages: $ctrl.allStages, notShownServices: $ctrl.notShownServices};
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

        $ctrl.editStage = function editStage($event, stageobj) {
            $event.preventDefault();
            $event.stopPropagation();
            if (!stageobj) {
                $scope.editingStage.id = -1;
                $scope.editingStage.name = '';
                $scope.editingStage.isServiceDefault = false;
                $scope.editingStage.buttonName = 'Add';
            }
            else {
                $scope.editingStage.id = stageobj.id;
                $scope.editingStage.name = stageobj.name;
                $scope.editingStage.isServiceDefault = stageobj.isServiceDefault;
                $scope.editingStage.buttonName = 'Edit';
            }

            $ctrlAddColumn.show();
        };

        $ctrl.onEditStage = function onEditStage() {
            let stageId = $scope.editingStage.id;
            if (stageId == -1) {
                // add new
                let index = getLastIndexOfServiceStage() + 1;
                let newStageId = getMinStageIdForNewStage() - 1;
                let newStage = new Stage(newStageId, $scope.editingStage.name, 3, []); //3- service.

                $ctrl.allStages.splice(index, 0, newStage);
            }
            else {
                //edit
                let stage = $ctrl.allStages.find(item => item.id == stageId);
                if (stage) {
                    stage.name = $scope.editingStage.name;
                    stage.isServiceDefault = $scope.editingStage.isServiceDefault;
                    $ctrl.changeIsServiceDefault(stage);
                }
            }

        };

        $ctrl.changeIsServiceDefault = function changeIsServiceDefault(stageobj) {
            if (stageobj.isServiceDefault) {
                for (let i = 0; i < $ctrl.allStages.length; i++) {
                    let stage = $ctrl.allStages[i];
                    if (stage != stageobj) {
                        stage.isServiceDefault = false;
                    }
                }
            }
        };

        $ctrl.getCustomizeData = function getCustomizeData() {
            schedulerDataService.getCustomizeData()
                .then(function (result) {
                    if (result.error) {
                        schedulerDataService.handleWrappedError(result);
                        return;
                    }
                    if (result.data) {
                        $ctrl.unitId = result.data.unitId;
                        $ctrl.configId = result.data.configId;
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

/***/ }),

/***/ "./src/scheduler/scheduler.customize/schedulercustomize.component.scss":
/*!*****************************************************************************!*\
  !*** ./src/scheduler/scheduler.customize/schedulercustomize.component.scss ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/scheduler/scheduler.directives/draganddrop.js":
/*!***********************************************************!*\
  !*** ./src/scheduler/scheduler.directives/draganddrop.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

﻿angular
    .module('scheduler.module')
    .directive('pqDragMe', pqDragMe)
    .directive('pqDropOnMe', pqDropOnMe);

pqDragMe.$inject = [];

function pqDragMe() {
    var DDO = {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.prop('draggable', true);
            element.on('dragstart', function (event) {
                if (event.target.attributes['pq-drag-me']) {
                    let dragmeattribute = event.target.attributes['pq-drag-me'].value;
                    let dataid = event.target.attributes[dragmeattribute].value;
                    if (event.dataTransfer === undefined) {
                        event.originalEvent.dataTransfer.setData('data', dataid);
                    }
                    else {
                        event.dataTransfer.setData('data', dataid)
                    }
                }
            });
        }
    };
    return DDO;
}

pqDropOnMe.$inject = [];
function pqDropOnMe() {
    var DDO = {
        restrict: 'A',
        scope: {
            onDrop: '&'
        },
        link: function (scope, element, attrs) {
            let preventDrop = attrs["pqDropOnMe"] === "false";
            element.on('dragover', function (event) {
                if (!preventDrop)
                    event.preventDefault();
            });
            element.on('drop', function (event) {
                event.preventDefault();
                let dataid;
                if (event.dataTransfer === undefined) {
                    dataid = event.originalEvent.dataTransfer.getData('data');
                }
                else {
                    dataid = event.dataTransfer.getData('data');
                }
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

                // open modal
                function Open2() {
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

/***/ "./src/scheduler/scheduler.editcolumn/schedulereditcolumn.component.html":
/*!*******************************************************************************!*\
  !*** ./src/scheduler/scheduler.editcolumn/schedulereditcolumn.component.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"scheduler-edit-column\"> <div class=\"top-content\"> <table> <tr> <td> <label for=\"pqstageName\">Name</label> </td> <td> <input type=\"text\" id=\"pqstageName\" ng-model=\"$parent.editingStage.name\"> </td> </tr> <tr> <td> <label for=\"pqisservicedefault\">Default for services</label> </td> <td> <input type=\"checkbox\" id=\"pqisservicedefault\" ng-model=\"$parent.editingStage.isServiceDefault\"> </td> </tr> </table> </div> <div class=\"pq-modal-footer\"> <button type=\"button\" ng-click=\"$ctrl.closeModal($event, false)\" class=\"btn btn-default\" focus-element=\"autofocus\" data-dismiss=\"pq-modal\">Close</button> <button type=\"button\" ng-click=\"$ctrl.closeModal($event, true)\" class=\"btn btn-primary\">{{$parent.editingStage.buttonName}}</button> </div> </div> ";

/***/ }),

/***/ "./src/scheduler/scheduler.editcolumn/schedulereditcolumn.component.js":
/*!*****************************************************************************!*\
  !*** ./src/scheduler/scheduler.editcolumn/schedulereditcolumn.component.js ***!
  \*****************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _schedulereditcolumn_component_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedulereditcolumn.component.scss */ "./src/scheduler/scheduler.editcolumn/schedulereditcolumn.component.scss");
/* harmony import */ var _schedulereditcolumn_component_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_schedulereditcolumn_component_scss__WEBPACK_IMPORTED_MODULE_0__);
﻿

(function () {
    'use strict';

    angular
        .module('scheduler.module')
        .component('pqSchedulerEditColumn', {
            template: __webpack_require__(/*! ./schedulereditcolumn.component.html */ "./src/scheduler/scheduler.editcolumn/schedulereditcolumn.component.html"),
            controller: SchedulerEditColumnController,
            bindings: {
                onEditStage: '&'
            }
        });
    
    SchedulerEditColumnController.inject = ['$scope', '$window', '$document', '$timeout', 'modalService', 'schedulerDataService'];
   

    function SchedulerEditColumnController($scope, $window, $document, $timeout, modalService, schedulerDataService) {
        let $ctrl = this;
        $scope.name = '';
        $scope.isservicedefault = false;
        let $ctrlAddColumn = $('pq-scheduler-edit-column');
     
        $ctrl.closeModal = function closeModal($event, save) {
            $event.preventDefault();
            if (save) {
                $ctrl.onEditStage();
            }
            $ctrlAddColumn.hide();
        };
    }
}
)();

/***/ }),

/***/ "./src/scheduler/scheduler.editcolumn/schedulereditcolumn.component.scss":
/*!*******************************************************************************!*\
  !*** ./src/scheduler/scheduler.editcolumn/schedulereditcolumn.component.scss ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/scheduler/scheduler.model/schedulerEvent.js":
/*!*********************************************************!*\
  !*** ./src/scheduler/scheduler.model/schedulerEvent.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

﻿(function () {
    'use strict';

    var app = angular.module('scheduler.module');
    app.factory('SchedulerEvent', function () {
        function SchedulerEvent() {
            this.id = 0;
            this.serviceName = '';
            this.customerName = '';
            this.stageId = 0;
            this.serviceId = 0;
            this.appointmentId = 0;
            this.stageType = -1;
            this.processId = 0;
        }
        return SchedulerEvent;
    });
})();



/***/ }),

/***/ "./src/scheduler/scheduler.model/stage.js":
/*!************************************************!*\
  !*** ./src/scheduler/scheduler.model/stage.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

﻿(function () {
    'use strict';

    var app = angular.module('scheduler.module');
    app.factory('Stage', function () {
        function Stage(id, name, stageType, services) {
            this.id = id;
            this.name = name;
            this.stageType = stageType;
            this.isServiceDefault = false;
            this.services = [];
            if (services) {
                this.services = services;
            }
            this.schedulerEvents = [];
        }
        return Stage;
    });
})();



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

/***/ "./src/scheduler/scheduler.services/alert.service.js":
/*!***********************************************************!*\
  !*** ./src/scheduler/scheduler.services/alert.service.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

﻿
(function () {
    'use strict';

    angular
        .module('scheduler.module')
        .factory('alertService', alertService);

    function alertService() {
        var service = {};

        service.Error = Error;
        return service;

        function Error(text) {
            swal("Error!", text, "error");
        }
    }

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

    schedulerDataService.$inject = ['$http','alertService'];
    function schedulerDataService($http, alertService) {
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
                        alertService.Error(result.error.message);
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
           saveCustomizeData: function (params) {
               return $.ajax({
                   url: basePath + 'save-customizedata',
                   type: 'post',
                   async: true,
                   contentType: 'application/json; charset=utf-8',
                   data: JSON.stringify(params),
                   dataType: 'json'
               })
           },
            getCustomizeData: function () {
                return $.ajax({
                    url: basePath + 'get-customizedata',
                    type: 'post',
                    async: true,
                    contentType: 'application/json; charset=utf-8',
                    data: [],
                    dataType: 'json'
                })
            },
            saveAppointment: function (params) {
               return $.ajax({
                   url: basePath + 'save-appointment',
                    type: 'post',
                    async: true,
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify(params),
                    dataType: 'json'
                });
            },
            eventChanged: function (params) {
                return $.ajax({
                    url: basePath + 'appointment-changed',
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

            loadTodayAppointments: function () {
                return $.ajax({
                    url: basePath + 'load-appointmens',
                    type: 'post',
                    async: true,
                    contentType: 'application/json; charset=utf-8',
                    data: [],
                    dataType: 'json'
                });
            },

            loadStages: function (params) {
              return  $.ajax({
                    url: basePath + 'load-stages',
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

/***/ }),

/***/ "./src/scheduler/sweetalert.min.js":
/*!*****************************************!*\
  !*** ./src/scheduler/sweetalert.min.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {!function(t,e){ true?module.exports=e():undefined}(this,function(){return function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=8)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o="swal-button";e.CLASS_NAMES={MODAL:"swal-modal",OVERLAY:"swal-overlay",SHOW_MODAL:"swal-overlay--show-modal",MODAL_TITLE:"swal-title",MODAL_TEXT:"swal-text",ICON:"swal-icon",ICON_CUSTOM:"swal-icon--custom",CONTENT:"swal-content",FOOTER:"swal-footer",BUTTON_CONTAINER:"swal-button-container",BUTTON:o,CONFIRM_BUTTON:o+"--confirm",CANCEL_BUTTON:o+"--cancel",DANGER_BUTTON:o+"--danger",BUTTON_LOADING:o+"--loading",BUTTON_LOADER:o+"__loader"},e.default=e.CLASS_NAMES},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getNode=function(t){var e="."+t;return document.querySelector(e)},e.stringToNode=function(t){var e=document.createElement("div");return e.innerHTML=t.trim(),e.firstChild},e.insertAfter=function(t,e){var n=e.nextSibling;e.parentNode.insertBefore(t,n)},e.removeNode=function(t){t.parentElement.removeChild(t)},e.throwErr=function(t){throw t=t.replace(/ +(?= )/g,""),"SweetAlert: "+(t=t.trim())},e.isPlainObject=function(t){if("[object Object]"!==Object.prototype.toString.call(t))return!1;var e=Object.getPrototypeOf(t);return null===e||e===Object.prototype},e.ordinalSuffixOf=function(t){var e=t%10,n=t%100;return 1===e&&11!==n?t+"st":2===e&&12!==n?t+"nd":3===e&&13!==n?t+"rd":t+"th"}},function(t,e,n){"use strict";function o(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),o(n(25));var r=n(26);e.overlayMarkup=r.default,o(n(27)),o(n(28)),o(n(29));var i=n(0),a=i.default.MODAL_TITLE,s=i.default.MODAL_TEXT,c=i.default.ICON,l=i.default.FOOTER;e.iconMarkup='\n  <div class="'+c+'"></div>',e.titleMarkup='\n  <div class="'+a+'"></div>\n',e.textMarkup='\n  <div class="'+s+'"></div>',e.footerMarkup='\n  <div class="'+l+'"></div>\n'},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1);e.CONFIRM_KEY="confirm",e.CANCEL_KEY="cancel";var r={visible:!0,text:null,value:null,className:"",closeModal:!0},i=Object.assign({},r,{visible:!1,text:"Cancel",value:null}),a=Object.assign({},r,{text:"OK",value:!0});e.defaultButtonList={cancel:i,confirm:a};var s=function(t){switch(t){case e.CONFIRM_KEY:return a;case e.CANCEL_KEY:return i;default:var n=t.charAt(0).toUpperCase()+t.slice(1);return Object.assign({},r,{text:n,value:t})}},c=function(t,e){var n=s(t);return!0===e?Object.assign({},n,{visible:!0}):"string"==typeof e?Object.assign({},n,{visible:!0,text:e}):o.isPlainObject(e)?Object.assign({visible:!0},n,e):Object.assign({},n,{visible:!1})},l=function(t){for(var e={},n=0,o=Object.keys(t);n<o.length;n++){var r=o[n],a=t[r],s=c(r,a);e[r]=s}return e.cancel||(e.cancel=i),e},u=function(t){var n={};switch(t.length){case 1:n[e.CANCEL_KEY]=Object.assign({},i,{visible:!1});break;case 2:n[e.CANCEL_KEY]=c(e.CANCEL_KEY,t[0]),n[e.CONFIRM_KEY]=c(e.CONFIRM_KEY,t[1]);break;default:o.throwErr("Invalid number of 'buttons' in array ("+t.length+").\n      If you want more than 2 buttons, you need to use an object!")}return n};e.getButtonListOpts=function(t){var n=e.defaultButtonList;return"string"==typeof t?n[e.CONFIRM_KEY]=c(e.CONFIRM_KEY,t):Array.isArray(t)?n=u(t):o.isPlainObject(t)?n=l(t):!0===t?n=u([!0,!0]):!1===t?n=u([!1,!1]):void 0===t&&(n=e.defaultButtonList),n}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(2),i=n(0),a=i.default.MODAL,s=i.default.OVERLAY,c=n(30),l=n(31),u=n(32),f=n(33);e.injectElIntoModal=function(t){var e=o.getNode(a),n=o.stringToNode(t);return e.appendChild(n),n};var d=function(t){t.className=a,t.textContent=""},p=function(t,e){d(t);var n=e.className;n&&t.classList.add(n)};e.initModalContent=function(t){var e=o.getNode(a);p(e,t),c.default(t.icon),l.initTitle(t.title),l.initText(t.text),f.default(t.content),u.default(t.buttons,t.dangerMode)};var m=function(){var t=o.getNode(s),e=o.stringToNode(r.modalMarkup);t.appendChild(e)};e.default=m},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(3),r={isOpen:!1,promise:null,actions:{},timer:null},i=Object.assign({},r);e.resetState=function(){i=Object.assign({},r)},e.setActionValue=function(t){if("string"==typeof t)return a(o.CONFIRM_KEY,t);for(var e in t)a(e,t[e])};var a=function(t,e){i.actions[t]||(i.actions[t]={}),Object.assign(i.actions[t],{value:e})};e.setActionOptionsFor=function(t,e){var n=(void 0===e?{}:e).closeModal,o=void 0===n||n;Object.assign(i.actions[t],{closeModal:o})},e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(3),i=n(0),a=i.default.OVERLAY,s=i.default.SHOW_MODAL,c=i.default.BUTTON,l=i.default.BUTTON_LOADING,u=n(5);e.openModal=function(){o.getNode(a).classList.add(s),u.default.isOpen=!0};var f=function(){o.getNode(a).classList.remove(s),u.default.isOpen=!1};e.onAction=function(t){void 0===t&&(t=r.CANCEL_KEY);var e=u.default.actions[t],n=e.value;if(!1===e.closeModal){var i=c+"--"+t;o.getNode(i).classList.add(l)}else f();u.default.promise.resolve(n)},e.getState=function(){var t=Object.assign({},u.default);return delete t.promise,delete t.timer,t},e.stopLoading=function(){for(var t=document.querySelectorAll("."+c),e=0;e<t.length;e++){t[e].classList.remove(l)}}},function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){(function(e){t.exports=e.sweetAlert=n(9)}).call(e,n(7))},function(t,e,n){(function(e){t.exports=e.swal=n(10)}).call(e,n(7))},function(t,e,n){"undefined"!=typeof window&&n(11),n(16);var o=n(23).default;t.exports=o},function(t,e,n){var o=n(12);"string"==typeof o&&(o=[[t.i,o,""]]);var r={insertAt:"top"};r.transform=void 0;n(14)(o,r);o.locals&&(t.exports=o.locals)},function(t,e,n){e=t.exports=n(13)(void 0),e.push([t.i,'.swal-icon--error{border-color:#f27474;-webkit-animation:animateErrorIcon .5s;animation:animateErrorIcon .5s}.swal-icon--error__x-mark{position:relative;display:block;-webkit-animation:animateXMark .5s;animation:animateXMark .5s}.swal-icon--error__line{position:absolute;height:5px;width:47px;background-color:#f27474;display:block;top:37px;border-radius:2px}.swal-icon--error__line--left{-webkit-transform:rotate(45deg);transform:rotate(45deg);left:17px}.swal-icon--error__line--right{-webkit-transform:rotate(-45deg);transform:rotate(-45deg);right:16px}@-webkit-keyframes animateErrorIcon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}to{-webkit-transform:rotateX(0deg);transform:rotateX(0deg);opacity:1}}@keyframes animateErrorIcon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}to{-webkit-transform:rotateX(0deg);transform:rotateX(0deg);opacity:1}}@-webkit-keyframes animateXMark{0%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}50%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}80%{-webkit-transform:scale(1.15);transform:scale(1.15);margin-top:-6px}to{-webkit-transform:scale(1);transform:scale(1);margin-top:0;opacity:1}}@keyframes animateXMark{0%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}50%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}80%{-webkit-transform:scale(1.15);transform:scale(1.15);margin-top:-6px}to{-webkit-transform:scale(1);transform:scale(1);margin-top:0;opacity:1}}.swal-icon--warning{border-color:#f8bb86;-webkit-animation:pulseWarning .75s infinite alternate;animation:pulseWarning .75s infinite alternate}.swal-icon--warning__body{width:5px;height:47px;top:10px;border-radius:2px;margin-left:-2px}.swal-icon--warning__body,.swal-icon--warning__dot{position:absolute;left:50%;background-color:#f8bb86}.swal-icon--warning__dot{width:7px;height:7px;border-radius:50%;margin-left:-4px;bottom:-11px}@-webkit-keyframes pulseWarning{0%{border-color:#f8d486}to{border-color:#f8bb86}}@keyframes pulseWarning{0%{border-color:#f8d486}to{border-color:#f8bb86}}.swal-icon--success{border-color:#a5dc86}.swal-icon--success:after,.swal-icon--success:before{content:"";border-radius:50%;position:absolute;width:60px;height:120px;background:#fff;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.swal-icon--success:before{border-radius:120px 0 0 120px;top:-7px;left:-33px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:60px 60px;transform-origin:60px 60px}.swal-icon--success:after{border-radius:0 120px 120px 0;top:-11px;left:30px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:0 60px;transform-origin:0 60px;-webkit-animation:rotatePlaceholder 4.25s ease-in;animation:rotatePlaceholder 4.25s ease-in}.swal-icon--success__ring{width:80px;height:80px;border:4px solid hsla(98,55%,69%,.2);border-radius:50%;box-sizing:content-box;position:absolute;left:-4px;top:-4px;z-index:2}.swal-icon--success__hide-corners{width:5px;height:90px;background-color:#fff;padding:1px;position:absolute;left:28px;top:8px;z-index:1;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal-icon--success__line{height:5px;background-color:#a5dc86;display:block;border-radius:2px;position:absolute;z-index:2}.swal-icon--success__line--tip{width:25px;left:14px;top:46px;-webkit-transform:rotate(45deg);transform:rotate(45deg);-webkit-animation:animateSuccessTip .75s;animation:animateSuccessTip .75s}.swal-icon--success__line--long{width:47px;right:8px;top:38px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-animation:animateSuccessLong .75s;animation:animateSuccessLong .75s}@-webkit-keyframes rotatePlaceholder{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}to{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@keyframes rotatePlaceholder{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}to{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@-webkit-keyframes animateSuccessTip{0%{width:0;left:1px;top:19px}54%{width:0;left:1px;top:19px}70%{width:50px;left:-8px;top:37px}84%{width:17px;left:21px;top:48px}to{width:25px;left:14px;top:45px}}@keyframes animateSuccessTip{0%{width:0;left:1px;top:19px}54%{width:0;left:1px;top:19px}70%{width:50px;left:-8px;top:37px}84%{width:17px;left:21px;top:48px}to{width:25px;left:14px;top:45px}}@-webkit-keyframes animateSuccessLong{0%{width:0;right:46px;top:54px}65%{width:0;right:46px;top:54px}84%{width:55px;right:0;top:35px}to{width:47px;right:8px;top:38px}}@keyframes animateSuccessLong{0%{width:0;right:46px;top:54px}65%{width:0;right:46px;top:54px}84%{width:55px;right:0;top:35px}to{width:47px;right:8px;top:38px}}.swal-icon--info{border-color:#c9dae1}.swal-icon--info:before{width:5px;height:29px;bottom:17px;border-radius:2px;margin-left:-2px}.swal-icon--info:after,.swal-icon--info:before{content:"";position:absolute;left:50%;background-color:#c9dae1}.swal-icon--info:after{width:7px;height:7px;border-radius:50%;margin-left:-3px;top:19px}.swal-icon{width:80px;height:80px;border-width:4px;border-style:solid;border-radius:50%;padding:0;position:relative;box-sizing:content-box;margin:20px auto}.swal-icon:first-child{margin-top:32px}.swal-icon--custom{width:auto;height:auto;max-width:100%;border:none;border-radius:0}.swal-icon img{max-width:100%;max-height:100%}.swal-title{color:rgba(0,0,0,.65);font-weight:600;text-transform:none;position:relative;display:block;padding:13px 16px;font-size:27px;line-height:normal;text-align:center;margin-bottom:0}.swal-title:first-child{margin-top:26px}.swal-title:not(:first-child){padding-bottom:0}.swal-title:not(:last-child){margin-bottom:13px}.swal-text{font-size:16px;position:relative;float:none;line-height:normal;vertical-align:top;text-align:left;display:inline-block;margin:0;padding:0 10px;font-weight:400;color:rgba(0,0,0,.64);max-width:calc(100% - 20px);overflow-wrap:break-word;box-sizing:border-box}.swal-text:first-child{margin-top:45px}.swal-text:last-child{margin-bottom:45px}.swal-footer{text-align:right;padding-top:13px;margin-top:13px;padding:13px 16px;border-radius:inherit;border-top-left-radius:0;border-top-right-radius:0}.swal-button-container{margin:5px;display:inline-block;position:relative}.swal-button{background-color:#7cd1f9;color:#fff;border:none;box-shadow:none;border-radius:5px;font-weight:600;font-size:14px;padding:10px 24px;margin:0;cursor:pointer}.swal-button:not([disabled]):hover{background-color:#78cbf2}.swal-button:active{background-color:#70bce0}.swal-button:focus{outline:none;box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(43,114,165,.29)}.swal-button[disabled]{opacity:.5;cursor:default}.swal-button::-moz-focus-inner{border:0}.swal-button--cancel{color:#555;background-color:#efefef}.swal-button--cancel:not([disabled]):hover{background-color:#e8e8e8}.swal-button--cancel:active{background-color:#d7d7d7}.swal-button--cancel:focus{box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(116,136,150,.29)}.swal-button--danger{background-color:#e64942}.swal-button--danger:not([disabled]):hover{background-color:#df4740}.swal-button--danger:active{background-color:#cf423b}.swal-button--danger:focus{box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(165,43,43,.29)}.swal-content{padding:0 20px;margin-top:20px;font-size:medium}.swal-content:last-child{margin-bottom:20px}.swal-content__input,.swal-content__textarea{-webkit-appearance:none;background-color:#fff;border:none;font-size:14px;display:block;box-sizing:border-box;width:100%;border:1px solid rgba(0,0,0,.14);padding:10px 13px;border-radius:2px;transition:border-color .2s}.swal-content__input:focus,.swal-content__textarea:focus{outline:none;border-color:#6db8ff}.swal-content__textarea{resize:vertical}.swal-button--loading{color:transparent}.swal-button--loading~.swal-button__loader{opacity:1}.swal-button__loader{position:absolute;height:auto;width:43px;z-index:2;left:50%;top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);text-align:center;pointer-events:none;opacity:0}.swal-button__loader div{display:inline-block;float:none;vertical-align:baseline;width:9px;height:9px;padding:0;border:none;margin:2px;opacity:.4;border-radius:7px;background-color:hsla(0,0%,100%,.9);transition:background .2s;-webkit-animation:swal-loading-anim 1s infinite;animation:swal-loading-anim 1s infinite}.swal-button__loader div:nth-child(3n+2){-webkit-animation-delay:.15s;animation-delay:.15s}.swal-button__loader div:nth-child(3n+3){-webkit-animation-delay:.3s;animation-delay:.3s}@-webkit-keyframes swal-loading-anim{0%{opacity:.4}20%{opacity:.4}50%{opacity:1}to{opacity:.4}}@keyframes swal-loading-anim{0%{opacity:.4}20%{opacity:.4}50%{opacity:1}to{opacity:.4}}.swal-overlay{position:fixed;top:0;bottom:0;left:0;right:0;text-align:center;font-size:0;overflow-y:auto;background-color:rgba(0,0,0,.4);z-index:10000;pointer-events:none;opacity:0;transition:opacity .3s}.swal-overlay:before{content:" ";display:inline-block;vertical-align:middle;height:100%}.swal-overlay--show-modal{opacity:1;pointer-events:auto}.swal-overlay--show-modal .swal-modal{opacity:1;pointer-events:auto;box-sizing:border-box;-webkit-animation:showSweetAlert .3s;animation:showSweetAlert .3s;will-change:transform}.swal-modal{width:478px;opacity:0;pointer-events:none;background-color:#fff;text-align:center;border-radius:5px;position:static;margin:20px auto;display:inline-block;vertical-align:middle;-webkit-transform:scale(1);transform:scale(1);-webkit-transform-origin:50% 50%;transform-origin:50% 50%;z-index:10001;transition:opacity .2s,-webkit-transform .3s;transition:transform .3s,opacity .2s;transition:transform .3s,opacity .2s,-webkit-transform .3s}@media (max-width:500px){.swal-modal{width:calc(100% - 20px)}}@-webkit-keyframes showSweetAlert{0%{-webkit-transform:scale(1);transform:scale(1)}1%{-webkit-transform:scale(.5);transform:scale(.5)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}to{-webkit-transform:scale(1);transform:scale(1)}}@keyframes showSweetAlert{0%{-webkit-transform:scale(1);transform:scale(1)}1%{-webkit-transform:scale(.5);transform:scale(.5)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}to{-webkit-transform:scale(1);transform:scale(1)}}',""])},function(t,e){function n(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var i=o(r);return[n].concat(r.sources.map(function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"})).concat([i]).join("\n")}return[n].join("\n")}function o(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var o=n(e,t);return e[2]?"@media "+e[2]+"{"+o+"}":o}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];"number"==typeof i&&(o[i]=!0)}for(r=0;r<t.length;r++){var a=t[r];"number"==typeof a[0]&&o[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},function(t,e,n){function o(t,e){for(var n=0;n<t.length;n++){var o=t[n],r=m[o.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](o.parts[i]);for(;i<o.parts.length;i++)r.parts.push(u(o.parts[i],e))}else{for(var a=[],i=0;i<o.parts.length;i++)a.push(u(o.parts[i],e));m[o.id]={id:o.id,refs:1,parts:a}}}}function r(t,e){for(var n=[],o={},r=0;r<t.length;r++){var i=t[r],a=e.base?i[0]+e.base:i[0],s=i[1],c=i[2],l=i[3],u={css:s,media:c,sourceMap:l};o[a]?o[a].parts.push(u):n.push(o[a]={id:a,parts:[u]})}return n}function i(t,e){var n=v(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var o=w[w.length-1];if("top"===t.insertAt)o?o.nextSibling?n.insertBefore(e,o.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),w.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(e)}}function a(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=w.indexOf(t);e>=0&&w.splice(e,1)}function s(t){var e=document.createElement("style");return t.attrs.type="text/css",l(e,t.attrs),i(t,e),e}function c(t){var e=document.createElement("link");return t.attrs.type="text/css",t.attrs.rel="stylesheet",l(e,t.attrs),i(t,e),e}function l(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function u(t,e){var n,o,r,i;if(e.transform&&t.css){if(!(i=e.transform(t.css)))return function(){};t.css=i}if(e.singleton){var l=h++;n=g||(g=s(e)),o=f.bind(null,n,l,!1),r=f.bind(null,n,l,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=c(e),o=p.bind(null,n,e),r=function(){a(n),n.href&&URL.revokeObjectURL(n.href)}):(n=s(e),o=d.bind(null,n),r=function(){a(n)});return o(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;o(t=e)}else r()}}function f(t,e,n,o){var r=n?"":o.css;if(t.styleSheet)t.styleSheet.cssText=x(e,r);else{var i=document.createTextNode(r),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(i,a[e]):t.appendChild(i)}}function d(t,e){var n=e.css,o=e.media;if(o&&t.setAttribute("media",o),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}function p(t,e,n){var o=n.css,r=n.sourceMap,i=void 0===e.convertToAbsoluteUrls&&r;(e.convertToAbsoluteUrls||i)&&(o=y(o)),r&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var a=new Blob([o],{type:"text/css"}),s=t.href;t.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}var m={},b=function(t){var e;return function(){return void 0===e&&(e=t.apply(this,arguments)),e}}(function(){return window&&document&&document.all&&!window.atob}),v=function(t){var e={};return function(n){return void 0===e[n]&&(e[n]=t.call(this,n)),e[n]}}(function(t){return document.querySelector(t)}),g=null,h=0,w=[],y=n(15);t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");e=e||{},e.attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||(e.singleton=b()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=r(t,e);return o(n,e),function(t){for(var i=[],a=0;a<n.length;a++){var s=n[a],c=m[s.id];c.refs--,i.push(c)}if(t){o(r(t,e),e)}for(var a=0;a<i.length;a++){var c=i[a];if(0===c.refs){for(var l=0;l<c.parts.length;l++)c.parts[l]();delete m[c.id]}}}};var x=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,o=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var r=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(r))return t;var i;return i=0===r.indexOf("//")?r:0===r.indexOf("/")?n+r:o+r.replace(/^\.\//,""),"url("+JSON.stringify(i)+")"})}},function(t,e,n){var o=n(17);"undefined"==typeof window||window.Promise||(window.Promise=o),n(21),String.prototype.includes||(String.prototype.includes=function(t,e){"use strict";return"number"!=typeof e&&(e=0),!(e+t.length>this.length)&&-1!==this.indexOf(t,e)}),Array.prototype.includes||Object.defineProperty(Array.prototype,"includes",{value:function(t,e){if(null==this)throw new TypeError('"this" is null or not defined');var n=Object(this),o=n.length>>>0;if(0===o)return!1;for(var r=0|e,i=Math.max(r>=0?r:o-Math.abs(r),0);i<o;){if(function(t,e){return t===e||"number"==typeof t&&"number"==typeof e&&isNaN(t)&&isNaN(e)}(n[i],t))return!0;i++}return!1}}),"undefined"!=typeof window&&function(t){t.forEach(function(t){t.hasOwnProperty("remove")||Object.defineProperty(t,"remove",{configurable:!0,enumerable:!0,writable:!0,value:function(){this.parentNode.removeChild(this)}})})}([Element.prototype,CharacterData.prototype,DocumentType.prototype])},function(t,e,n){(function(e){!function(n){function o(){}function r(t,e){return function(){t.apply(e,arguments)}}function i(t){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],f(t,this)}function a(t,e){for(;3===t._state;)t=t._value;if(0===t._state)return void t._deferreds.push(e);t._handled=!0,i._immediateFn(function(){var n=1===t._state?e.onFulfilled:e.onRejected;if(null===n)return void(1===t._state?s:c)(e.promise,t._value);var o;try{o=n(t._value)}catch(t){return void c(e.promise,t)}s(e.promise,o)})}function s(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if(e instanceof i)return t._state=3,t._value=e,void l(t);if("function"==typeof n)return void f(r(n,e),t)}t._state=1,t._value=e,l(t)}catch(e){c(t,e)}}function c(t,e){t._state=2,t._value=e,l(t)}function l(t){2===t._state&&0===t._deferreds.length&&i._immediateFn(function(){t._handled||i._unhandledRejectionFn(t._value)});for(var e=0,n=t._deferreds.length;e<n;e++)a(t,t._deferreds[e]);t._deferreds=null}function u(t,e,n){this.onFulfilled="function"==typeof t?t:null,this.onRejected="function"==typeof e?e:null,this.promise=n}function f(t,e){var n=!1;try{t(function(t){n||(n=!0,s(e,t))},function(t){n||(n=!0,c(e,t))})}catch(t){if(n)return;n=!0,c(e,t)}}var d=setTimeout;i.prototype.catch=function(t){return this.then(null,t)},i.prototype.then=function(t,e){var n=new this.constructor(o);return a(this,new u(t,e,n)),n},i.all=function(t){var e=Array.prototype.slice.call(t);return new i(function(t,n){function o(i,a){try{if(a&&("object"==typeof a||"function"==typeof a)){var s=a.then;if("function"==typeof s)return void s.call(a,function(t){o(i,t)},n)}e[i]=a,0==--r&&t(e)}catch(t){n(t)}}if(0===e.length)return t([]);for(var r=e.length,i=0;i<e.length;i++)o(i,e[i])})},i.resolve=function(t){return t&&"object"==typeof t&&t.constructor===i?t:new i(function(e){e(t)})},i.reject=function(t){return new i(function(e,n){n(t)})},i.race=function(t){return new i(function(e,n){for(var o=0,r=t.length;o<r;o++)t[o].then(e,n)})},i._immediateFn="function"==typeof e&&function(t){e(t)}||function(t){d(t,0)},i._unhandledRejectionFn=function(t){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",t)},i._setImmediateFn=function(t){i._immediateFn=t},i._setUnhandledRejectionFn=function(t){i._unhandledRejectionFn=t},void 0!==t&&t.exports?t.exports=i:n.Promise||(n.Promise=i)}(this)}).call(e,n(18).setImmediate)},function(t,e,n){function o(t,e){this._id=t,this._clearFn=e}var r=Function.prototype.apply;e.setTimeout=function(){return new o(r.call(setTimeout,window,arguments),clearTimeout)},e.setInterval=function(){return new o(r.call(setInterval,window,arguments),clearInterval)},e.clearTimeout=e.clearInterval=function(t){t&&t.close()},o.prototype.unref=o.prototype.ref=function(){},o.prototype.close=function(){this._clearFn.call(window,this._id)},e.enroll=function(t,e){clearTimeout(t._idleTimeoutId),t._idleTimeout=e},e.unenroll=function(t){clearTimeout(t._idleTimeoutId),t._idleTimeout=-1},e._unrefActive=e.active=function(t){clearTimeout(t._idleTimeoutId);var e=t._idleTimeout;e>=0&&(t._idleTimeoutId=setTimeout(function(){t._onTimeout&&t._onTimeout()},e))},n(19),e.setImmediate=setImmediate,e.clearImmediate=clearImmediate},function(t,e,n){(function(t,e){!function(t,n){"use strict";function o(t){"function"!=typeof t&&(t=new Function(""+t));for(var e=new Array(arguments.length-1),n=0;n<e.length;n++)e[n]=arguments[n+1];var o={callback:t,args:e};return l[c]=o,s(c),c++}function r(t){delete l[t]}function i(t){var e=t.callback,o=t.args;switch(o.length){case 0:e();break;case 1:e(o[0]);break;case 2:e(o[0],o[1]);break;case 3:e(o[0],o[1],o[2]);break;default:e.apply(n,o)}}function a(t){if(u)setTimeout(a,0,t);else{var e=l[t];if(e){u=!0;try{i(e)}finally{r(t),u=!1}}}}if(!t.setImmediate){var s,c=1,l={},u=!1,f=t.document,d=Object.getPrototypeOf&&Object.getPrototypeOf(t);d=d&&d.setTimeout?d:t,"[object process]"==={}.toString.call(t.process)?function(){s=function(t){e.nextTick(function(){a(t)})}}():function(){if(t.postMessage&&!t.importScripts){var e=!0,n=t.onmessage;return t.onmessage=function(){e=!1},t.postMessage("","*"),t.onmessage=n,e}}()?function(){var e="setImmediate$"+Math.random()+"$",n=function(n){n.source===t&&"string"==typeof n.data&&0===n.data.indexOf(e)&&a(+n.data.slice(e.length))};t.addEventListener?t.addEventListener("message",n,!1):t.attachEvent("onmessage",n),s=function(n){t.postMessage(e+n,"*")}}():t.MessageChannel?function(){var t=new MessageChannel;t.port1.onmessage=function(t){a(t.data)},s=function(e){t.port2.postMessage(e)}}():f&&"onreadystatechange"in f.createElement("script")?function(){var t=f.documentElement;s=function(e){var n=f.createElement("script");n.onreadystatechange=function(){a(e),n.onreadystatechange=null,t.removeChild(n),n=null},t.appendChild(n)}}():function(){s=function(t){setTimeout(a,0,t)}}(),d.setImmediate=o,d.clearImmediate=r}}("undefined"==typeof self?void 0===t?this:t:self)}).call(e,n(7),n(20))},function(t,e){function n(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function r(t){if(u===setTimeout)return setTimeout(t,0);if((u===n||!u)&&setTimeout)return u=setTimeout,setTimeout(t,0);try{return u(t,0)}catch(e){try{return u.call(null,t,0)}catch(e){return u.call(this,t,0)}}}function i(t){if(f===clearTimeout)return clearTimeout(t);if((f===o||!f)&&clearTimeout)return f=clearTimeout,clearTimeout(t);try{return f(t)}catch(e){try{return f.call(null,t)}catch(e){return f.call(this,t)}}}function a(){b&&p&&(b=!1,p.length?m=p.concat(m):v=-1,m.length&&s())}function s(){if(!b){var t=r(a);b=!0;for(var e=m.length;e;){for(p=m,m=[];++v<e;)p&&p[v].run();v=-1,e=m.length}p=null,b=!1,i(t)}}function c(t,e){this.fun=t,this.array=e}function l(){}var u,f,d=t.exports={};!function(){try{u="function"==typeof setTimeout?setTimeout:n}catch(t){u=n}try{f="function"==typeof clearTimeout?clearTimeout:o}catch(t){f=o}}();var p,m=[],b=!1,v=-1;d.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];m.push(new c(t,e)),1!==m.length||b||r(s)},c.prototype.run=function(){this.fun.apply(null,this.array)},d.title="browser",d.browser=!0,d.env={},d.argv=[],d.version="",d.versions={},d.on=l,d.addListener=l,d.once=l,d.off=l,d.removeListener=l,d.removeAllListeners=l,d.emit=l,d.prependListener=l,d.prependOnceListener=l,d.listeners=function(t){return[]},d.binding=function(t){throw new Error("process.binding is not supported")},d.cwd=function(){return"/"},d.chdir=function(t){throw new Error("process.chdir is not supported")},d.umask=function(){return 0}},function(t,e,n){"use strict";n(22).polyfill()},function(t,e,n){"use strict";function o(t,e){if(void 0===t||null===t)throw new TypeError("Cannot convert first argument to object");for(var n=Object(t),o=1;o<arguments.length;o++){var r=arguments[o];if(void 0!==r&&null!==r)for(var i=Object.keys(Object(r)),a=0,s=i.length;a<s;a++){var c=i[a],l=Object.getOwnPropertyDescriptor(r,c);void 0!==l&&l.enumerable&&(n[c]=r[c])}}return n}function r(){Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:o})}t.exports={assign:o,polyfill:r}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(24),r=n(6),i=n(5),a=n(36),s=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];if("undefined"!=typeof window){var n=a.getOpts.apply(void 0,t);return new Promise(function(t,e){i.default.promise={resolve:t,reject:e},o.default(n),setTimeout(function(){r.openModal()})})}};s.close=r.onAction,s.getState=r.getState,s.setActionValue=i.setActionValue,s.stopLoading=r.stopLoading,s.setDefaults=a.setDefaults,e.default=s},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(0),i=r.default.MODAL,a=n(4),s=n(34),c=n(35),l=n(1);e.init=function(t){o.getNode(i)||(document.body||l.throwErr("You can only use SweetAlert AFTER the DOM has loaded!"),s.default(),a.default()),a.initModalContent(t),c.default(t)},e.default=e.init},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.MODAL;e.modalMarkup='\n  <div class="'+r+'" role="dialog" aria-modal="true"></div>',e.default=e.modalMarkup},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.OVERLAY,i='<div \n    class="'+r+'"\n    tabIndex="-1">\n  </div>';e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.ICON;e.errorIconMarkup=function(){var t=r+"--error",e=t+"__line";return'\n    <div class="'+t+'__x-mark">\n      <span class="'+e+" "+e+'--left"></span>\n      <span class="'+e+" "+e+'--right"></span>\n    </div>\n  '},e.warningIconMarkup=function(){var t=r+"--warning";return'\n    <span class="'+t+'__body">\n      <span class="'+t+'__dot"></span>\n    </span>\n  '},e.successIconMarkup=function(){var t=r+"--success";return'\n    <span class="'+t+"__line "+t+'__line--long"></span>\n    <span class="'+t+"__line "+t+'__line--tip"></span>\n\n    <div class="'+t+'__ring"></div>\n    <div class="'+t+'__hide-corners"></div>\n  '}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.CONTENT;e.contentMarkup='\n  <div class="'+r+'">\n\n  </div>\n'},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.BUTTON_CONTAINER,i=o.default.BUTTON,a=o.default.BUTTON_LOADER;e.buttonMarkup='\n  <div class="'+r+'">\n\n    <button\n      class="'+i+'"\n    ></button>\n\n    <div class="'+a+'">\n      <div></div>\n      <div></div>\n      <div></div>\n    </div>\n\n  </div>\n'},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(4),r=n(2),i=n(0),a=i.default.ICON,s=i.default.ICON_CUSTOM,c=["error","warning","success","info"],l={error:r.errorIconMarkup(),warning:r.warningIconMarkup(),success:r.successIconMarkup()},u=function(t,e){var n=a+"--"+t;e.classList.add(n);var o=l[t];o&&(e.innerHTML=o)},f=function(t,e){e.classList.add(s);var n=document.createElement("img");n.src=t,e.appendChild(n)},d=function(t){if(t){var e=o.injectElIntoModal(r.iconMarkup);c.includes(t)?u(t,e):f(t,e)}};e.default=d},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),r=n(4),i=function(t){navigator.userAgent.includes("AppleWebKit")&&(t.style.display="none",t.offsetHeight,t.style.display="")};e.initTitle=function(t){if(t){var e=r.injectElIntoModal(o.titleMarkup);e.textContent=t,i(e)}},e.initText=function(t){if(t){var e=document.createDocumentFragment();t.split("\n").forEach(function(t,n,o){e.appendChild(document.createTextNode(t)),n<o.length-1&&e.appendChild(document.createElement("br"))});var n=r.injectElIntoModal(o.textMarkup);n.appendChild(e),i(n)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(4),i=n(0),a=i.default.BUTTON,s=i.default.DANGER_BUTTON,c=n(3),l=n(2),u=n(6),f=n(5),d=function(t,e,n){var r=e.text,i=e.value,d=e.className,p=e.closeModal,m=o.stringToNode(l.buttonMarkup),b=m.querySelector("."+a),v=a+"--"+t;if(b.classList.add(v),d){(Array.isArray(d)?d:d.split(" ")).filter(function(t){return t.length>0}).forEach(function(t){b.classList.add(t)})}n&&t===c.CONFIRM_KEY&&b.classList.add(s),b.textContent=r;var g={};return g[t]=i,f.setActionValue(g),f.setActionOptionsFor(t,{closeModal:p}),b.addEventListener("click",function(){return u.onAction(t)}),m},p=function(t,e){var n=r.injectElIntoModal(l.footerMarkup);for(var o in t){var i=t[o],a=d(o,i,e);i.visible&&n.appendChild(a)}0===n.children.length&&n.remove()};e.default=p},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(3),r=n(4),i=n(2),a=n(5),s=n(6),c=n(0),l=c.default.CONTENT,u=function(t){t.addEventListener("input",function(t){var e=t.target,n=e.value;a.setActionValue(n)}),t.addEventListener("keyup",function(t){if("Enter"===t.key)return s.onAction(o.CONFIRM_KEY)}),setTimeout(function(){t.focus(),a.setActionValue("")},0)},f=function(t,e,n){var o=document.createElement(e),r=l+"__"+e;o.classList.add(r);for(var i in n){var a=n[i];o[i]=a}"input"===e&&u(o),t.appendChild(o)},d=function(t){if(t){var e=r.injectElIntoModal(i.contentMarkup),n=t.element,o=t.attributes;"string"==typeof n?f(e,n,o):e.appendChild(n)}};e.default=d},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(2),i=function(){var t=o.stringToNode(r.overlayMarkup);document.body.appendChild(t)};e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(5),r=n(6),i=n(1),a=n(3),s=n(0),c=s.default.MODAL,l=s.default.BUTTON,u=s.default.OVERLAY,f=function(t){t.preventDefault(),v()},d=function(t){t.preventDefault(),g()},p=function(t){if(o.default.isOpen)switch(t.key){case"Escape":return r.onAction(a.CANCEL_KEY)}},m=function(t){if(o.default.isOpen)switch(t.key){case"Tab":return f(t)}},b=function(t){if(o.default.isOpen)return"Tab"===t.key&&t.shiftKey?d(t):void 0},v=function(){var t=i.getNode(l);t&&(t.tabIndex=0,t.focus())},g=function(){var t=i.getNode(c),e=t.querySelectorAll("."+l),n=e.length-1,o=e[n];o&&o.focus()},h=function(t){t[t.length-1].addEventListener("keydown",m)},w=function(t){t[0].addEventListener("keydown",b)},y=function(){var t=i.getNode(c),e=t.querySelectorAll("."+l);e.length&&(h(e),w(e))},x=function(t){if(i.getNode(u)===t.target)return r.onAction(a.CANCEL_KEY)},_=function(t){var e=i.getNode(u);e.removeEventListener("click",x),t&&e.addEventListener("click",x)},k=function(t){o.default.timer&&clearTimeout(o.default.timer),t&&(o.default.timer=window.setTimeout(function(){return r.onAction(a.CANCEL_KEY)},t))},O=function(t){t.closeOnEsc?document.addEventListener("keyup",p):document.removeEventListener("keyup",p),t.dangerMode?v():g(),y(),_(t.closeOnClickOutside),k(t.timer)};e.default=O},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(3),i=n(37),a=n(38),s={title:null,text:null,icon:null,buttons:r.defaultButtonList,content:null,className:null,closeOnClickOutside:!0,closeOnEsc:!0,dangerMode:!1,timer:null},c=Object.assign({},s);e.setDefaults=function(t){c=Object.assign({},s,t)};var l=function(t){var e=t&&t.button,n=t&&t.buttons;return void 0!==e&&void 0!==n&&o.throwErr("Cannot set both 'button' and 'buttons' options!"),void 0!==e?{confirm:e}:n},u=function(t){return o.ordinalSuffixOf(t+1)},f=function(t,e){o.throwErr(u(e)+" argument ('"+t+"') is invalid")},d=function(t,e){var n=t+1,r=e[n];o.isPlainObject(r)||void 0===r||o.throwErr("Expected "+u(n)+" argument ('"+r+"') to be a plain object")},p=function(t,e){var n=t+1,r=e[n];void 0!==r&&o.throwErr("Unexpected "+u(n)+" argument ("+r+")")},m=function(t,e,n,r){var i=typeof e,a="string"===i,s=e instanceof Element;if(a){if(0===n)return{text:e};if(1===n)return{text:e,title:r[0]};if(2===n)return d(n,r),{icon:e};f(e,n)}else{if(s&&0===n)return d(n,r),{content:e};if(o.isPlainObject(e))return p(n,r),e;f(e,n)}};e.getOpts=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n={};t.forEach(function(e,o){var r=m(0,e,o,t);Object.assign(n,r)});var o=l(n);n.buttons=r.getButtonListOpts(o),delete n.button,n.content=i.getContentOpts(n.content);var u=Object.assign({},s,c,n);return Object.keys(u).forEach(function(t){a.DEPRECATED_OPTS[t]&&a.logDeprecation(t)}),u}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r={element:"input",attributes:{placeholder:""}};e.getContentOpts=function(t){var e={};return o.isPlainObject(t)?Object.assign(e,t):t instanceof Element?{element:t}:"input"===t?r:null}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.logDeprecation=function(t){var n=e.DEPRECATED_OPTS[t],o=n.onlyRename,r=n.replacement,i=n.subOption,a=n.link,s=o?"renamed":"deprecated",c='SweetAlert warning: "'+t+'" option has been '+s+".";if(r){c+=" Please use"+(i?' "'+i+'" in ':" ")+'"'+r+'" instead.'}var l="https://sweetalert.js.org";c+=a?" More details: "+l+a:" More details: "+l+"/guides/#upgrading-from-1x",console.warn(c)},e.DEPRECATED_OPTS={type:{replacement:"icon",link:"/docs/#icon"},imageUrl:{replacement:"icon",link:"/docs/#icon"},customClass:{replacement:"className",onlyRename:!0,link:"/docs/#classname"},imageSize:{},showCancelButton:{replacement:"buttons",link:"/docs/#buttons"},showConfirmButton:{replacement:"button",link:"/docs/#button"},confirmButtonText:{replacement:"button",link:"/docs/#button"},confirmButtonColor:{},cancelButtonText:{replacement:"buttons",link:"/docs/#buttons"},closeOnConfirm:{replacement:"button",subOption:"closeModal",link:"/docs/#button"},closeOnCancel:{replacement:"buttons",subOption:"closeModal",link:"/docs/#buttons"},showLoaderOnConfirm:{replacement:"buttons"},animation:{},inputType:{replacement:"content",link:"/docs/#content"},inputValue:{replacement:"content",link:"/docs/#content"},inputPlaceholder:{replacement:"content",link:"/docs/#content"},html:{replacement:"content",link:"/docs/#content"},allowEscapeKey:{replacement:"closeOnEsc",onlyRename:!0,link:"/docs/#closeonesc"},allowClickOutside:{replacement:"closeOnClickOutside",onlyRename:!0,link:"/docs/#closeonclickoutside"}}}])});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate, __webpack_require__(/*! ./../../node_modules/timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").clearImmediate))

/***/ })

/******/ });
//# sourceMappingURL=pqscheduler.js.map