import 'core-js/modules/es.array.concat';
import 'core-js/modules/es.function.bind';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _newArrowCheck from '@babel/runtime/helpers/newArrowCheck';
import 'core-js/modules/es.array.for-each';
import 'core-js/modules/es.function.name';
import 'core-js/modules/web.dom-collections.for-each';

var _this = undefined;

var getNotifier = function getNotifier(handlerName, payload) {
  var _this2 = this;

  _newArrowCheck(this, _this);

  return function (observer) {
    _newArrowCheck(this, _this2);

    return observer[handlerName] && observer[handlerName](payload);
  }.bind(this);
}.bind(undefined);

var getHandlerName = function getHandlerName(_ref) {
  _newArrowCheck(this, _this);

  var name = _ref.name;
  return "on".concat(name);
}.bind(undefined);

var notifyAll = function notifyAll(observers, event) {
  _newArrowCheck(this, _this);

  return observers.forEach(getNotifier(getHandlerName(event), event.payload));
}.bind(undefined);

var _this$1 = undefined;

var getObservers = function getObservers(_ref) {
  _newArrowCheck(this, _this$1);

  var activeObservers = _ref.activeObservers,
      canceledObservers = _ref.canceledObservers;
  return [].concat(_toConsumableArray(activeObservers), _toConsumableArray(canceledObservers));
}.bind(undefined);

var notify = function notify(notifier, event) {
  _newArrowCheck(this, _this$1);

  notifyAll(getObservers(notifier), event);
  return notifier;
}.bind(undefined);

export default notify;
//# sourceMappingURL=notify.js.map
