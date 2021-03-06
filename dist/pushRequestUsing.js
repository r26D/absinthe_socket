import 'core-js/modules/es.symbol';
import 'core-js/modules/es.array.filter';
import 'core-js/modules/es.array.for-each';
import 'core-js/modules/es.function.bind';
import 'core-js/modules/es.object.define-properties';
import 'core-js/modules/es.object.define-property';
import 'core-js/modules/es.object.get-own-property-descriptor';
import 'core-js/modules/es.object.get-own-property-descriptors';
import 'core-js/modules/es.object.keys';
import 'core-js/modules/web.dom-collections.for-each';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _newArrowCheck from '@babel/runtime/helpers/newArrowCheck';
import { requestToCompat } from '@jumpn/utils-graphql';
import 'core-js/modules/es.array.concat';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import 'core-js/modules/es.function.name';
import { remove as remove$1, replace } from '@jumpn/utils-array';
import 'core-js/modules/es.array.find-index';
import { hasIn, map } from '@jumpn/utils-composite';
import 'phoenix';
import 'core-js/modules/es.array.find';

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

var _this$2 = undefined;

var findIndex = function findIndex(notifiers, key, value) {
  _newArrowCheck(this, _this$2);

  return (// $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
    notifiers.findIndex(hasIn([key], value))
  );
}.bind(undefined);

var _this$3 = undefined;

var remove = function remove(notifier) {
  var _this2 = this;

  _newArrowCheck(this, _this$3);

  return function (notifiers) {
    _newArrowCheck(this, _this2);

    return remove$1(findIndex(notifiers, "request", notifier.request), 1, notifiers);
  }.bind(this);
}.bind(undefined);

var _this$4 = undefined;

var updateNotifiers = function updateNotifiers(absintheSocket, updater) {
  _newArrowCheck(this, _this$4);

  absintheSocket.notifiers = updater(absintheSocket.notifiers);
  return absintheSocket;
}.bind(undefined);

var eventNames = {
  abort: "Abort",
  cancel: "Cancel",
  error: "Error",
  result: "Result",
  start: "Start"
};

var _this$5 = undefined;

var createStartEvent = function createStartEvent(payload) {
  _newArrowCheck(this, _this$5);

  return {
    payload: payload,
    name: eventNames.start
  };
}.bind(undefined);

var createResultEvent = function createResultEvent(payload) {
  _newArrowCheck(this, _this$5);

  return {
    payload: payload,
    name: eventNames.result
  };
}.bind(undefined);

var createErrorEvent = function createErrorEvent(payload) {
  _newArrowCheck(this, _this$5);

  return {
    payload: payload,
    name: eventNames.error
  };
}.bind(undefined);

var createCancelEvent = function createCancelEvent() {
  _newArrowCheck(this, _this$5);

  return {
    name: eventNames.cancel,
    payload: undefined
  };
}.bind(undefined);

var createAbortEvent = function createAbortEvent(payload) {
  _newArrowCheck(this, _this$5);

  return {
    payload: payload,
    name: eventNames.abort
  };
}.bind(undefined);

var _this$6 = undefined;

var abortNotifier = function abortNotifier(absintheSocket, notifier, error) {
  _newArrowCheck(this, _this$6);

  return updateNotifiers(absintheSocket, remove(notify(notifier, createAbortEvent(error))));
}.bind(undefined);

var _this$7 = undefined;

var notifyActive = function notifyActive(notifier, event) {
  _newArrowCheck(this, _this$7);

  notifyAll(notifier.activeObservers, event);
  return notifier;
}.bind(undefined);

var _this$8 = undefined;

var handlePush = function handlePush(push, handler) {
  _newArrowCheck(this, _this$8);

  return push.receive("ok", handler.onSucceed).receive("error", handler.onError).receive("timeout", handler.onTimeout);
}.bind(undefined);

var _this$9 = undefined;

var find = function find(notifiers, key, value) {
  _newArrowCheck(this, _this$9);

  return (// $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
    notifiers.find(hasIn([key], value))
  );
}.bind(undefined);

var _this$a = undefined;

