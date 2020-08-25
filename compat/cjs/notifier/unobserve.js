'use strict';

require('core-js/modules/es.symbol');
require('core-js/modules/es.array.filter');
require('core-js/modules/es.array.for-each');
require('core-js/modules/es.array.index-of');
require('core-js/modules/es.function.bind');
require('core-js/modules/es.object.define-properties');
require('core-js/modules/es.object.define-property');
require('core-js/modules/es.object.get-own-property-descriptor');
require('core-js/modules/es.object.get-own-property-descriptors');
require('core-js/modules/es.object.keys');
require('core-js/modules/web.dom-collections.for-each');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var _newArrowCheck = require('@babel/runtime/helpers/newArrowCheck');
var utilsArray = require('@jumpn/utils-array');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);
var _newArrowCheck__default = /*#__PURE__*/_interopDefaultLegacy(_newArrowCheck);

var _this = undefined;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty__default['default'](target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var removeObserver = function removeObserver(observers, observer) {
  _newArrowCheck__default['default'](this, _this);

  return utilsArray.remove(observers.indexOf(observer), 1, observers);
}.bind(undefined);

var unobserve = function unobserve(_ref, observer) {
  _newArrowCheck__default['default'](this, _this);

  var activeObservers = _ref.activeObservers,
      rest = _objectWithoutProperties__default['default'](_ref, ["activeObservers"]);

  return _objectSpread(_objectSpread({}, rest), {}, {
    activeObservers: removeObserver(activeObservers, observer)
  });
}.bind(undefined);

module.exports = unobserve;
//# sourceMappingURL=unobserve.js.map
