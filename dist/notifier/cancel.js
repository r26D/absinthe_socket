import 'core-js/modules/es.symbol';
import 'core-js/modules/es.array.concat';
import 'core-js/modules/es.array.filter';
import 'core-js/modules/es.array.for-each';
import 'core-js/modules/es.function.bind';
import 'core-js/modules/es.object.define-properties';
import 'core-js/modules/es.object.define-property';
import 'core-js/modules/es.object.get-own-property-descriptor';
import 'core-js/modules/es.object.get-own-property-descriptors';
import 'core-js/modules/es.object.keys';
import 'core-js/modules/web.dom-collections.for-each';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import _newArrowCheck from '@babel/runtime/helpers/newArrowCheck';

var _this = undefined;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var cancel = function cancel(_ref) {
  _newArrowCheck(this, _this);

  var activeObservers = _ref.activeObservers,
      canceledObservers = _ref.canceledObservers,
      rest = _objectWithoutProperties(_ref, ["activeObservers", "canceledObservers"]);

  return _objectSpread(_objectSpread({}, rest), {}, {
    isActive: false,
    activeObservers: [],
    canceledObservers: [].concat(_toConsumableArray(activeObservers), _toConsumableArray(canceledObservers))
  });
}.bind(undefined);

export default cancel;
//# sourceMappingURL=cancel.js.map