var getPushHandlerMethodGetter = function getPushHandlerMethodGetter(absintheSocket, request) {
  var _this2 = this;

  _newArrowCheck(this, _this$a);

  return function (handle) {
    _newArrowCheck(this, _this2);

    return function () {
      var notifier = find(absintheSocket.notifiers, "request", request);

      if (notifier) {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        handle.apply(void 0, [absintheSocket, notifier].concat(args));
      }
    };
  }.bind(this);
}.bind(undefined);

var getPushHandler = function getPushHandler(absintheSocket, request, notifierPushHandler) {
  _newArrowCheck(this, _this$a);

  return map(getPushHandlerMethodGetter(absintheSocket, request), notifierPushHandler);
}.bind(undefined);

var pushAbsintheEvent = function pushAbsintheEvent(absintheSocket, request, notifierPushHandler, absintheEvent) {
  _newArrowCheck(this, _this$a);

  handlePush(absintheSocket.channel.push(absintheEvent.name, absintheEvent.payload), getPushHandler(absintheSocket, request, notifierPushHandler));
  return absintheSocket;
}.bind(undefined);

var _this$b = undefined;

var refresh = function refresh(notifier) {
  var _this2 = this;

  _newArrowCheck(this, _this$b);

  return function (notifiers) {
    _newArrowCheck(this, _this2);

    return replace(findIndex(notifiers, "request", notifier.request), [notifier], notifiers);
  }.bind(this);
}.bind(undefined);

var _this$c = undefined;

var refreshNotifier = function refreshNotifier(absintheSocket, notifier) {
  _newArrowCheck(this, _this$c);

  updateNotifiers(absintheSocket, refresh(notifier));
  return notifier;
}.bind(undefined);

var requestStatuses = {
  canceled: "canceled",
  canceling: "canceling",
  pending: "pending",
  sent: "sent",
  sending: "sending"
};

var absintheEventNames = {
  doc: "doc",
  unsubscribe: "unsubscribe"
};

var _this$d = undefined;

var createAbsintheUnsubscribeEvent = function createAbsintheUnsubscribeEvent(payload) {
  _newArrowCheck(this, _this$d);

  return {
    payload: payload,
    name: absintheEventNames.unsubscribe
  };
}.bind(undefined);

var createAbsintheDocEvent = function createAbsintheDocEvent(payload) {
  _newArrowCheck(this, _this$d);

  return {
    payload: payload,
    name: absintheEventNames.doc
  };
}.bind(undefined);

var _this$e = undefined;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var pushAbsintheDocEvent = function pushAbsintheDocEvent(absintheSocket, _ref, notifierPushHandler) {
  _newArrowCheck(this, _this$e);

  var request = _ref.request;
  return pushAbsintheEvent(absintheSocket, request, notifierPushHandler, createAbsintheDocEvent(requestToCompat(request)));
}.bind(undefined);

var setNotifierRequestStatusSending = function setNotifierRequestStatusSending(absintheSocket, notifier) {
  _newArrowCheck(this, _this$e);

  return refreshNotifier(absintheSocket, _objectSpread(_objectSpread({}, notifier), {}, {
    requestStatus: requestStatuses.sending
  }));
}.bind(undefined);

var createRequestError = function createRequestError(message) {
  _newArrowCheck(this, _this$e);

  return new Error("request: ".concat(message));
}.bind(undefined);

var onTimeout = function onTimeout(absintheSocket, notifier) {
  _newArrowCheck(this, _this$e);

  return notifyActive(notifier, createErrorEvent(createRequestError("timeout")));
}.bind(undefined);

var onError = function onError(absintheSocket, notifier, errorMessage) {
  _newArrowCheck(this, _this$e);

  return abortNotifier(absintheSocket, notifier, createRequestError(errorMessage));
}.bind(undefined);

var getNotifierPushHandler = function getNotifierPushHandler(onSucceed) {
  _newArrowCheck(this, _this$e);

  return {
    onError: onError,
    onSucceed: onSucceed,
    onTimeout: onTimeout
  };
}.bind(undefined);

var pushRequestUsing = function pushRequestUsing(absintheSocket, notifier, onSucceed) {
  _newArrowCheck(this, _this$e);

  return pushAbsintheDocEvent(absintheSocket, setNotifierRequestStatusSending(absintheSocket, notifier), getNotifierPushHandler(onSucceed));
}.bind(undefined);

export default pushRequestUsing;
export { onError };
//# sourceMappingURL=pushRequestUsing.js.map
