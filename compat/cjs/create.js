'use strict';

require('core-js/modules/es.array.for-each');
require('core-js/modules/es.function.bind');
require('core-js/modules/web.dom-collections.for-each');
var _newArrowCheck = require('@babel/runtime/helpers/newArrowCheck');
require('phoenix');
require('core-js/modules/es.array.concat');
var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
require('core-js/modules/es.function.name');
var utilsArray = require('@jumpn/utils-array');
require('core-js/modules/es.array.find-index');
var utilsComposite = require('@jumpn/utils-composite');
require('core-js/modules/es.array.join');
require('core-js/modules/es.symbol');
require('core-js/modules/es.array.filter');
require('core-js/modules/es.object.define-properties');
require('core-js/modules/es.object.define-property');
require('core-js/modules/es.object.get-own-property-descriptor');
require('core-js/modules/es.object.get-own-property-descriptors');
require('core-js/modules/es.object.keys');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var utilsGraphql = require('@jumpn/utils-graphql');
require('core-js/modules/es.array.find');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _newArrowCheck__default = /*#__PURE__*/_interopDefaultLegacy(_newArrowCheck);
var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

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

var _this$2 = undefined;

var findIndex = function findIndex(notifiers, key, value) {
  _newArrowCheck__default['default'](this, _this$2);

  return (// $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
    notifiers.findIndex(utilsComposite.hasIn([key], value))
  );
}.bind(undefined);

var _this$3 = undefined;

var remove = function remove(notifier) {
  var _this2 = this;

  _newArrowCheck__default['default'](this, _this$3);

  return function (notifiers) {
    _newArrowCheck__default['default'](this, _this2);

    return utilsArray.remove(findIndex(notifiers, "request", notifier.request), 1, notifiers);
  }.bind(this);
}.bind(undefined);

var _this$4 = undefined;

var updateNotifiers = function updateNotifiers(absintheSocket, updater) {
  _newArrowCheck__default['default'](this, _this$4);

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
  _newArrowCheck__default['default'](this, _this$5);

  return {
    payload: payload,
    name: eventNames.start
  };
}.bind(undefined);

var createResultEvent = function createResultEvent(payload) {
  _newArrowCheck__default['default'](this, _this$5);

  return {
    payload: payload,
    name: eventNames.result
  };
}.bind(undefined);

var createErrorEvent = function createErrorEvent(payload) {
  _newArrowCheck__default['default'](this, _this$5);

  return {
    payload: payload,
    name: eventNames.error
  };
}.bind(undefined);

var createCancelEvent = function createCancelEvent() {
  _newArrowCheck__default['default'](this, _this$5);

  return {
    name: eventNames.cancel,
    payload: undefined
  };
}.bind(undefined);

var createAbortEvent = function createAbortEvent(payload) {
  _newArrowCheck__default['default'](this, _this$5);

  return {
    payload: payload,
    name: eventNames.abort
  };
}.bind(undefined);

var _this$6 = undefined;

var abortNotifier = function abortNotifier(absintheSocket, notifier, error) {
  _newArrowCheck__default['default'](this, _this$6);

  return updateNotifiers(absintheSocket, remove(notify(notifier, createAbortEvent(error))));
}.bind(undefined);

var _this$7 = undefined;

var handlePush = function handlePush(push, handler) {
  _newArrowCheck__default['default'](this, _this$7);

  return push.receive("ok", handler.onSucceed).receive("error", handler.onError).receive("timeout", handler.onTimeout);
}.bind(undefined);

var _this$8 = undefined;

var notifyActive = function notifyActive(notifier, event) {
  _newArrowCheck__default['default'](this, _this$8);

  notifyAll(notifier.activeObservers, event);
  return notifier;
}.bind(undefined);

var _this$9 = undefined;

var notifyResultEvent = function notifyResultEvent(notifier, result) {
  _newArrowCheck__default['default'](this, _this$9);

  return notifyActive(notifier, createResultEvent(result));
}.bind(undefined);

var _this$a = undefined;

var notifyStartEvent = function notifyStartEvent(notifier) {
  _newArrowCheck__default['default'](this, _this$a);

  return notifyActive(notifier, createStartEvent(notifier));
}.bind(undefined);

var _this$b = undefined;

