'use strict';

require('core-js/modules/es.array.concat');
require('core-js/modules/es.function.bind');
var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _newArrowCheck = require('@babel/runtime/helpers/newArrowCheck');
require('core-js/modules/es.array.for-each');
require('core-js/modules/es.function.name');
require('core-js/modules/web.dom-collections.for-each');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _newArrowCheck__default = /*#__PURE__*/_interopDefaultLegacy(_newArrowCheck);

var _this = undefined;

var getNotifier = function getNotifier(handlerName, payload) {
  var _this2 = this;

  _newArrowCheck__default['default'](this, _this);

  return function (observer) {
    _newArrowCheck__default['default'](this, _this2);

    return observer[handlerName] && observer[handlerName](payload);
  }.bind(this);
}.bind(undefined);

var getHandlerName = function getHandlerName(_ref) {
  _newArrowCheck__default['default'](this, _this);

  var name = _ref.name;
  return "on".concat(name);
}.bind(undefined);

var notifyAll = function notifyAll(observers, event) {
  _newArrowCheck__default['default'](this, _this);

  return observers.forEach(getNotifier(getHandlerName(event), event.payload));
}.bind(undefined);

var _this$1 = undefined;

var getObservers = function getObservers(_ref) {
  _newArrowCheck__default['default'](this, _this$1);

  var activeObservers = _ref.activeObservers,
      canceledObservers = _ref.canceledObservers;
  return [].concat(_toConsumableArray__default['default'](activeObservers), _toConsumableArray__default['default'](canceledObservers));
}.bind(undefined);

var notify = function notify(notifier, event) {
  _newArrowCheck__default['default'](this, _this$1);

  notifyAll(getObservers(notifier), event);
  return notifier;
}.bind(undefined);

module.exports = notify;
//# sourceMappingURL=notify.js.map
