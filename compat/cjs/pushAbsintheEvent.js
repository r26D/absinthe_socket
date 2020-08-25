'use strict';

require('core-js/modules/es.array.concat');
require('core-js/modules/es.function.bind');
require('core-js/modules/es.function.name');
var _newArrowCheck = require('@babel/runtime/helpers/newArrowCheck');
var utilsComposite = require('@jumpn/utils-composite');
require('phoenix');
require('core-js/modules/es.array.find');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _newArrowCheck__default = /*#__PURE__*/_interopDefaultLegacy(_newArrowCheck);

var _this = undefined;

var handlePush = function handlePush(push, handler) {
  _newArrowCheck__default['default'](this, _this);

  return push.receive("ok", handler.onSucceed).receive("error", handler.onError).receive("timeout", handler.onTimeout);
}.bind(undefined);

var _this$1 = undefined;

var find = function find(notifiers, key, value) {
  _newArrowCheck__default['default'](this, _this$1);

  return (// $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
    notifiers.find(utilsComposite.hasIn([key], value))
  );
}.bind(undefined);

var _this$2 = undefined;

var getPushHandlerMethodGetter = function getPushHandlerMethodGetter(absintheSocket, request) {
  var _this2 = this;

  _newArrowCheck__default['default'](this, _this$2);

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
  _newArrowCheck__default['default'](this, _this$2);

  return utilsComposite.map(getPushHandlerMethodGetter(absintheSocket, request), notifierPushHandler);
}.bind(undefined);

var pushAbsintheEvent = function pushAbsintheEvent(absintheSocket, request, notifierPushHandler, absintheEvent) {
  _newArrowCheck__default['default'](this, _this$2);

  handlePush(absintheSocket.channel.push(absintheEvent.name, absintheEvent.payload), getPushHandler(absintheSocket, request, notifierPushHandler));
  return absintheSocket;
}.bind(undefined);

module.exports = pushAbsintheEvent;
//# sourceMappingURL=pushAbsintheEvent.js.map