var find = function find(notifiers, key, value) {
  _newArrowCheck__default['default'](this, _this$b);

  return (// $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
    notifiers.find(utilsComposite.hasIn([key], value))
  );
}.bind(undefined);

var _this$c = undefined;

var getPushHandlerMethodGetter = function getPushHandlerMethodGetter(absintheSocket, request) {
  var _this2 = this;

  _newArrowCheck__default['default'](this, _this$c);

  return function (handle) {
    _newArrowCheck__default['default'](this, _this2);

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
  _newArrowCheck__default['default'](this, _this$c);

  return utilsComposite.map(getPushHandlerMethodGetter(absintheSocket, request), notifierPushHandler);
}.bind(undefined);

var pushAbsintheEvent = function pushAbsintheEvent(absintheSocket, request, notifierPushHandler, absintheEvent) {
  _newArrowCheck__default['default'](this, _this$c);

  handlePush(absintheSocket.channel.push(absintheEvent.name, absintheEvent.payload), getPushHandler(absintheSocket, request, notifierPushHandler));
  return absintheSocket;
}.bind(undefined);

var _this$d = undefined;

var refresh = function refresh(notifier) {
  var _this2 = this;

  _newArrowCheck__default['default'](this, _this$d);

  return function (notifiers) {
    _newArrowCheck__default['default'](this, _this2);

    return utilsArray.replace(findIndex(notifiers, "request", notifier.request), [notifier], notifiers);
  }.bind(this);
}.bind(undefined);

var _this$e = undefined;

var refreshNotifier = function refreshNotifier(absintheSocket, notifier) {
  _newArrowCheck__default['default'](this, _this$e);

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

var _this$f = undefined;

var createAbsintheUnsubscribeEvent = function createAbsintheUnsubscribeEvent(payload) {
  _newArrowCheck__default['default'](this, _this$f);

  return {
    payload: payload,
    name: absintheEventNames.unsubscribe
  };
}.bind(undefined);

var createAbsintheDocEvent = function createAbsintheDocEvent(payload) {
  _newArrowCheck__default['default'](this, _this$f);

  return {
    payload: payload,
    name: absintheEventNames.doc
  };
}.bind(undefined);

var _this$g = undefined;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty__default['default'](target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var pushAbsintheDocEvent = function pushAbsintheDocEvent(absintheSocket, _ref, notifierPushHandler) {
  _newArrowCheck__default['default'](this, _this$g);

  var request = _ref.request;
  return pushAbsintheEvent(absintheSocket, request, notifierPushHandler, createAbsintheDocEvent(utilsGraphql.requestToCompat(request)));
}.bind(undefined);

var setNotifierRequestStatusSending = function setNotifierRequestStatusSending(absintheSocket, notifier) {
  _newArrowCheck__default['default'](this, _this$g);

  return refreshNotifier(absintheSocket, _objectSpread(_objectSpread({}, notifier), {}, {
    requestStatus: requestStatuses.sending
  }));
}.bind(undefined);

var createRequestError = function createRequestError(message) {
  _newArrowCheck__default['default'](this, _this$g);

  return new Error("request: ".concat(message));
}.bind(undefined);

var onTimeout = function onTimeout(absintheSocket, notifier) {
  _newArrowCheck__default['default'](this, _this$g);

  return notifyActive(notifier, createErrorEvent(createRequestError("timeout")));
}.bind(undefined);

var onError = function onError(absintheSocket, notifier, errorMessage) {
  _newArrowCheck__default['default'](this, _this$g);

  return abortNotifier(absintheSocket, notifier, createRequestError(errorMessage));
}.bind(undefined);

var getNotifierPushHandler = function getNotifierPushHandler(onSucceed) {
  _newArrowCheck__default['default'](this, _this$g);

  return {
    onError: onError,
    onSucceed: onSucceed,
    onTimeout: onTimeout
  };
}.bind(undefined);

var pushRequestUsing = function pushRequestUsing(absintheSocket, notifier, onSucceed) {
  _newArrowCheck__default['default'](this, _this$g);

  return pushAbsintheDocEvent(absintheSocket, setNotifierRequestStatusSending(absintheSocket, notifier), getNotifierPushHandler(onSucceed));
}.bind(undefined);

var _this$h = undefined;

var notifyCanceled = function notifyCanceled(notifier, event) {
  _newArrowCheck__default['default'](this, _this$h);

  notifyAll(notifier.canceledObservers, event);
  return notifier;
}.bind(undefined);

var _this$i = undefined;

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty__default['default'](target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var clearCanceled = function clearCanceled(notifier) {
  _newArrowCheck__default['default'](this, _this$i);

  return _objectSpread$1(_objectSpread$1({}, notifier), {}, {
    canceledObservers: []
  });
}.bind(undefined);

var flushCanceled = function flushCanceled(notifier) {
  _newArrowCheck__default['default'](this, _this$i);

  return notifier.canceledObservers.length > 0 ? clearCanceled(notifyCanceled(notifier, createCancelEvent())) : notifier;
}.bind(undefined);

var _this$j = undefined;

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty__default['default'](target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var reset = function reset(notifier) {
  _newArrowCheck__default['default'](this, _this$j);

  return flushCanceled(_objectSpread$2(_objectSpread$2({}, notifier), {}, {
    isActive: true,
    requestStatus: requestStatuses.pending,
    subscriptionId: undefined
  }));
}.bind(undefined);

var _this$k = undefined;

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { _defineProperty__default['default'](target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var onUnsubscribeSucceedCanceled = function onUnsubscribeSucceedCanceled(absintheSocket, notifier) {
  _newArrowCheck__default['default'](this, _this$k);

  return updateNotifiers(absintheSocket, remove(flushCanceled(notifier)));
}.bind(undefined);

var onUnsubscribeSucceedActive = function onUnsubscribeSucceedActive(absintheSocket, notifier) {
  _newArrowCheck__default['default'](this, _this$k);

  return subscribe(absintheSocket, refreshNotifier(absintheSocket, reset(notifier)));
}.bind(undefined);

var createUnsubscribeError = function createUnsubscribeError(message) {
  _newArrowCheck__default['default'](this, _this$k);

  return new Error("unsubscribe: ".concat(message));
}.bind(undefined);

var unsubscribeHandler = {
  onError: function onError(absintheSocket, notifier, errorMessage) {
    _newArrowCheck__default['default'](this, _this$k);

    return abortNotifier(absintheSocket, notifier, createUnsubscribeError(errorMessage));
  }.bind(undefined),
  onTimeout: function onTimeout(absintheSocket, notifier) {
    _newArrowCheck__default['default'](this, _this$k);

    return notifyCanceled(notifier, createErrorEvent(createUnsubscribeError("timeout")));
  }.bind(undefined),
  onSucceed: function onSucceed(absintheSocket, notifier) {
    _newArrowCheck__default['default'](this, _this$k);

    if (notifier.isActive) {
      onUnsubscribeSucceedActive(absintheSocket, notifier);
    } else {
      onUnsubscribeSucceedCanceled(absintheSocket, notifier);
    }
  }.bind(undefined)
};

var pushAbsintheUnsubscribeEvent = function pushAbsintheUnsubscribeEvent(absintheSocket, _ref) {
  _newArrowCheck__default['default'](this, _this$k);

  var request = _ref.request,
      subscriptionId = _ref.subscriptionId;
  return pushAbsintheEvent(absintheSocket, request, unsubscribeHandler, createAbsintheUnsubscribeEvent({
    subscriptionId: subscriptionId
  }));
}.bind(undefined);

var unsubscribe = function unsubscribe(absintheSocket, notifier) {
  _newArrowCheck__default['default'](this, _this$k);

  return pushAbsintheUnsubscribeEvent(absintheSocket, refreshNotifier(absintheSocket, _objectSpread$3(_objectSpread$3({}, notifier), {}, {
    requestStatus: requestStatuses.canceling
  })));
}.bind(undefined);

var onSubscribeSucceed = function onSubscribeSucceed(absintheSocket, notifier, _ref2) {
  _newArrowCheck__default['default'](this, _this$k);

  var subscriptionId = _ref2.subscriptionId;
  var subscribedNotifier = refreshNotifier(absintheSocket, _objectSpread$3(_objectSpread$3({}, notifier), {}, {
    subscriptionId: subscriptionId,
    requestStatus: requestStatuses.sent
  }));

  if (subscribedNotifier.isActive) {
    notifyStartEvent(subscribedNotifier);
  } else {
    unsubscribe(absintheSocket, subscribedNotifier);
  }
}.bind(undefined);

var onSubscribe = function onSubscribe(absintheSocket, notifier, response) {
  _newArrowCheck__default['default'](this, _this$k);

  if (response.errors) {
    onError(absintheSocket, notifier, utilsGraphql.errorsToString(response.errors));
  } else {
    onSubscribeSucceed(absintheSocket, notifier, response);
  }
}.bind(undefined);

var subscribe = function subscribe(absintheSocket, notifier) {
  _newArrowCheck__default['default'](this, _this$k);

  return pushRequestUsing(absintheSocket, notifier, onSubscribe);
}.bind(undefined);

var onDataMessage = function onDataMessage(absintheSocket, _ref3) {
  _newArrowCheck__default['default'](this, _this$k);

  var payload = _ref3.payload;
  var notifier = find(absintheSocket.notifiers, "subscriptionId", payload.subscriptionId);

  if (notifier) {
    notifyResultEvent(notifier, payload.result);
  }
}.bind(undefined);

var dataMessageEventName = "subscription:data";

var isDataMessage = function isDataMessage(message) {
  _newArrowCheck__default['default'](this, _this$k);

  return message.event === dataMessageEventName;
}.bind(undefined);

var _this$l = undefined;

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$4(Object(source), true).forEach(function (key) { _defineProperty__default['default'](target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var setNotifierRequestStatusSent = function setNotifierRequestStatusSent(absintheSocket, notifier) {
  _newArrowCheck__default['default'](this, _this$l);

  return refreshNotifier(absintheSocket, _objectSpread$4(_objectSpread$4({}, notifier), {}, {
    requestStatus: requestStatuses.sent
  }));
}.bind(undefined);

var onQueryOrMutationSucceed = function onQueryOrMutationSucceed(absintheSocket, notifier, response) {
  _newArrowCheck__default['default'](this, _this$l);

  return updateNotifiers(absintheSocket, remove(notifyResultEvent(setNotifierRequestStatusSent(absintheSocket, notifier), response)));
}.bind(undefined);

var pushQueryOrMutation = function pushQueryOrMutation(absintheSocket, notifier) {
  _newArrowCheck__default['default'](this, _this$l);

  return pushRequestUsing(absintheSocket, notifyStartEvent(notifier), onQueryOrMutationSucceed);
}.bind(undefined);

var pushRequest = function pushRequest(absintheSocket, notifier) {
  _newArrowCheck__default['default'](this, _this$l);

  if (notifier.operationType === "subscription") {
    subscribe(absintheSocket, notifier);
  } else {
    pushQueryOrMutation(absintheSocket, notifier);
  }
}.bind(undefined);

var _this$m = undefined;

var createChannelJoinError = function createChannelJoinError(message) {
  _newArrowCheck__default['default'](this, _this$m);

  return new Error("channel join: ".concat(message));
}.bind(undefined);

var notifyErrorToAllActive = function notifyErrorToAllActive(absintheSocket, errorMessage) {
  var _this2 = this;

  _newArrowCheck__default['default'](this, _this$m);

  return absintheSocket.notifiers.forEach(function (notifier) {
    _newArrowCheck__default['default'](this, _this2);

    return notifyActive(notifier, createErrorEvent(createChannelJoinError(errorMessage)));
  }.bind(this));
}.bind(undefined); // join Push is reused and so the handler
// https://github.com/phoenixframework/phoenix/blob/master/assets/js/phoenix.js#L356


var createChannelJoinHandler = function createChannelJoinHandler(absintheSocket) {
  var _this3 = this;

  _newArrowCheck__default['default'](this, _this$m);

  return {
    onError: function onError(errorMessage) {
      _newArrowCheck__default['default'](this, _this3);

      return notifyErrorToAllActive(absintheSocket, errorMessage);
    }.bind(this),
    onSucceed: function onSucceed() {
      var _this4 = this;

      _newArrowCheck__default['default'](this, _this3);

      return absintheSocket.notifiers.forEach(function (notifier) {
        _newArrowCheck__default['default'](this, _this4);

        return pushRequest(absintheSocket, notifier);
      }.bind(this));
    }.bind(this),
    onTimeout: function onTimeout() {
      _newArrowCheck__default['default'](this, _this3);

      return notifyErrorToAllActive(absintheSocket, "timeout");
    }.bind(this)
  };
}.bind(undefined);

var joinChannel = function joinChannel(absintheSocket) {
  _newArrowCheck__default['default'](this, _this$m);

  handlePush(absintheSocket.channel.join(), createChannelJoinHandler(absintheSocket));
  absintheSocket.channelJoinCreated = true;
  return absintheSocket;
}.bind(undefined);

var _this$n = undefined;

var onMessage = function onMessage(absintheSocket) {
  var _this2 = this;

  _newArrowCheck__default['default'](this, _this$n);

  return function (message) {
    _newArrowCheck__default['default'](this, _this2);

    if (isDataMessage(message)) {
      onDataMessage(absintheSocket, message);
    }
  }.bind(this);
}.bind(undefined);

var createConnectionCloseError = function createConnectionCloseError() {
  _newArrowCheck__default['default'](this, _this$n);

  return new Error("connection: close");
}.bind(undefined);

var notifyConnectionCloseError = function notifyConnectionCloseError(notifier) {
  _newArrowCheck__default['default'](this, _this$n);

  return notify(notifier, createErrorEvent(createConnectionCloseError()));
}.bind(undefined);

var notifierOnConnectionCloseCanceled = function notifierOnConnectionCloseCanceled(absintheSocket, notifier) {
  _newArrowCheck__default['default'](this, _this$n);

  return updateNotifiers(absintheSocket, remove(notifyConnectionCloseError(notifier)));
}.bind(undefined);

var notifierOnConnectionCloseActive = function notifierOnConnectionCloseActive(absintheSocket, notifier) {
  _newArrowCheck__default['default'](this, _this$n);

  if (notifier.operationType === "mutation") {
    abortNotifier(absintheSocket, notifier, createConnectionCloseError());
  } else {
    refreshNotifier(absintheSocket, reset(notifyConnectionCloseError(notifier)));
  }
}.bind(undefined);

var notifierOnConnectionClose = function notifierOnConnectionClose(absintheSocket) {
  var _this3 = this;

  _newArrowCheck__default['default'](this, _this$n);

  return function (notifier) {
    _newArrowCheck__default['default'](this, _this3);

    if (notifier.isActive) {
      notifierOnConnectionCloseActive(absintheSocket, notifier);
    } else {
      notifierOnConnectionCloseCanceled(absintheSocket, notifier);
    }
  }.bind(this);
}.bind(undefined);

var onConnectionClose = function onConnectionClose(absintheSocket) {
  var _this4 = this;

  _newArrowCheck__default['default'](this, _this$n);

  return function () {
    _newArrowCheck__default['default'](this, _this4);

    return absintheSocket.notifiers.forEach(notifierOnConnectionClose(absintheSocket));
  }.bind(this);
}.bind(undefined);

var shouldJoinChannel = function shouldJoinChannel(absintheSocket) {
  _newArrowCheck__default['default'](this, _this$n);

  return !absintheSocket.channelJoinCreated && absintheSocket.notifiers.length > 0;
}.bind(undefined);

var onConnectionOpen = function onConnectionOpen(absintheSocket) {
  var _this5 = this;

  _newArrowCheck__default['default'](this, _this$n);

  return function () {
    _newArrowCheck__default['default'](this, _this5);

    if (shouldJoinChannel(absintheSocket)) {
      joinChannel(absintheSocket);
    }
  }.bind(this);
}.bind(undefined);

var absintheChannelName = "__absinthe__:control";
/**
 * Creates an Absinthe Socket using the given Phoenix Socket instance
 *
 * @example
 * import * as withAbsintheSocket from "@absinthe/socket";
 * import {Socket as PhoenixSocket} from "phoenix";

 * const absintheSocket = withAbsintheSocket.create(
 *   new PhoenixSocket("ws://localhost:4000/socket")
 * );
 */

var create = function create(phoenixSocket) {
  _newArrowCheck__default['default'](this, _this$n);

  var absintheSocket = {
    phoenixSocket: phoenixSocket,
    channel: phoenixSocket.channel(absintheChannelName),
    channelJoinCreated: false,
    notifiers: []
  };
  phoenixSocket.onOpen(onConnectionOpen(absintheSocket));
  phoenixSocket.onClose(onConnectionClose(absintheSocket));
  phoenixSocket.onMessage(onMessage(absintheSocket));
  return absintheSocket;
}.bind(undefined);

module.exports = create;
//# sourceMappingURL=create.js.map
