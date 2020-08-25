'use strict';

require('core-js/modules/es.symbol');
require('core-js/modules/es.array.filter');
require('core-js/modules/es.array.for-each');
require('core-js/modules/es.function.bind');
require('core-js/modules/es.object.define-properties');
require('core-js/modules/es.object.define-property');
require('core-js/modules/es.object.get-own-property-descriptor');
require('core-js/modules/es.object.get-own-property-descriptors');
require('core-js/modules/es.object.keys');
require('core-js/modules/web.dom-collections.for-each');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _newArrowCheck = require('@babel/runtime/helpers/newArrowCheck');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _newArrowCheck__default = /*#__PURE__*/_interopDefaultLegacy(_newArrowCheck);

var _this = undefined;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty__default['default'](target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var reactivate = function reactivate(notifier) {
  _newArrowCheck__default['default'](this, _this);

  return notifier.isActive ? notifier : _objectSpread(_objectSpread({}, notifier), {}, {
    isActive: true
  });
}.bind(undefined);

module.exports = reactivate;
//# sourceMappingURL=reactivate.js.map
