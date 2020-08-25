(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('phoenix')) :
	typeof define === 'function' && define.amd ? define(['exports', 'phoenix'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.AbsintheSocket = {}));
}(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, basedir, module) {
		return module = {
		  path: basedir,
		  exports: {},
		  require: function (path, base) {
	      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
	    }
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global_1 =
	  // eslint-disable-next-line no-undef
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func
	  Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;

	var objectPropertyIsEnumerable = {
		f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings



	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// `ToPrimitive` abstract operation
	// https://tc39.github.io/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var toPrimitive = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$1 = global_1.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$1
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var nativeDefineProperty = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty
	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var objectDefineProperty = {
		f: f$2
	};

	var createNonEnumerableProperty = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var setGlobal = function (key, value) {
	  try {
	    createNonEnumerableProperty(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  } return value;
	};

	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});

	var sharedStore = store;

	var functionToString = Function.toString;

	// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
	if (typeof sharedStore.inspectSource != 'function') {
	  sharedStore.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource = sharedStore.inspectSource;

	var WeakMap = global_1.WeakMap;

	var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

	var shared = createCommonjsModule(function (module) {
	(module.exports = function (key, value) {
	  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.6.5',
	  mode:  'global',
	  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var keys = shared('keys');

	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys = {};

	var WeakMap$1 = global_1.WeakMap;
	var set, get, has$1;

	var enforce = function (it) {
	  return has$1(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (nativeWeakMap) {
	  var store$1 = new WeakMap$1();
	  var wmget = store$1.get;
	  var wmhas = store$1.has;
	  var wmset = store$1.set;
	  set = function (it, metadata) {
	    wmset.call(store$1, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store$1, it) || {};
	  };
	  has$1 = function (it) {
	    return wmhas.call(store$1, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;
	  set = function (it, metadata) {
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };
	  has$1 = function (it) {
	    return has(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var redefine = createCommonjsModule(function (module) {
	var getInternalState = internalState.get;
	var enforceInternalState = internalState.enforce;
	var TEMPLATE = String(String).split('String');

	(module.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  if (typeof value == 'function') {
	    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
	    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
	  }
	  if (O === global_1) {
	    if (simple) O[key] = value;
	    else setGlobal(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }
	  if (simple) O[key] = value;
	  else createNonEnumerableProperty(O, key, value);
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
	});
	});

	var path = global_1;

	var aFunction = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
	    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
	};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.github.io/ecma262/#sec-tointeger
	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.github.io/ecma262/#sec-tolength
	var toLength = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var indexOf = arrayIncludes.indexOf;


	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNames = {
		f: f$3
	};

	var f$4 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols = {
		f: f$4
	};

	// all object keys, includes non-enumerable and symbols
	var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var copyConstructorProperties = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = objectDefineProperty.f;
	  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : typeof detection == 'function' ? fails(detection)
	    : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';

	var isForced_1 = isForced;

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global_1;
	  } else if (STATIC) {
	    target = global_1[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global_1[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty(sourceProperty, 'sham', true);
	    }
	    // extend global
	    redefine(target, key, sourceProperty, options);
	  }
	};

	var aFunction$1 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	var slice = [].slice;
	var factories = {};

	var construct = function (C, argsLength, args) {
	  if (!(argsLength in factories)) {
	    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
	    // eslint-disable-next-line no-new-func
	    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
	  } return factories[argsLength](C, args);
	};

	// `Function.prototype.bind` method implementation
	// https://tc39.github.io/ecma262/#sec-function.prototype.bind
	var functionBind = Function.bind || function bind(that /* , ...args */) {
	  var fn = aFunction$1(this);
	  var partArgs = slice.call(arguments, 1);
	  var boundFunction = function bound(/* args... */) {
	    var args = partArgs.concat(slice.call(arguments));
	    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
	  };
	  if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
	  return boundFunction;
	};

	// `Function.prototype.bind` method
	// https://tc39.github.io/ecma262/#sec-function.prototype.bind
	_export({ target: 'Function', proto: true }, {
	  bind: functionBind
	});

	function _newArrowCheck(innerThis, boundThis) {
	  if (innerThis !== boundThis) {
	    throw new TypeError("Cannot instantiate an arrow function");
	  }
	}

	var newArrowCheck = _newArrowCheck;

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	var useSymbolAsUid = nativeSymbol
	  // eslint-disable-next-line no-undef
	  && !Symbol.sham
	  // eslint-disable-next-line no-undef
	  && typeof Symbol.iterator == 'symbol';

	// `IsArray` abstract operation
	// https://tc39.github.io/ecma262/#sec-isarray
	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	// `ToObject` abstract operation
	// https://tc39.github.io/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	// `Object.defineProperties` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperties
	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
	  return O;
	};

	var html = getBuiltIn('document', 'documentElement');

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    /* global ActiveXObject */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.github.io/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;

	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return nativeGetOwnPropertyNames(it);
	  } catch (error) {
	    return windowNames.slice();
	  }
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var f$5 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]'
	    ? getWindowNames(it)
	    : nativeGetOwnPropertyNames(toIndexedObject(it));
	};

	var objectGetOwnPropertyNamesExternal = {
		f: f$5
	};

	var WellKnownSymbolsStore = shared('wks');
	var Symbol$1 = global_1.Symbol;
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

	var wellKnownSymbol = function (name) {
	  if (!has(WellKnownSymbolsStore, name)) {
	    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
	    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
	};

	var f$6 = wellKnownSymbol;

	var wellKnownSymbolWrapped = {
		f: f$6
	};

	var defineProperty = objectDefineProperty.f;

	var defineWellKnownSymbol = function (NAME) {
	  var Symbol = path.Symbol || (path.Symbol = {});
	  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
	    value: wellKnownSymbolWrapped.f(NAME)
	  });
	};

	var defineProperty$1 = objectDefineProperty.f;



	var TO_STRING_TAG = wellKnownSymbol('toStringTag');

	var setToStringTag = function (it, TAG, STATIC) {
	  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
	    defineProperty$1(it, TO_STRING_TAG, { configurable: true, value: TAG });
	  }
	};

	// optional / simple context binding
	var functionBindContext = function (fn, that, length) {
	  aFunction$1(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 0: return function () {
	      return fn.call(that);
	    };
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var SPECIES = wellKnownSymbol('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate = function (originalArray, length) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    else if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var push = [].push;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
	var createMethod$1 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = functionBindContext(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push.call(target, value); // filter
	        } else if (IS_EVERY) return false;  // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$1(0),
	  // `Array.prototype.map` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.map
	  map: createMethod$1(1),
	  // `Array.prototype.filter` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
	  filter: createMethod$1(2),
	  // `Array.prototype.some` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.some
	  some: createMethod$1(3),
	  // `Array.prototype.every` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.every
	  every: createMethod$1(4),
	  // `Array.prototype.find` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.find
	  find: createMethod$1(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$1(6)
	};

	var $forEach = arrayIteration.forEach;

	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE$1 = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
	var setInternalState = internalState.set;
	var getInternalState = internalState.getterFor(SYMBOL);
	var ObjectPrototype = Object[PROTOTYPE$1];
	var $Symbol = global_1.Symbol;
	var $stringify = getBuiltIn('JSON', 'stringify');
	var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var nativeDefineProperty$1 = objectDefineProperty.f;
	var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
	var AllSymbols = shared('symbols');
	var ObjectPrototypeSymbols = shared('op-symbols');
	var StringToSymbolRegistry = shared('string-to-symbol-registry');
	var SymbolToStringRegistry = shared('symbol-to-string-registry');
	var WellKnownSymbolsStore$1 = shared('wks');
	var QObject = global_1.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDescriptor = descriptors && fails(function () {
	  return objectCreate(nativeDefineProperty$1({}, 'a', {
	    get: function () { return nativeDefineProperty$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
	  nativeDefineProperty$1(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
	    nativeDefineProperty$1(ObjectPrototype, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty$1;

	var wrap = function (tag, description) {
	  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
	  setInternalState(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!descriptors) symbol.description = description;
	  return symbol;
	};

	var isSymbol = useSymbolAsUid ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return Object(it) instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject(O);
	  var key = toPrimitive(P, true);
	  anObject(Attributes);
	  if (has(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!has(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = objectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty$1(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject(O);
	  var properties = toIndexedObject(Properties);
	  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
	  $forEach(keys, function (key) {
	    if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
	  var P = toPrimitive(V, true);
	  var enumerable = nativePropertyIsEnumerable$1.call(this, P);
	  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject(O);
	  var key = toPrimitive(P, true);
	  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
	  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }
	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames$1(toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
	  var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
	      result.push(AllSymbols[key]);
	    }
	  });
	  return result;
	};

	// `Symbol` constructor
	// https://tc39.github.io/ecma262/#sec-symbol-constructor
	if (!nativeSymbol) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var tag = uid(description);
	    var setter = function (value) {
	      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
	    };
	    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
	    return wrap(tag, description);
	  };

	  redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
	    return getInternalState(this).tag;
	  });

	  redefine($Symbol, 'withoutSetter', function (description) {
	    return wrap(uid(description), description);
	  });

	  objectPropertyIsEnumerable.f = $propertyIsEnumerable;
	  objectDefineProperty.f = $defineProperty;
	  objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
	  objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

	  wellKnownSymbolWrapped.f = function (name) {
	    return wrap(wellKnownSymbol(name), name);
	  };

	  if (descriptors) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState(this).description;
	      }
	    });
	    {
	      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
	    }
	  }
	}

	_export({ global: true, wrap: true, forced: !nativeSymbol, sham: !nativeSymbol }, {
	  Symbol: $Symbol
	});

	$forEach(objectKeys(WellKnownSymbolsStore$1), function (name) {
	  defineWellKnownSymbol(name);
	});

	_export({ target: SYMBOL, stat: true, forced: !nativeSymbol }, {
	  // `Symbol.for` method
	  // https://tc39.github.io/ecma262/#sec-symbol.for
	  'for': function (key) {
	    var string = String(key);
	    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = $Symbol(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  },
	  // `Symbol.keyFor` method
	  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
	    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  },
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});

	_export({ target: 'Object', stat: true, forced: !nativeSymbol, sham: !descriptors }, {
	  // `Object.create` method
	  // https://tc39.github.io/ecma262/#sec-object.create
	  create: $create,
	  // `Object.defineProperty` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperty
	  defineProperty: $defineProperty,
	  // `Object.defineProperties` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperties
	  defineProperties: $defineProperties,
	  // `Object.getOwnPropertyDescriptor` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});

	_export({ target: 'Object', stat: true, forced: !nativeSymbol }, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // `Object.getOwnPropertySymbols` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	_export({ target: 'Object', stat: true, forced: fails(function () { objectGetOwnPropertySymbols.f(1); }) }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return objectGetOwnPropertySymbols.f(toObject(it));
	  }
	});

	// `JSON.stringify` method behavior with symbols
	// https://tc39.github.io/ecma262/#sec-json.stringify
	if ($stringify) {
	  var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
	    var symbol = $Symbol();
	    // MS Edge converts symbol values to JSON as {}
	    return $stringify([symbol]) != '[null]'
	      // WebKit converts symbol values to JSON as null
	      || $stringify({ a: symbol }) != '{}'
	      // V8 throws on boxed symbols
	      || $stringify(Object(symbol)) != '{}';
	  });

	  _export({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
	    // eslint-disable-next-line no-unused-vars
	    stringify: function stringify(it, replacer, space) {
	      var args = [it];
	      var index = 1;
	      var $replacer;
	      while (arguments.length > index) args.push(arguments[index++]);
	      $replacer = replacer;
	      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	      if (!isArray(replacer)) replacer = function (key, value) {
	        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	        if (!isSymbol(value)) return value;
	      };
	      args[1] = replacer;
	      return $stringify.apply(null, args);
	    }
	  });
	}

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
	if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) {
	  createNonEnumerableProperty($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf);
	}
	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag($Symbol, SYMBOL);

	hiddenKeys[HIDDEN] = true;

	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};

	var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

	var process = global_1.process;
	var versions = process && process.versions;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  version = match[0] + match[1];
	} else if (engineUserAgent) {
	  match = engineUserAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = engineUserAgent.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}

	var engineV8Version = version && +version;

	var SPECIES$1 = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return engineV8Version >= 51 || !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$1] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray(O);
	};

	var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	_export({ target: 'Array', proto: true, forced: FORCED }, {
	  concat: function concat(arg) { // eslint-disable-line no-unused-vars
	    var O = toObject(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = toLength(E.length);
	        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var defineProperty$2 = Object.defineProperty;
	var cache = {};

	var thrower = function (it) { throw it; };

	var arrayMethodUsesToLength = function (METHOD_NAME, options) {
	  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
	  if (!options) options = {};
	  var method = [][METHOD_NAME];
	  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
	  var argument0 = has(options, 0) ? options[0] : thrower;
	  var argument1 = has(options, 1) ? options[1] : undefined;

	  return cache[METHOD_NAME] = !!method && !fails(function () {
	    if (ACCESSORS && !descriptors) return true;
	    var O = { length: -1 };

	    if (ACCESSORS) defineProperty$2(O, 1, { enumerable: true, get: thrower });
	    else O[1] = 1;

	    method.call(O, argument0, argument1);
	  });
	};

	var $filter = arrayIteration.filter;



	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
	// Edge 14- issue
	var USES_TO_LENGTH = arrayMethodUsesToLength('filter');

	// `Array.prototype.filter` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var arrayMethodIsStrict = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	var $forEach$1 = arrayIteration.forEach;



	var STRICT_METHOD = arrayMethodIsStrict('forEach');
	var USES_TO_LENGTH$1 = arrayMethodUsesToLength('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	var arrayForEach = (!STRICT_METHOD || !USES_TO_LENGTH$1) ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	} : [].forEach;

	// `Array.prototype.forEach` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	_export({ target: 'Array', proto: true, forced: [].forEach != arrayForEach }, {
	  forEach: arrayForEach
	});

	// `Object.defineProperties` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperties
	_export({ target: 'Object', stat: true, forced: !descriptors, sham: !descriptors }, {
	  defineProperties: objectDefineProperties
	});

	// `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty
	_export({ target: 'Object', stat: true, forced: !descriptors, sham: !descriptors }, {
	  defineProperty: objectDefineProperty.f
	});

	var nativeGetOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;


	var FAILS_ON_PRIMITIVES = fails(function () { nativeGetOwnPropertyDescriptor$2(1); });
	var FORCED$1 = !descriptors || FAILS_ON_PRIMITIVES;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
	_export({ target: 'Object', stat: true, forced: FORCED$1, sham: !descriptors }, {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
	    return nativeGetOwnPropertyDescriptor$2(toIndexedObject(it), key);
	  }
	});

	// `Object.getOwnPropertyDescriptors` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
	_export({ target: 'Object', stat: true, sham: !descriptors }, {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = toIndexedObject(object);
	    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	    var keys = ownKeys(O);
	    var result = {};
	    var index = 0;
	    var key, descriptor;
	    while (keys.length > index) {
	      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
	      if (descriptor !== undefined) createProperty(result, key, descriptor);
	    }
	    return result;
	  }
	});

	var FAILS_ON_PRIMITIVES$1 = fails(function () { objectKeys(1); });

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1 }, {
	  keys: function keys(it) {
	    return objectKeys(toObject(it));
	  }
	});

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global_1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  // some Chrome versions have non-configurable methods on DOMTokenList
	  if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach) try {
	    createNonEnumerableProperty(CollectionPrototype, 'forEach', arrayForEach);
	  } catch (error) {
	    CollectionPrototype.forEach = arrayForEach;
	  }
	}

	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) {
	    arr2[i] = arr[i];
	  }

	  return arr2;
	}

	var arrayLikeToArray = _arrayLikeToArray;

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) return arrayLikeToArray(arr);
	}

	var arrayWithoutHoles = _arrayWithoutHoles;

	function _iterableToArray(iter) {
	  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
	}

	var iterableToArray = _iterableToArray;

	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
	}

	var unsupportedIterableToArray = _unsupportedIterableToArray;

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	var nonIterableSpread = _nonIterableSpread;

	function _toConsumableArray(arr) {
	  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
	}

	var toConsumableArray = _toConsumableArray;

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	var defineProperty$3 = _defineProperty;

	function _objectWithoutPropertiesLoose(source, excluded) {
	  if (source == null) return {};
	  var target = {};
	  var sourceKeys = Object.keys(source);
	  var key, i;

	  for (i = 0; i < sourceKeys.length; i++) {
	    key = sourceKeys[i];
	    if (excluded.indexOf(key) >= 0) continue;
	    target[key] = source[key];
	  }

	  return target;
	}

	var objectWithoutPropertiesLoose = _objectWithoutPropertiesLoose;

	function _objectWithoutProperties(source, excluded) {
	  if (source == null) return {};
	  var target = objectWithoutPropertiesLoose(source, excluded);
	  var key, i;

	  if (Object.getOwnPropertySymbols) {
	    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

	    for (i = 0; i < sourceSymbolKeys.length; i++) {
	      key = sourceSymbolKeys[i];
	      if (excluded.indexOf(key) >= 0) continue;
	      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
	      target[key] = source[key];
	    }
	  }

	  return target;
	}

	var objectWithoutProperties = _objectWithoutProperties;

	var _this = undefined;

	function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { defineProperty$3(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	var cancel = function cancel(_ref) {
	  newArrowCheck(this, _this);

	  var activeObservers = _ref.activeObservers,
	      canceledObservers = _ref.canceledObservers,
	      rest = objectWithoutProperties(_ref, ["activeObservers", "canceledObservers"]);

	  return _objectSpread(_objectSpread({}, rest), {}, {
	    isActive: false,
	    activeObservers: [],
	    canceledObservers: [].concat(toConsumableArray(activeObservers), toConsumableArray(canceledObservers))
	  });
	}.bind(undefined);

	var defineProperty$4 = objectDefineProperty.f;

	var FunctionPrototype = Function.prototype;
	var FunctionPrototypeToString = FunctionPrototype.toString;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name';

	// Function instances `.name` property
	// https://tc39.github.io/ecma262/#sec-function-instances-name
	if (descriptors && !(NAME in FunctionPrototype)) {
	  defineProperty$4(FunctionPrototype, NAME, {
	    configurable: true,
	    get: function () {
	      try {
	        return FunctionPrototypeToString.call(this).match(nameRE)[1];
	      } catch (error) {
	        return '';
	      }
	    }
	  });
	}

	var _this$1 = undefined;

	var getNotifier = function getNotifier(handlerName, payload) {
	  var _this2 = this;

	  newArrowCheck(this, _this$1);

	  return function (observer) {
	    newArrowCheck(this, _this2);

	    return observer[handlerName] && observer[handlerName](payload);
	  }.bind(this);
	}.bind(undefined);

	var getHandlerName = function getHandlerName(_ref) {
	  newArrowCheck(this, _this$1);

	  var name = _ref.name;
	  return "on".concat(name);
	}.bind(undefined);

	var notifyAll = function notifyAll(observers, event) {
	  newArrowCheck(this, _this$1);

	  return observers.forEach(getNotifier(getHandlerName(event), event.payload));
	}.bind(undefined);

	var _this$2 = undefined;

	var notifyCanceled = function notifyCanceled(notifier, event) {
	  newArrowCheck(this, _this$2);

	  notifyAll(notifier.canceledObservers, event);
	  return notifier;
	}.bind(undefined);

	var eventNames = {
	  abort: "Abort",
	  cancel: "Cancel",
	  error: "Error",
	  result: "Result",
	  start: "Start"
	};

	var _this$3 = undefined;

	var createStartEvent = function createStartEvent(payload) {
	  newArrowCheck(this, _this$3);

	  return {
	    payload: payload,
	    name: eventNames.start
	  };
	}.bind(undefined);

	var createResultEvent = function createResultEvent(payload) {
	  newArrowCheck(this, _this$3);

	  return {
	    payload: payload,
	    name: eventNames.result
	  };
	}.bind(undefined);

	var createErrorEvent = function createErrorEvent(payload) {
	  newArrowCheck(this, _this$3);

	  return {
	    payload: payload,
	    name: eventNames.error
	  };
	}.bind(undefined);

	var createCancelEvent = function createCancelEvent() {
	  newArrowCheck(this, _this$3);

	  return {
	    name: eventNames.cancel,
	    payload: undefined
	  };
	}.bind(undefined);

	var createAbortEvent = function createAbortEvent(payload) {
	  newArrowCheck(this, _this$3);

	  return {
	    payload: payload,
	    name: eventNames.abort
	  };
	}.bind(undefined);

	var _this$4 = undefined;

	function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { defineProperty$3(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	var clearCanceled = function clearCanceled(notifier) {
	  newArrowCheck(this, _this$4);

	  return _objectSpread$1(_objectSpread$1({}, notifier), {}, {
	    canceledObservers: []
	  });
	}.bind(undefined);

	var flushCanceled = function flushCanceled(notifier) {
	  newArrowCheck(this, _this$4);

	  return notifier.canceledObservers.length > 0 ? clearCanceled(notifyCanceled(notifier, createCancelEvent())) : notifier;
	}.bind(undefined);

	// 7.1.4 ToInteger
	var ceil$1 = Math.ceil;
	var floor$1 = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor$1 : ceil$1)(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(_defined(that));
	    var i = _toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var _library = true;

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.6.11' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$2 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document$2) && _isObject(document$2.createElement);
	var _domCreate = function (it) {
	  return is ? document$2.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f$7 = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f$7
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty$1 = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty$1.call(it, key);
	};

	var PROTOTYPE$2 = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE$2];
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE$2];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && _has(exports, key)) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? _ctx(out, _global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE$2] = C[PROTOTYPE$2];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export$1 = $export;

	var _redefine = _hide;

	var _iterators = {};

	var toString$2 = {}.toString;

	var _cof = function (it) {
	  return toString$2.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	// 7.1.15 ToLength

	var min$2 = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min$2(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max$1 = Math.max;
	var min$3 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max$1(index + length, 0) : min$3(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode:  'pure' ,
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id$1 = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id$1 + px).toString(36));
	};

	var shared$1 = _shared('keys');

	var _sharedKey = function (key) {
	  return shared$1[key] || (shared$1[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO$1 = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO$1) _has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O);
	  var keys = _objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var document$3 = _global.document;
	var _html = document$3 && document$3.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$2 = _sharedKey('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$3 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe');
	  var i = _enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$3][_enumBugKeys[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$3] = _anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$3] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$2] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	var _wks = createCommonjsModule(function (module) {
	var store = _shared('wks');

	var Symbol = _global.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var def = _objectDp.f;

	var TAG = _wks('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
	  _setToStringTag(Constructor, NAME + ' Iterator');
	};

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO$3 = _sharedKey('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O);
	  if (_has(O, IE_PROTO$3)) return O[IE_PROTO$3];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

	var ITERATOR = _wks('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      _setToStringTag(IteratorPrototype, TAG, true);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if (( FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    _hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  _iterators[NAME] = $default;
	  _iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) _redefine(proto, key, methods[key]);
	    } else _export$1(_export$1.P + _export$1.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	var $at = _stringAt(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	_iterDefine(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

	// call something on iterator step with safe closing on error

	var _iterCall = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) _anObject(ret.call(iterator));
	    throw e;
	  }
	};

	// check on default Array iterator

	var ITERATOR$1 = _wks('iterator');
	var ArrayProto = Array.prototype;

	var _isArrayIter = function (it) {
	  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
	};

	var _createProperty = function (object, index, value) {
	  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
	  else object[index] = value;
	};

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG$1 = _wks('toStringTag');
	// ES3 wrong here
	var ARG = _cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	var _classof = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
	    // builtinTag case
	    : ARG ? _cof(O)
	    // ES3 arguments fallback
	    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var ITERATOR$2 = _wks('iterator');

	var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$2]
	    || it['@@iterator']
	    || _iterators[_classof(it)];
	};

	var ITERATOR$3 = _wks('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR$3]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	  // eslint-disable-next-line no-throw-literal
	  Array.from(riter, function () { throw 2; });
	} catch (e) { /* empty */ }

	var _iterDetect = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR$3]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR$3] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};

	_export$1(_export$1.S + _export$1.F * !_iterDetect(function (iter) { Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	    var O = _toObject(arrayLike);
	    var C = typeof this == 'function' ? this : Array;
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var index = 0;
	    var iterFn = core_getIteratorMethod(O);
	    var length, result, step, iterator;
	    if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = _toLength(O.length);
	      for (result = new C(length); length > index; index++) {
	        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

	var from_1 = _core.Array.from;

	var from_1$1 = createCommonjsModule(function (module) {
	module.exports = { "default": from_1, __esModule: true };
	});

	var _Array$from = /*@__PURE__*/getDefaultExportFromCjs(from_1$1);

	var toConsumableArray$1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _from2 = _interopRequireDefault(from_1$1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};
	});

	var _toConsumableArray$1 = /*@__PURE__*/getDefaultExportFromCjs(toConsumableArray$1);

	var newArrowCheck$1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;

	exports.default = function (innerThis, boundThis) {
	  if (innerThis !== boundThis) {
	    throw new TypeError("Cannot instantiate an arrow function");
	  }
	};
	});

	var _newArrowCheck$1 = /*@__PURE__*/getDefaultExportFromCjs(newArrowCheck$1);

	var Fun = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.flip = flip;
	exports.constant = constant;
	exports.on = on;
	exports.compose = compose;
	exports.pipe = pipe;
	exports.curry = curry;
	// eslint-disable-line no-redeclare

	// Flips the order of the arguments to a function of two arguments.
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare

	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare

	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	function flip(f) {
	  return function (b, a) {
	    return f(a, b);
	  };
	}

	// Returns its first argument and ignores its second.
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare

	function constant(a) {
	  return function () {
	    return a;
	  };
	}

	// The `on` function is used to change the domain of a binary operator.
	function on(o, f) {
	  return function (x, y) {
	    return o(f(x), f(y));
	  };
	}

	function compose() {
	  var _this = this;

	  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
	    fns[_key] = arguments[_key];
	  }

	  // eslint-disable-line no-redeclare
	  var len = fns.length - 1;
	  return function (x) {
	    var y = x;
	    for (var _i = len; _i > -1; _i--) {
	      y = fns[_i].call(_this, y);
	    }
	    return y;
	  };
	}

	function pipe() {
	  var _this2 = this;

	  for (var _len2 = arguments.length, fns = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    fns[_key2] = arguments[_key2];
	  }

	  // eslint-disable-line no-redeclare
	  var len = fns.length - 1;
	  return function (x) {
	    var y = x;
	    for (var _i2 = 0; _i2 <= len; _i2++) {
	      y = fns[_i2].call(_this2, y);
	    }
	    return y;
	  };
	}

	function curried(f, length, acc) {
	  return function () {
	    var combined = acc.concat(Array.prototype.slice.call(arguments));
	    return combined.length >= length ? f.apply(this, combined) : curried(f, length, combined);
	  };
	}

	function curry(f) {
	  // eslint-disable-line no-redeclare
	  return curried(f, f.length, []);
	}
	});

	var f$8 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$8
	};

	var f$9 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$9
	};

	// 19.1.2.1 Object.assign(target, source, ...)






	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || _fails(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = _toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = _objectGops.f;
	  var isEnum = _objectPie.f;
	  while (aLen > index) {
	    var S = _iobject(arguments[index++]);
	    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!_descriptors || isEnum.call(S, key)) T[key] = S[key];
	    }
	  } return T;
	} : $assign;

	// 19.1.3.1 Object.assign(target, source)


	_export$1(_export$1.S + _export$1.F, 'Object', { assign: _objectAssign });

	var assign = _core.Object.assign;

	var assign$1 = createCommonjsModule(function (module) {
	module.exports = { "default": assign, __esModule: true };
	});

	var _extends = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _assign2 = _interopRequireDefault(assign$1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _assign2.default || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};
	});

	var _extends$1 = /*@__PURE__*/getDefaultExportFromCjs(_extends);

	// most Object methods by ES6 should accept primitives



	var _objectSap = function (KEY, exec) {
	  var fn = (_core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  _export$1(_export$1.S + _export$1.F * _fails(function () { fn(1); }), 'Object', exp);
	};

	// 19.1.2.14 Object.keys(O)



	_objectSap('keys', function () {
	  return function keys(it) {
	    return _objectKeys(_toObject(it));
	  };
	});

	var keys$1 = _core.Object.keys;

	var keys$2 = createCommonjsModule(function (module) {
	module.exports = { "default": keys$1, __esModule: true };
	});

	var _Object$keys = /*@__PURE__*/getDefaultExportFromCjs(keys$2);

	// 20.1.2.3 Number.isInteger(number)

	var floor$2 = Math.floor;
	var _isInteger = function isInteger(it) {
	  return !_isObject(it) && isFinite(it) && floor$2(it) === it;
	};

	// 20.1.2.3 Number.isInteger(number)


	_export$1(_export$1.S, 'Number', { isInteger: _isInteger });

	var isInteger = _core.Number.isInteger;

	var isInteger$1 = createCommonjsModule(function (module) {
	module.exports = { "default": isInteger, __esModule: true };
	});

	var _Number$isInteger = /*@__PURE__*/getDefaultExportFromCjs(isInteger$1);

	var objectWithoutProperties$1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;

	exports.default = function (obj, keys) {
	  var target = {};

	  for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;
	    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	    target[i] = obj[i];
	  }

	  return target;
	};
	});

	var _objectWithoutProperties$1 = /*@__PURE__*/getDefaultExportFromCjs(objectWithoutProperties$1);

	var _this$5 = undefined;

	/**
	 * Returns a new Array with elements appended to the one given.
	 */
	var append = function (elements, array) {
	  _newArrowCheck$1(this, _this$5);

	  return [].concat(_toConsumableArray$1(array), _toConsumableArray$1(elements));
	}.bind(undefined);

	var append$1 = Fun.curry(append);

	var _this$1$1 = undefined;

	/**
	 * Returns input if it is an Array or returns a new Array with input inside if
	 * it is not.
	 */
	var convertIfNot = function (input) {
	  _newArrowCheck$1(this, _this$1$1);

	  return Array.isArray(input) ? input : [input];
	}.bind(undefined);

	var _this$3$1 = undefined;

	/**
	 * Returns true if given index is the last one or false otherwise.
	 */
	var isLastIndex = function (array, index) {
	  _newArrowCheck$1(this, _this$3$1);

	  return index === array.length - 1;
	}.bind(undefined);

	var isLastIndex$1 = Fun.curry(isLastIndex);

	var _this$2$1 = undefined;

	/**
	 * Returns 0 if current index is the last one, or returns next if it is not.
	 */
	var cycleNext = function (array, currentIndex) {
	  _newArrowCheck$1(this, _this$2$1);

	  return isLastIndex$1(array, currentIndex) ? 0 : currentIndex + 1;
	}.bind(undefined);

	var cycleNext$1 = Fun.curry(cycleNext);

	var _this$4$1 = undefined;

	var getObjectLength = function (object) {
	  _newArrowCheck$1(this, _this$4$1);

	  return Math.max.apply(Math, _toConsumableArray$1(_Object$keys(object))) + 1;
	}.bind(undefined);

	/**
	 * Creates a new array using the given object
	 * If all of its entries are array keys.
	 * 
	 * (it could also have a property length with its size)
	 */
	var fromObject = function (object) {
	  _newArrowCheck$1(this, _this$4$1);

	  return _Array$from("length" in object ? object : _extends$1({}, object, { length: getObjectLength(object) }));
	}.bind(undefined);

	var _this$5$1 = undefined;

	/**
	 * Returns a new Array with the result of having inserted the given elements at
	 * the specified index.
	 */
	var insert = function (index, elements, array) {
	  _newArrowCheck$1(this, _this$5$1);

	  return [].concat(_toConsumableArray$1(array.slice(0, index)), _toConsumableArray$1(elements), _toConsumableArray$1(array.slice(index + 1)));
	}.bind(undefined);

	var insert$1 = Fun.curry(insert);

	var _this$6 = undefined;

	var isIntGreaterThan = function (number, other) {
	  _newArrowCheck$1(this, _this$6);

	  return _Number$isInteger(number) && number >= other;
	}.bind(undefined);

	/**
	 * Returns true if the given string is an Array key or false otherwise.
	 */
	var isKey = function (string) {
	  _newArrowCheck$1(this, _this$6);

	  return isIntGreaterThan(Number(string), 0);
	}.bind(undefined);

	var _this$7 = undefined;

	/**
	 * Returns true if an Array can be created from the given Object, or in other
	 * words, if it has or not a length property, and the rest of its keys are Array
	 * ones.
	 */
	var isPossibleFromObject = function (_ref) {
	  var length = _ref.length,
	      rest = _objectWithoutProperties$1(_ref, ["length"]);

	  _newArrowCheck$1(this, _this$7);

	  return _Object$keys(rest).every(isKey);
	}.bind(undefined);

	var _this$8 = undefined;

	/**
	 * Returns a new Array with elements prepended to the one given.
	 */
	var prepend = function (elements, array) {
	  _newArrowCheck$1(this, _this$8);

	  return [].concat(_toConsumableArray$1(elements), _toConsumableArray$1(array));
	}.bind(undefined);

	var prepend$1 = Fun.curry(prepend);

	var _this$9 = undefined;

	/**
	 * Reduce the given array applying reduce function only to elements filtered.
	 */
	var reduceIf = function (filter, reduce, resultInitial, array) {
	  _newArrowCheck$1(this, _this$9);

	  return array.reduce(function (result, element, index) {
	    _newArrowCheck$1(this, _this$9);

	    return filter(element, index, result) ? reduce(result, element, index) : result;
	  }.bind(this), resultInitial);
	}.bind(undefined);

	var reduceIf$1 = Fun.curry(reduceIf);

	var _this$10 = undefined;

	/**
	 * Reduce the given array applying reduce function while shouldProceed function
	 * returns true.
	 */
	var reduceWhile = function (shouldProceed, reduce, resultInitial, array) {
	  _newArrowCheck$1(this, _this$10);

	  var result = resultInitial;

	  array.every(function (element, index) {
	    _newArrowCheck$1(this, _this$10);

	    var proceed = shouldProceed(element, index, result);

	    if (proceed) {
	      result = reduce(result, element, index);
	    }

	    return proceed;
	  }.bind(this));

	  return result;
	}.bind(undefined);

	var reduceWhile$1 = Fun.curry(reduceWhile);

	var _this$11 = undefined;

	/**
	 * Returns a new Array with the result of having removed the specified amount
	 * (count) of elements at the given index.
	 */
	var remove = function (index, count, array) {
	  _newArrowCheck$1(this, _this$11);

	  return [].concat(_toConsumableArray$1(array.slice(0, index)), _toConsumableArray$1(array.slice(index + count)));
	}.bind(undefined);

	var remove$1 = Fun.curry(remove);

	var _this$12 = undefined;

	/**
	 * Returns a new Array with the given size (count) filled with the specified
	 * element.
	 */
	var repeat = function (count, element) {
	  _newArrowCheck$1(this, _this$12);

	  return [].concat(_toConsumableArray$1(Array(count))).map(function () {
	    _newArrowCheck$1(this, _this$12);

	    return element;
	  }.bind(this));
	}.bind(undefined);

	var repeat$1 = Fun.curry(repeat);

	var _this$13 = undefined;

	/**
	 * Returns a new Array with the result of having replaced the elements at the
	 * given index with the ones specified.
	 */
	var replace = function (index, elements, array) {
	  _newArrowCheck$1(this, _this$13);

	  return [].concat(_toConsumableArray$1(array.slice(0, index)), _toConsumableArray$1(elements), _toConsumableArray$1(array.slice(index + elements.length)));
	}.bind(undefined);

	var replace$1 = Fun.curry(replace);

	var _this$14 = undefined;

	/**
	 * Returns an absolute index from a relative one.
	 * 
	 * Relative indexes differ from absolute ones in that they can be negative and
	 * in those cases it would be as simple as substracting them from the length of
	 * the array from where they belong to obtain their absolute counterparts.
	 */
	var resolveIndex = function (array, relativeIndex) {
	  _newArrowCheck$1(this, _this$14);

	  return relativeIndex < 0 ? array.length - relativeIndex : relativeIndex;
	}.bind(undefined);

	var resolveIndex$1 = Fun.curry(resolveIndex);

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype[UNSCOPABLES] == undefined) {
	  objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
	    configurable: true,
	    value: objectCreate(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};

	var $findIndex = arrayIteration.findIndex;



	var FIND_INDEX = 'findIndex';
	var SKIPS_HOLES = true;

	var USES_TO_LENGTH$2 = arrayMethodUsesToLength(FIND_INDEX);

	// Shouldn't skip holes
	if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES = false; });

	// `Array.prototype.findIndex` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.findindex
	_export({ target: 'Array', proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH$2 }, {
	  findIndex: function findIndex(callbackfn /* , that = undefined */) {
	    return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables(FIND_INDEX);

	var Fun$1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.flip = flip;
	exports.constant = constant;
	exports.on = on;
	exports.compose = compose;
	exports.pipe = pipe;
	exports.curry = curry;
	// eslint-disable-line no-redeclare

	// Flips the order of the arguments to a function of two arguments.
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare

	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare

	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	function flip(f) {
	  return function (b, a) {
	    return f(a, b);
	  };
	}

	// Returns its first argument and ignores its second.
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare

	function constant(a) {
	  return function () {
	    return a;
	  };
	}

	// The `on` function is used to change the domain of a binary operator.
	function on(o, f) {
	  return function (x, y) {
	    return o(f(x), f(y));
	  };
	}

	function compose() {
	  var _this = this;

	  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
	    fns[_key] = arguments[_key];
	  }

	  // eslint-disable-line no-redeclare
	  var len = fns.length - 1;
	  return function (x) {
	    var y = x;
	    for (var _i = len; _i > -1; _i--) {
	      y = fns[_i].call(_this, y);
	    }
	    return y;
	  };
	}

	function pipe() {
	  var _this2 = this;

	  for (var _len2 = arguments.length, fns = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    fns[_key2] = arguments[_key2];
	  }

	  // eslint-disable-line no-redeclare
	  var len = fns.length - 1;
	  return function (x) {
	    var y = x;
	    for (var _i2 = 0; _i2 <= len; _i2++) {
	      y = fns[_i2].call(_this2, y);
	    }
	    return y;
	  };
	}

	function curried(f, length, acc) {
	  return function () {
	    var combined = acc.concat(Array.prototype.slice.call(arguments));
	    return combined.length >= length ? f.apply(this, combined) : curried(f, length, combined);
	  };
	}

	function curry(f) {
	  // eslint-disable-line no-redeclare
	  return curried(f, f.length, []);
	}
	});

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = _toIobject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return _iterStep(1);
	  }
	  if (kind == 'keys') return _iterStep(0, index);
	  if (kind == 'values') return _iterStep(0, O[index]);
	  return _iterStep(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	_iterators.Arguments = _iterators.Array;

	var TO_STRING_TAG$1 = _wks('toStringTag');

	var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
	  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
	  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
	  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
	  'TextTrackList,TouchList').split(',');

	for (var i = 0; i < DOMIterables.length; i++) {
	  var NAME$1 = DOMIterables[i];
	  var Collection$1 = _global[NAME$1];
	  var proto = Collection$1 && Collection$1.prototype;
	  if (proto && !proto[TO_STRING_TAG$1]) _hide(proto, TO_STRING_TAG$1, NAME$1);
	  _iterators[NAME$1] = _iterators.Array;
	}

	var f$a = _wks;

	var _wksExt = {
		f: f$a
	};

	var iterator = _wksExt.f('iterator');

	var iterator$1 = createCommonjsModule(function (module) {
	module.exports = { "default": iterator, __esModule: true };
	});

	var _meta = createCommonjsModule(function (module) {
	var META = _uid('meta');


	var setDesc = _objectDp.f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !_fails(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};
	});

	var defineProperty$5 = _objectDp.f;
	var _wksDefine = function (name) {
	  var $Symbol = _core.Symbol || (_core.Symbol =  {} );
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty$5($Symbol, name, { value: _wksExt.f(name) });
	};

	// all enumerable object keys, includes symbols



	var _enumKeys = function (it) {
	  var result = _objectKeys(it);
	  var getSymbols = _objectGops.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = _objectPie.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};

	// 7.2.2 IsArray(argument)

	var _isArray = Array.isArray || function isArray(arg) {
	  return _cof(arg) == 'Array';
	};

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

	var hiddenKeys$2 = _enumBugKeys.concat('length', 'prototype');

	var f$b = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return _objectKeysInternal(O, hiddenKeys$2);
	};

	var _objectGopn = {
		f: f$b
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

	var gOPN = _objectGopn.f;
	var toString$3 = {}.toString;

	var windowNames$1 = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames$1 = function (it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames$1.slice();
	  }
	};

	var f$c = function getOwnPropertyNames(it) {
	  return windowNames$1 && toString$3.call(it) == '[object Window]' ? getWindowNames$1(it) : gOPN(_toIobject(it));
	};

	var _objectGopnExt = {
		f: f$c
	};

	var gOPD = Object.getOwnPropertyDescriptor;

	var f$d = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = _toIobject(O);
	  P = _toPrimitive(P, true);
	  if (_ie8DomDefine) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
	};

	var _objectGopd = {
		f: f$d
	};

	// ECMAScript 6 symbols shim





	var META = _meta.KEY;





















	var gOPD$1 = _objectGopd.f;
	var dP$1 = _objectDp.f;
	var gOPN$1 = _objectGopnExt.f;
	var $Symbol$1 = _global.Symbol;
	var $JSON = _global.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE$4 = 'prototype';
	var HIDDEN$1 = _wks('_hidden');
	var TO_PRIMITIVE$1 = _wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = _shared('symbol-registry');
	var AllSymbols$1 = _shared('symbols');
	var OPSymbols = _shared('op-symbols');
	var ObjectProto$1 = Object[PROTOTYPE$4];
	var USE_NATIVE = typeof $Symbol$1 == 'function' && !!_objectGops.f;
	var QObject$1 = _global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject$1 || !QObject$1[PROTOTYPE$4] || !QObject$1[PROTOTYPE$4].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = _descriptors && _fails(function () {
	  return _objectCreate(dP$1({}, 'a', {
	    get: function () { return dP$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD$1(ObjectProto$1, key);
	  if (protoDesc) delete ObjectProto$1[key];
	  dP$1(it, key, D);
	  if (protoDesc && it !== ObjectProto$1) dP$1(ObjectProto$1, key, protoDesc);
	} : dP$1;

	var wrap$1 = function (tag) {
	  var sym = AllSymbols$1[tag] = _objectCreate($Symbol$1[PROTOTYPE$4]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol$1 = USE_NATIVE && typeof $Symbol$1.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol$1;
	};

	var $defineProperty$1 = function defineProperty(it, key, D) {
	  if (it === ObjectProto$1) $defineProperty$1(OPSymbols, key, D);
	  _anObject(it);
	  key = _toPrimitive(key, true);
	  _anObject(D);
	  if (_has(AllSymbols$1, key)) {
	    if (!D.enumerable) {
	      if (!_has(it, HIDDEN$1)) dP$1(it, HIDDEN$1, _propertyDesc(1, {}));
	      it[HIDDEN$1][key] = true;
	    } else {
	      if (_has(it, HIDDEN$1) && it[HIDDEN$1][key]) it[HIDDEN$1][key] = false;
	      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP$1(it, key, D);
	};
	var $defineProperties$1 = function defineProperties(it, P) {
	  _anObject(it);
	  var keys = _enumKeys(P = _toIobject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty$1(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create$1 = function create(it, P) {
	  return P === undefined ? _objectCreate(it) : $defineProperties$1(_objectCreate(it), P);
	};
	var $propertyIsEnumerable$1 = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = _toPrimitive(key, true));
	  if (this === ObjectProto$1 && _has(AllSymbols$1, key) && !_has(OPSymbols, key)) return false;
	  return E || !_has(this, key) || !_has(AllSymbols$1, key) || _has(this, HIDDEN$1) && this[HIDDEN$1][key] ? E : true;
	};
	var $getOwnPropertyDescriptor$1 = function getOwnPropertyDescriptor(it, key) {
	  it = _toIobject(it);
	  key = _toPrimitive(key, true);
	  if (it === ObjectProto$1 && _has(AllSymbols$1, key) && !_has(OPSymbols, key)) return;
	  var D = gOPD$1(it, key);
	  if (D && _has(AllSymbols$1, key) && !(_has(it, HIDDEN$1) && it[HIDDEN$1][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames$1 = function getOwnPropertyNames(it) {
	  var names = gOPN$1(_toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!_has(AllSymbols$1, key = names[i++]) && key != HIDDEN$1 && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols$1 = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto$1;
	  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (_has(AllSymbols$1, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true)) result.push(AllSymbols$1[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol$1 = function Symbol() {
	    if (this instanceof $Symbol$1) throw TypeError('Symbol is not a constructor!');
	    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto$1) $set.call(OPSymbols, value);
	      if (_has(this, HIDDEN$1) && _has(this[HIDDEN$1], tag)) this[HIDDEN$1][tag] = false;
	      setSymbolDesc(this, tag, _propertyDesc(1, value));
	    };
	    if (_descriptors && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
	    return wrap$1(tag);
	  };
	  _redefine($Symbol$1[PROTOTYPE$4], 'toString', function toString() {
	    return this._k;
	  });

	  _objectGopd.f = $getOwnPropertyDescriptor$1;
	  _objectDp.f = $defineProperty$1;
	  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames$1;
	  _objectPie.f = $propertyIsEnumerable$1;
	  _objectGops.f = $getOwnPropertySymbols$1;

	  if (_descriptors && !_library) {
	    _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable$1);
	  }

	  _wksExt.f = function (name) {
	    return wrap$1(_wks(name));
	  };
	}

	_export$1(_export$1.G + _export$1.W + _export$1.F * !USE_NATIVE, { Symbol: $Symbol$1 });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)_wks(es6Symbols[j++]);

	for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

	_export$1(_export$1.S + _export$1.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return _has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol$1(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol$1(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});

	_export$1(_export$1.S + _export$1.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create$1,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty$1,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties$1,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor$1,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames$1,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols$1
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	var FAILS_ON_PRIMITIVES$2 = _fails(function () { _objectGops.f(1); });

	_export$1(_export$1.S + _export$1.F * FAILS_ON_PRIMITIVES$2, 'Object', {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return _objectGops.f(_toObject(it));
	  }
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && _export$1(_export$1.S + _export$1.F * (!USE_NATIVE || _fails(function () {
	  var S = $Symbol$1();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    $replacer = replacer = args[1];
	    if (!_isObject(replacer) && it === undefined || isSymbol$1(it)) return; // IE8 returns string on undefined
	    if (!_isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol$1(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol$1[PROTOTYPE$4][TO_PRIMITIVE$1] || _hide($Symbol$1[PROTOTYPE$4], TO_PRIMITIVE$1, $Symbol$1[PROTOTYPE$4].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	_setToStringTag($Symbol$1, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	_setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	_setToStringTag(_global.JSON, 'JSON', true);

	_wksDefine('asyncIterator');

	_wksDefine('observable');

	var symbol = _core.Symbol;

	var symbol$1 = createCommonjsModule(function (module) {
	module.exports = { "default": symbol, __esModule: true };
	});

	var _Symbol = /*@__PURE__*/getDefaultExportFromCjs(symbol$1);

	var _typeof_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _iterator2 = _interopRequireDefault(iterator$1);



	var _symbol2 = _interopRequireDefault(symbol$1);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};
	});

	var _typeof = /*@__PURE__*/getDefaultExportFromCjs(_typeof_1);

	var fastDeepEqual = function equal(a, b) {
	  if (a === b) return true;

	  var arrA = Array.isArray(a)
	    , arrB = Array.isArray(b)
	    , i;

	  if (arrA && arrB) {
	    if (a.length != b.length) return false;
	    for (i = 0; i < a.length; i++)
	      if (!equal(a[i], b[i])) return false;
	    return true;
	  }

	  if (arrA != arrB) return false;

	  if (a && b && typeof a === 'object' && typeof b === 'object') {
	    var keys = Object.keys(a);
	    if (keys.length !== Object.keys(b).length) return false;

	    var dateA = a instanceof Date
	      , dateB = b instanceof Date;
	    if (dateA && dateB) return a.getTime() == b.getTime();
	    if (dateA != dateB) return false;

	    var regexpA = a instanceof RegExp
	      , regexpB = b instanceof RegExp;
	    if (regexpA && regexpB) return a.toString() == b.toString();
	    if (regexpA != regexpB) return false;

	    for (i = 0; i < keys.length; i++)
	      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

	    for (i = 0; i < keys.length; i++)
	      if(!equal(a[keys[i]], b[keys[i]])) return false;

	    return true;
	  }

	  return false;
	};

	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	_export$1(_export$1.S + _export$1.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

	var $Object = _core.Object;
	var defineProperty$6 = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};

	var defineProperty$7 = createCommonjsModule(function (module) {
	module.exports = { "default": defineProperty$6, __esModule: true };
	});

	var defineProperty$8 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _defineProperty2 = _interopRequireDefault(defineProperty$7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};
	});

	var _defineProperty$1 = /*@__PURE__*/getDefaultExportFromCjs(defineProperty$8);

	var ITERATOR$4 = _wks('iterator');

	var core_isIterable = _core.isIterable = function (it) {
	  var O = Object(it);
	  return O[ITERATOR$4] !== undefined
	    || '@@iterator' in O
	    // eslint-disable-next-line no-prototype-builtins
	    || _iterators.hasOwnProperty(_classof(O));
	};

	var isIterable = core_isIterable;

	var isIterable$1 = createCommonjsModule(function (module) {
	module.exports = { "default": isIterable, __esModule: true };
	});

	var core_getIterator = _core.getIterator = function (it) {
	  var iterFn = core_getIteratorMethod(it);
	  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
	  return _anObject(iterFn.call(it));
	};

	var getIterator = core_getIterator;

	var getIterator$1 = createCommonjsModule(function (module) {
	module.exports = { "default": getIterator, __esModule: true };
	});

	var slicedToArray = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _isIterable3 = _interopRequireDefault(isIterable$1);



	var _getIterator3 = _interopRequireDefault(getIterator$1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();
	});

	var _slicedToArray = /*@__PURE__*/getDefaultExportFromCjs(slicedToArray);

	var isEnum$1 = _objectPie.f;
	var _objectToArray = function (isEntries) {
	  return function (it) {
	    var O = _toIobject(it);
	    var keys = _objectKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) {
	      key = keys[i++];
	      if (!_descriptors || isEnum$1.call(O, key)) {
	        result.push(isEntries ? [key, O[key]] : O[key]);
	      }
	    }
	    return result;
	  };
	};

	// https://github.com/tc39/proposal-object-values-entries

	var $entries = _objectToArray(true);

	_export$1(_export$1.S, 'Object', {
	  entries: function entries(it) {
	    return $entries(it);
	  }
	});

	var entries = _core.Object.entries;

	var entries$1 = createCommonjsModule(function (module) {
	module.exports = { "default": entries, __esModule: true };
	});

	var _Object$entries = /*@__PURE__*/getDefaultExportFromCjs(entries$1);

	var _this$a=void 0,get$1=function(e,r){return _newArrowCheck$1(this,_this$a),r[e]}.bind(void 0),get$1$1=Fun$1.curry(get$1),_this$2$2=void 0,isObject$1=function(e){return _newArrowCheck$1(this,_this$2$2),null!==e&&"object"===(void 0===e?"undefined":_typeof(e))}.bind(void 0),is$1=function(e){return _newArrowCheck$1(this,_this$2$2),Array.isArray(e)||isObject$1(e)}.bind(void 0),_this$1$2=void 0,getInIfNeeded=function(e,r,t){return _newArrowCheck$1(this,_this$1$2),isLastIndex$1(r,e)?t:getInRecur(e+1,r,t)}.bind(void 0),getNotCompositeErrorMessage=function(e,r,t){return _newArrowCheck$1(this,_this$1$2),"Expected to find a composite at ["+String(r.join(", "))+"]["+String(e)+"], but instead got: "+(void 0===t?"undefined":_typeof(t))}.bind(void 0),ensureIsComposite=function(e,r,t){if(_newArrowCheck$1(this,_this$1$2),is$1(t))return t;throw new Error(getNotCompositeErrorMessage(e,r,t))}.bind(void 0),getInRecur=function(e,r,t){return _newArrowCheck$1(this,_this$1$2),void 0===t?void 0:getInIfNeeded(e,r,get$1$1(r[e],ensureIsComposite(e,r,t)))}.bind(void 0),getIn=function(e,r){return _newArrowCheck$1(this,_this$1$2),0===e.length?void 0:getInRecur(0,e,r)}.bind(void 0),getIn$1=Fun$1.curry(getIn),_this$3$2=void 0,getKeys=function(e){return _newArrowCheck$1(this,_this$3$2),Array.isArray(e)?[].concat(_toConsumableArray$1(e.keys())):_Object$keys(e)}.bind(void 0),_this$4$2=void 0,hasIn=function(e,r,t){return _newArrowCheck$1(this,_this$4$2),fastDeepEqual(getIn$1(e,t),r)}.bind(void 0),hasIn$1=Fun$1.curry(hasIn),_this$5$2=void 0,hasKey=function(e,r){return _newArrowCheck$1(this,_this$5$2),Object.prototype.hasOwnProperty.call(r,e)}.bind(void 0),hasKey$1=Fun$1.curry(hasKey),_this$6$1=void 0,haveSameProps=function(e,r){_newArrowCheck$1(this,_this$6$1);var t=getKeys(e);return t.length===getKeys(r).length&&t.every(function(t){return _newArrowCheck$1(this,_this$6$1),hasKey$1(t,r)&&get$1$1(t,e)===get$1$1(t,r)}.bind(this))}.bind(void 0),haveSameProps$1=Fun$1.curry(haveSameProps),_this$7$1=void 0,isEmpty=function(e){return _newArrowCheck$1(this,_this$7$1),0===getKeys(e).length}.bind(void 0),_this$8$1=void 0,mapObject=function(e,r){return _newArrowCheck$1(this,_this$8$1),_Object$entries(r).reduce(function(t,i){var n=_slicedToArray(i,2),o=n[0],s=n[1];return _newArrowCheck$1(this,_this$8$1),_extends$1({},t,_defineProperty$1({},o,e(s,o,r)))}.bind(this),{})}.bind(void 0),map=function(e,r){return _newArrowCheck$1(this,_this$8$1),Array.isArray(r)?r.map(e):mapObject(e,r)}.bind(void 0),map$1=Fun$1.curry(map),_this$9$1=void 0,objectRemove=function(e,r){r[e];var t=_objectWithoutProperties$1(r,[e]);return _newArrowCheck$1(this,_this$9$1),t}.bind(void 0),remove$1$1=function(e,r){return _newArrowCheck$1(this,_this$9$1),Array.isArray(r)?remove$1(e,1,r):objectRemove(e,r)}.bind(void 0),remove$2=Fun$1.curry(remove$1$1),_this$12$1=void 0,shallowCopy=function(e){return _newArrowCheck$1(this,_this$12$1),Array.isArray(e)?[].concat(_toConsumableArray$1(e)):_extends$1({},e)}.bind(void 0),_this$11$1=void 0,createReduceContext=function(e){_newArrowCheck$1(this,_this$11$1);var r=shallowCopy(e);return {origin:r,current:r,previous:void 0}}.bind(void 0),set$1=function(e,r,t){return _newArrowCheck$1(this,_this$11$1),t[e]=r,get$1$1(e,t)}.bind(void 0),updateSet=function(e,r,t,i){return _newArrowCheck$1(this,_this$11$1),_extends$1({},i,{current:set$1(e[r],t,i.current),previous:i.current})}.bind(void 0),updateRemove=function(e,r,t){_newArrowCheck$1(this,_this$11$1);var i=remove$2(e[r],t.current);return 0===r?_extends$1({},t,{current:i,origin:i}):_extends$1({},t,{previous:set$1(e[r-1],i,t.previous)})}.bind(void 0),removeAction=_Symbol("composite.updateIn.removeAction"),update=function(e,r,t,i){return _newArrowCheck$1(this,_this$11$1),t===removeAction?updateRemove(e,r,i):updateSet(e,r,t,i)}.bind(void 0),createSupporting=function(e){return _newArrowCheck$1(this,_this$11$1),"number"==typeof e?[]:{}}.bind(void 0),copyOrCreate=function(e,r,t){return _newArrowCheck$1(this,_this$11$1),hasKey$1(e,t)?shallowCopy(get$1$1(e,t)):createSupporting(r)}.bind(void 0),getNext=function(e,r,t,i){return _newArrowCheck$1(this,_this$11$1),isLastIndex$1(e,t)?r(get$1$1(e[t],i)):copyOrCreate(e[t],e[t+1],i)}.bind(void 0),getReducer=function(e,r){return _newArrowCheck$1(this,_this$11$1),function(t,i,n){return _newArrowCheck$1(this,_this$11$1),update(e,n,getNext(e,r,n,t.current),t)}.bind(this)}.bind(void 0),updateIn=function(e,r,t){return _newArrowCheck$1(this,_this$11$1),0===e.length?t:e.reduce(getReducer(e,r),createReduceContext(t)).origin}.bind(void 0),updateInCurried=Fun$1.curry(updateIn);updateInCurried.remove=removeAction;var _this$10$1=void 0,remove$3=function(){return _newArrowCheck$1(this,_this$10$1),updateInCurried.remove}.bind(void 0),removeIn=function(e,r){return _newArrowCheck$1(this,_this$10$1),updateInCurried(e,remove$3,r)}.bind(void 0),removeIn$1=Fun$1.curry(removeIn),_this$13$1=void 0,set$1$1=function(e,r,t){_newArrowCheck$1(this,_this$13$1);var i=shallowCopy(t);return i[e]=r,i}.bind(void 0),set$2=Fun$1.curry(set$1$1),_this$14$1=void 0,setIn=function(e,r,t){return _newArrowCheck$1(this,_this$14$1),updateInCurried(e,function(){return _newArrowCheck$1(this,_this$14$1),r}.bind(this),t)}.bind(void 0),setIn$1=Fun$1.curry(setIn),_this$15=void 0,xor=function(e,r){return _newArrowCheck$1(this,_this$15),Boolean(Number(e)^Number(r))}.bind(void 0),shallowEqual=function(e,r){return _newArrowCheck$1(this,_this$15),e===r||!xor(Array.isArray(e),Array.isArray(r))&&haveSameProps$1(e,r)}.bind(void 0),shallowEqual$1=Fun$1.curry(shallowEqual),_this$16=void 0,toUndefinedIfEmpty=function(e){return _newArrowCheck$1(this,_this$16),isEmpty(e)?void 0:e}.bind(void 0);

	var _this$b = undefined;

	var findIndex = function findIndex(notifiers, key, value) {
	  newArrowCheck(this, _this$b);

	  return (// $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
	    notifiers.findIndex(hasIn$1([key], value))
	  );
	}.bind(undefined);

	var _this$c = undefined;

	var refresh = function refresh(notifier) {
	  var _this2 = this;

	  newArrowCheck(this, _this$c);

	  return function (notifiers) {
	    newArrowCheck(this, _this2);

	    return replace$1(findIndex(notifiers, "request", notifier.request), [notifier], notifiers);
	  }.bind(this);
	}.bind(undefined);

	var _this$d = undefined;

	var remove$4 = function remove(notifier) {
	  var _this2 = this;

	  newArrowCheck(this, _this$d);

	  return function (notifiers) {
	    newArrowCheck(this, _this2);

	    return remove$1(findIndex(notifiers, "request", notifier.request), 1, notifiers);
	  }.bind(this);
	}.bind(undefined);

	var _this$e = undefined;

	var updateNotifiers = function updateNotifiers(absintheSocket, updater) {
	  newArrowCheck(this, _this$e);

	  absintheSocket.notifiers = updater(absintheSocket.notifiers);
	  return absintheSocket;
	}.bind(undefined);

	var _this$f = undefined;

	var refreshNotifier = function refreshNotifier(absintheSocket, notifier) {
	  newArrowCheck(this, _this$f);

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

	var _global$1 = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core$1 = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.6.0' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});

	var _isObject$1 = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject$1 = function (it) {
	  if (!_isObject$1(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails$1 = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors$1 = !_fails$1(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$4 = _global$1.document;
	// typeof document.createElement is 'object' in old IE
	var is$2 = _isObject$1(document$4) && _isObject$1(document$4.createElement);
	var _domCreate$1 = function (it) {
	  return is$2 ? document$4.createElement(it) : {};
	};

	var _ie8DomDefine$1 = !_descriptors$1 && !_fails$1(function () {
	  return Object.defineProperty(_domCreate$1('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive$1 = function (it, S) {
	  if (!_isObject$1(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject$1(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject$1(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject$1(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP$2 = Object.defineProperty;

	var f$e = _descriptors$1 ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject$1(O);
	  P = _toPrimitive$1(P, true);
	  _anObject$1(Attributes);
	  if (_ie8DomDefine$1) try {
	    return dP$2(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp$1 = {
		f: f$e
	};

	var _propertyDesc$1 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide$1 = _descriptors$1 ? function (object, key, value) {
	  return _objectDp$1.f(object, key, _propertyDesc$1(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty$2 = {}.hasOwnProperty;
	var _has$1 = function (it, key) {
	  return hasOwnProperty$2.call(it, key);
	};

	var id$2 = 0;
	var px$1 = Math.random();
	var _uid$1 = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id$2 + px$1).toString(36));
	};

	var _redefine$1 = createCommonjsModule(function (module) {
	var SRC = _uid$1('src');
	var TO_STRING = 'toString';
	var $toString = Function[TO_STRING];
	var TPL = ('' + $toString).split(TO_STRING);

	_core$1.inspectSource = function (it) {
	  return $toString.call(it);
	};

	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) _has$1(val, 'name') || _hide$1(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) _has$1(val, SRC) || _hide$1(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === _global$1) {
	    O[key] = val;
	  } else if (!safe) {
	    delete O[key];
	    _hide$1(O, key, val);
	  } else if (O[key]) {
	    O[key] = val;
	  } else {
	    _hide$1(O, key, val);
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});
	});

	var _aFunction$1 = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx$1 = function (fn, that, length) {
	  _aFunction$1(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var PROTOTYPE$5 = 'prototype';

	var $export$1 = function (type, name, source) {
	  var IS_FORCED = type & $export$1.F;
	  var IS_GLOBAL = type & $export$1.G;
	  var IS_STATIC = type & $export$1.S;
	  var IS_PROTO = type & $export$1.P;
	  var IS_BIND = type & $export$1.B;
	  var target = IS_GLOBAL ? _global$1 : IS_STATIC ? _global$1[name] || (_global$1[name] = {}) : (_global$1[name] || {})[PROTOTYPE$5];
	  var exports = IS_GLOBAL ? _core$1 : _core$1[name] || (_core$1[name] = {});
	  var expProto = exports[PROTOTYPE$5] || (exports[PROTOTYPE$5] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? _ctx$1(out, _global$1) : IS_PROTO && typeof out == 'function' ? _ctx$1(Function.call, out) : out;
	    // extend global
	    if (target) _redefine$1(target, key, out, type & $export$1.U);
	    // export
	    if (exports[key] != out) _hide$1(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	_global$1.core = _core$1;
	// type bitmap
	$export$1.F = 1;   // forced
	$export$1.G = 2;   // global
	$export$1.S = 4;   // static
	$export$1.P = 8;   // proto
	$export$1.B = 16;  // bind
	$export$1.W = 32;  // wrap
	$export$1.U = 64;  // safe
	$export$1.R = 128; // real proto method for `library`
	var _export$2 = $export$1;

	var toString$4 = {}.toString;

	var _cof$1 = function (it) {
	  return toString$4.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject$1 = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof$1(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined$1 = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// 7.1.13 ToObject(argument)

	var _toObject$1 = function (it) {
	  return Object(_defined$1(it));
	};

	// 7.1.4 ToInteger
	var ceil$2 = Math.ceil;
	var floor$3 = Math.floor;
	var _toInteger$1 = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor$3 : ceil$2)(it);
	};

	// 7.1.15 ToLength

	var min$4 = Math.min;
	var _toLength$1 = function (it) {
	  return it > 0 ? min$4(_toInteger$1(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	// 7.2.2 IsArray(argument)

	var _isArray$1 = Array.isArray || function isArray(arg) {
	  return _cof$1(arg) == 'Array';
	};

	var _shared$1 = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global$1[SHARED] || (_global$1[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core$1.version,
	  mode:  'global',
	  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
	});
	});

	var _wks$1 = createCommonjsModule(function (module) {
	var store = _shared$1('wks');

	var Symbol = _global$1.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid$1)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var SPECIES$2 = _wks$1('species');

	var _arraySpeciesConstructor = function (original) {
	  var C;
	  if (_isArray$1(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || _isArray$1(C.prototype))) C = undefined;
	    if (_isObject$1(C)) {
	      C = C[SPECIES$2];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


	var _arraySpeciesCreate = function (original, length) {
	  return new (_arraySpeciesConstructor(original))(length);
	};

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex





	var _arrayMethods = function (TYPE, $create) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  var create = $create || _arraySpeciesCreate;
	  return function ($this, callbackfn, that) {
	    var O = _toObject$1($this);
	    var self = _iobject$1(O);
	    var f = _ctx$1(callbackfn, that, 3);
	    var length = _toLength$1(self.length);
	    var index = 0;
	    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var val, res;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      val = self[index];
	      res = f(val, index, O);
	      if (TYPE) {
	        if (IS_MAP) result[index] = res;   // map
	        else if (res) switch (TYPE) {
	          case 3: return true;             // some
	          case 5: return val;              // find
	          case 6: return index;            // findIndex
	          case 2: result.push(val);        // filter
	        } else if (IS_EVERY) return false; // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

	var _strictMethod = function (method, arg) {
	  return !!method && _fails$1(function () {
	    // eslint-disable-next-line no-useless-call
	    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
	  });
	};

	var $map = _arrayMethods(1);

	_export$2(_export$2.P + _export$2.F * !_strictMethod([].map, true), 'Array', {
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments[1]);
	  }
	});

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt$1 = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(_defined$1(that));
	    var i = _toInteger$1(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var at = _stringAt$1(true);

	 // `AdvanceStringIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-advancestringindex
	var _advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? at(S, index).length : 1);
	};

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG$2 = _wks$1('toStringTag');
	// ES3 wrong here
	var ARG$1 = _cof$1(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet$1 = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	var _classof$1 = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet$1(O = Object(it), TAG$2)) == 'string' ? T
	    // builtinTag case
	    : ARG$1 ? _cof$1(O)
	    // ES3 arguments fallback
	    : (B = _cof$1(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var builtinExec = RegExp.prototype.exec;

	 // `RegExpExec` abstract operation
	// https://tc39.github.io/ecma262/#sec-regexpexec
	var _regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);
	    if (typeof result !== 'object') {
	      throw new TypeError('RegExp exec method returned something other than an Object or null');
	    }
	    return result;
	  }
	  if (_classof$1(R) !== 'RegExp') {
	    throw new TypeError('RegExp#exec called on incompatible receiver');
	  }
	  return builtinExec.call(R, S);
	};

	// 21.2.5.3 get RegExp.prototype.flags

	var _flags = function () {
	  var that = _anObject$1(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var nativeExec = RegExp.prototype.exec;
	// This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.
	var nativeReplace = String.prototype.replace;

	var patchedExec = nativeExec;

	var LAST_INDEX = 'lastIndex';

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/,
	      re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
	})();

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + re.source + '$(?!\\s)', _flags.call(re));
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

	    match = nativeExec.call(re, str);

	    if (UPDATES_LAST_INDEX_WRONG && match) {
	      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      // eslint-disable-next-line no-loop-func
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    return match;
	  };
	}

	var _regexpExec = patchedExec;

	_export$2({
	  target: 'RegExp',
	  proto: true,
	  forced: _regexpExec !== /./.exec
	}, {
	  exec: _regexpExec
	});

	var SPECIES$3 = _wks$1('species');

	var REPLACE_SUPPORTS_NAMED_GROUPS = !_fails$1(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  return ''.replace(re, '$<a>') !== '7';
	});

	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
	  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
	})();

	var _fixReWks = function (KEY, length, exec) {
	  var SYMBOL = _wks$1(KEY);

	  var DELEGATES_TO_SYMBOL = !_fails$1(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !_fails$1(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;
	    re.exec = function () { execCalled = true; return null; };
	    if (KEY === 'split') {
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES$3] = function () { return re; };
	    }
	    re[SYMBOL]('');
	    return !execCalled;
	  }) : undefined;

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
	    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
	  ) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var fns = exec(
	      _defined$1,
	      SYMBOL,
	      ''[KEY],
	      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
	        if (regexp.exec === _regexpExec) {
	          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	            // The native String method already delegates to @@method (this
	            // polyfilled function), leasing to infinite recursion.
	            // We avoid it by directly calling the native @@method method.
	            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
	          }
	          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
	        }
	        return { done: false };
	      }
	    );
	    var strfn = fns[0];
	    var rxfn = fns[1];

	    _redefine$1(String.prototype, KEY, strfn);
	    _hide$1(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) { return rxfn.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) { return rxfn.call(string, this); }
	    );
	  }
	};

	// @@match logic
	_fixReWks('match', 1, function (defined, MATCH, $match, maybeCallNative) {
	  return [
	    // `String.prototype.match` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.match
	    function match(regexp) {
	      var O = defined(this);
	      var fn = regexp == undefined ? undefined : regexp[MATCH];
	      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	    },
	    // `RegExp.prototype[@@match]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
	    function (regexp) {
	      var res = maybeCallNative($match, regexp, this);
	      if (res.done) return res.value;
	      var rx = _anObject$1(regexp);
	      var S = String(this);
	      if (!rx.global) return _regexpExecAbstract(rx, S);
	      var fullUnicode = rx.unicode;
	      rx.lastIndex = 0;
	      var A = [];
	      var n = 0;
	      var result;
	      while ((result = _regexpExecAbstract(rx, S)) !== null) {
	        var matchStr = String(result[0]);
	        A[n] = matchStr;
	        if (matchStr === '') rx.lastIndex = _advanceStringIndex(S, _toLength$1(rx.lastIndex), fullUnicode);
	        n++;
	      }
	      return n === 0 ? null : A;
	    }
	  ];
	});

	var $some = _arrayMethods(3);

	_export$2(_export$2.P + _export$2.F * !_strictMethod([].some, true), 'Array', {
	  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	  some: function some(callbackfn /* , thisArg */) {
	    return $some(this, callbackfn, arguments[1]);
	  }
	});

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	var _invoke = function (fn, args, that) {
	  var un = that === undefined;
	  switch (args.length) {
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return fn.apply(that, args);
	};

	var arraySlice = [].slice;
	var factories$1 = {};

	var construct$1 = function (F, len, args) {
	  if (!(len in factories$1)) {
	    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
	    // eslint-disable-next-line no-new-func
	    factories$1[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  } return factories$1[len](F, args);
	};

	var _bind = Function.bind || function bind(that /* , ...args */) {
	  var fn = _aFunction$1(this);
	  var partArgs = arraySlice.call(arguments, 1);
	  var bound = function (/* args... */) {
	    var args = partArgs.concat(arraySlice.call(arguments));
	    return this instanceof bound ? construct$1(fn, args.length, args) : _invoke(fn, args, that);
	  };
	  if (_isObject$1(fn.prototype)) bound.prototype = fn.prototype;
	  return bound;
	};

	// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)


	_export$2(_export$2.P, 'Function', { bind: _bind });

	function _newArrowCheck$2(innerThis, boundThis) {
	  if (innerThis !== boundThis) {
	    throw new TypeError("Cannot instantiate an arrow function");
	  }
	}

	var newArrowCheck$2 = _newArrowCheck$2;

	var _this$g = undefined;

	var locationsToString = function locationsToString(locations) {
	  var _this2 = this;

	  newArrowCheck$2(this, _this$g);

	  return locations.map(function (_ref) {
	    var column = _ref.column,
	        line = _ref.line;

	    newArrowCheck$2(this, _this2);

	    return "".concat(line, ":").concat(column);
	  }.bind(this)).join("; ");
	}.bind(undefined);

	var errorToString = function errorToString(_ref2) {
	  var message = _ref2.message,
	      locations = _ref2.locations;

	  newArrowCheck$2(this, _this$g);

	  return message + (locations ? " (".concat(locationsToString(locations), ")") : "");
	}.bind(undefined);
	/**
	 * Transforms an array of GqlError into a string.
	 *
	 * @example
	 *
	 * const gqlRespose = {
	 *   errors: [
	 *     {message: "First Error", locations: [{column: 10, line: 2}]},
	 *     {message: "Second Error", locations: [{column: 2, line: 4}]}
	 *   ]
	 * }
	 *
	 * const error = errorsToString(gqlRespose.errors);
	 * // string with the following:
	 * // First Error (2:10)
	 * // Second Error (4:2)
	 */


	var errorsToString = function errorsToString(gqlErrors) {
	  newArrowCheck$2(this, _this$g);

	  return gqlErrors.map(errorToString).join("\n");
	}.bind(undefined);

	var _this$1$3 = undefined;

	var operationTypeRe = /^\s*(query|mutation|subscription|\{)/;

	var getOperationTypeFromMatched = function getOperationTypeFromMatched(matched) {
	  newArrowCheck$2(this, _this$1$3);

	  return matched === "{" ? "query" : matched;
	}.bind(undefined);
	/**
	 * Returns the type (query, mutation, or subscription) of the given operation
	 *
	 * @example
	 *
	 * const operation = `
	 *   subscription userSubscription($userId: ID!) {
	 *     user(userId: $userId) {
	 *       id
	 *       name
	 *     }
	 *   }
	 * `;
	 *
	 * const operationType = getOperationType(operation);
	 *
	 * console.log(operationType); // "subscription"
	 */


	var getOperationType = function getOperationType(operation) {
	  newArrowCheck$2(this, _this$1$3);

	  var result = operation.match(operationTypeRe);

	  if (!result) {
	    throw new TypeError("Invalid operation:\n".concat(operation));
	  }

	  return getOperationTypeFromMatched(result[1]);
	}.bind(undefined);

	var _this$2$3 = undefined;

	var isSubscription = function isSubscription(definition) {
	  newArrowCheck$2(this, _this$2$3);

	  return definition.kind === "OperationDefinition" && definition.operation === "subscription";
	}.bind(undefined);
	/**
	 * Returns true if documentNode has a subscription or false otherwise
	 */


	var hasSubscription = function hasSubscription(documentNode) {
	  newArrowCheck$2(this, _this$2$3);

	  return documentNode.definitions.some(isSubscription);
	}.bind(undefined);

	var _this$3$3 = undefined;

	/**
	 * Creates a GqlRequest using given GqlRequestCompat
	 *
	 * @param {GqlRequestCompat<Variables>} gqlRequestCompat
	 *
	 * @return {GqlRequest<Variables>} 
	 *
	 * @example
	 * const query = `
	 *   query userQuery($userId: ID!) {
	 *     user(userId: $userId) {
	 *       id
	 *       email
	 *     }
	 *   }
	 * `;
	 * 
	 * console.log(requestFromCompat({query, variables: {userId: 10}}));
	 * // {operation: "...", variables: {userId: 10}}
	 */
	var requestFromCompat = function requestFromCompat(_ref) {
	  var operation = _ref.query,
	      variables = _ref.variables;

	  newArrowCheck$2(this, _this$3$3);

	  return variables ? {
	    operation: operation,
	    variables: variables
	  } : {
	    operation: operation
	  };
	}.bind(undefined);

	var _this$4$3 = undefined;

	/**
	 * Creates a GqlRequest using given GqlRequestCompat
	 *
	 * @param {GqlRequest<Variables>} gqlRequest
	 *
	 * @return {GqlRequestCompat<Variables>}
	 * 
	 * @example
	 * const operation = `
	 *   query userQuery($userId: ID!) {
	 *     user(userId: $userId) {
	 *       id
	 *       email
	 *     }
	 *   }
	 * `;
	 * 
	 * console.log(requestToCompat({operation, variables: {userId: 10}}));
	 * // {query: "...", variables: {userId: 10}}
	 */
	var requestToCompat = function requestToCompat(_ref) {
	  var query = _ref.operation,
	      variables = _ref.variables;

	  newArrowCheck$2(this, _this$4$3);

	  return variables ? {
	    query: query,
	    variables: variables
	  } : {
	    query: query
	  };
	}.bind(undefined);

	var _this$h = undefined;

	var getObservers = function getObservers(_ref) {
	  newArrowCheck(this, _this$h);

	  var activeObservers = _ref.activeObservers,
	      canceledObservers = _ref.canceledObservers;
	  return [].concat(toConsumableArray(activeObservers), toConsumableArray(canceledObservers));
	}.bind(undefined);

	var notify = function notify(notifier, event) {
	  newArrowCheck(this, _this$h);

	  notifyAll(getObservers(notifier), event);
	  return notifier;
	}.bind(undefined);

	var _this$i = undefined;

	var abortNotifier = function abortNotifier(absintheSocket, notifier, error) {
	  newArrowCheck(this, _this$i);

	  return updateNotifiers(absintheSocket, remove$4(notify(notifier, createAbortEvent(error))));
	}.bind(undefined);

	var $find = arrayIteration.find;



	var FIND = 'find';
	var SKIPS_HOLES$1 = true;

	var USES_TO_LENGTH$3 = arrayMethodUsesToLength(FIND);

	// Shouldn't skip holes
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES$1 = false; });

	// `Array.prototype.find` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.find
	_export({ target: 'Array', proto: true, forced: SKIPS_HOLES$1 || !USES_TO_LENGTH$3 }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables(FIND);

	var _this$j = undefined;

	var find = function find(notifiers, key, value) {
	  newArrowCheck(this, _this$j);

	  return (// $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
	    notifiers.find(hasIn$1([key], value))
	  );
	}.bind(undefined);

	var _this$k = undefined;

	var notifyActive = function notifyActive(notifier, event) {
	  newArrowCheck(this, _this$k);

	  notifyAll(notifier.activeObservers, event);
	  return notifier;
	}.bind(undefined);

	var _this$l = undefined;

	var notifyResultEvent = function notifyResultEvent(notifier, result) {
	  newArrowCheck(this, _this$l);

	  return notifyActive(notifier, createResultEvent(result));
	}.bind(undefined);

	var _this$m = undefined;

	var notifyStartEvent = function notifyStartEvent(notifier) {
	  newArrowCheck(this, _this$m);

	  return notifyActive(notifier, createStartEvent(notifier));
	}.bind(undefined);

	var _this$n = undefined;

	function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { defineProperty$3(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	var reset = function reset(notifier) {
	  newArrowCheck(this, _this$n);

	  return flushCanceled(_objectSpread$2(_objectSpread$2({}, notifier), {}, {
	    isActive: true,
	    requestStatus: requestStatuses.pending,
	    subscriptionId: undefined
	  }));
	}.bind(undefined);

	var _this$o = undefined;

	var handlePush = function handlePush(push, handler) {
	  newArrowCheck(this, _this$o);

	  return push.receive("ok", handler.onSucceed).receive("error", handler.onError).receive("timeout", handler.onTimeout);
	}.bind(undefined);

	var _this$p = undefined;

	var getPushHandlerMethodGetter = function getPushHandlerMethodGetter(absintheSocket, request) {
	  var _this2 = this;

	  newArrowCheck(this, _this$p);

	  return function (handle) {
	    newArrowCheck(this, _this2);

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
	  newArrowCheck(this, _this$p);

	  return map$1(getPushHandlerMethodGetter(absintheSocket, request), notifierPushHandler);
	}.bind(undefined);

	var pushAbsintheEvent = function pushAbsintheEvent(absintheSocket, request, notifierPushHandler, absintheEvent) {
	  newArrowCheck(this, _this$p);

	  handlePush(absintheSocket.channel.push(absintheEvent.name, absintheEvent.payload), getPushHandler(absintheSocket, request, notifierPushHandler));
	  return absintheSocket;
	}.bind(undefined);

	var absintheEventNames = {
	  doc: "doc",
	  unsubscribe: "unsubscribe"
	};

	var _this$q = undefined;

	var createAbsintheUnsubscribeEvent = function createAbsintheUnsubscribeEvent(payload) {
	  newArrowCheck(this, _this$q);

	  return {
	    payload: payload,
	    name: absintheEventNames.unsubscribe
	  };
	}.bind(undefined);

	var createAbsintheDocEvent = function createAbsintheDocEvent(payload) {
	  newArrowCheck(this, _this$q);

	  return {
	    payload: payload,
	    name: absintheEventNames.doc
	  };
	}.bind(undefined);

	var _this$r = undefined;

	function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$4(Object(source), true).forEach(function (key) { defineProperty$3(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	var pushAbsintheDocEvent = function pushAbsintheDocEvent(absintheSocket, _ref, notifierPushHandler) {
	  newArrowCheck(this, _this$r);

	  var request = _ref.request;
	  return pushAbsintheEvent(absintheSocket, request, notifierPushHandler, createAbsintheDocEvent(requestToCompat(request)));
	}.bind(undefined);

	var setNotifierRequestStatusSending = function setNotifierRequestStatusSending(absintheSocket, notifier) {
	  newArrowCheck(this, _this$r);

	  return refreshNotifier(absintheSocket, _objectSpread$3(_objectSpread$3({}, notifier), {}, {
	    requestStatus: requestStatuses.sending
	  }));
	}.bind(undefined);

	var createRequestError = function createRequestError(message) {
	  newArrowCheck(this, _this$r);

	  return new Error("request: ".concat(message));
	}.bind(undefined);

	var onTimeout = function onTimeout(absintheSocket, notifier) {
	  newArrowCheck(this, _this$r);

	  return notifyActive(notifier, createErrorEvent(createRequestError("timeout")));
	}.bind(undefined);

	var onError = function onError(absintheSocket, notifier, errorMessage) {
	  newArrowCheck(this, _this$r);

	  return abortNotifier(absintheSocket, notifier, createRequestError(errorMessage));
	}.bind(undefined);

	var getNotifierPushHandler = function getNotifierPushHandler(onSucceed) {
	  newArrowCheck(this, _this$r);

	  return {
	    onError: onError,
	    onSucceed: onSucceed,
	    onTimeout: onTimeout
	  };
	}.bind(undefined);

	var pushRequestUsing = function pushRequestUsing(absintheSocket, notifier, onSucceed) {
	  newArrowCheck(this, _this$r);

	  return pushAbsintheDocEvent(absintheSocket, setNotifierRequestStatusSending(absintheSocket, notifier), getNotifierPushHandler(onSucceed));
	}.bind(undefined);

	var _this$s = undefined;

	function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$5(Object(source), true).forEach(function (key) { defineProperty$3(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	var onUnsubscribeSucceedCanceled = function onUnsubscribeSucceedCanceled(absintheSocket, notifier) {
	  newArrowCheck(this, _this$s);

	  return updateNotifiers(absintheSocket, remove$4(flushCanceled(notifier)));
	}.bind(undefined);

	var onUnsubscribeSucceedActive = function onUnsubscribeSucceedActive(absintheSocket, notifier) {
	  newArrowCheck(this, _this$s);

	  return subscribe(absintheSocket, refreshNotifier(absintheSocket, reset(notifier)));
	}.bind(undefined);

	var createUnsubscribeError = function createUnsubscribeError(message) {
	  newArrowCheck(this, _this$s);

	  return new Error("unsubscribe: ".concat(message));
	}.bind(undefined);

	var unsubscribeHandler = {
	  onError: function onError(absintheSocket, notifier, errorMessage) {
	    newArrowCheck(this, _this$s);

	    return abortNotifier(absintheSocket, notifier, createUnsubscribeError(errorMessage));
	  }.bind(undefined),
	  onTimeout: function onTimeout(absintheSocket, notifier) {
	    newArrowCheck(this, _this$s);

	    return notifyCanceled(notifier, createErrorEvent(createUnsubscribeError("timeout")));
	  }.bind(undefined),
	  onSucceed: function onSucceed(absintheSocket, notifier) {
	    newArrowCheck(this, _this$s);

	    if (notifier.isActive) {
	      onUnsubscribeSucceedActive(absintheSocket, notifier);
	    } else {
	      onUnsubscribeSucceedCanceled(absintheSocket, notifier);
	    }
	  }.bind(undefined)
	};

	var pushAbsintheUnsubscribeEvent = function pushAbsintheUnsubscribeEvent(absintheSocket, _ref) {
	  newArrowCheck(this, _this$s);

	  var request = _ref.request,
	      subscriptionId = _ref.subscriptionId;
	  return pushAbsintheEvent(absintheSocket, request, unsubscribeHandler, createAbsintheUnsubscribeEvent({
	    subscriptionId: subscriptionId
	  }));
	}.bind(undefined);

	var unsubscribe = function unsubscribe(absintheSocket, notifier) {
	  newArrowCheck(this, _this$s);

	  return pushAbsintheUnsubscribeEvent(absintheSocket, refreshNotifier(absintheSocket, _objectSpread$4(_objectSpread$4({}, notifier), {}, {
	    requestStatus: requestStatuses.canceling
	  })));
	}.bind(undefined);

	var onSubscribeSucceed = function onSubscribeSucceed(absintheSocket, notifier, _ref2) {
	  newArrowCheck(this, _this$s);

	  var subscriptionId = _ref2.subscriptionId;
	  var subscribedNotifier = refreshNotifier(absintheSocket, _objectSpread$4(_objectSpread$4({}, notifier), {}, {
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
	  newArrowCheck(this, _this$s);

	  if (response.errors) {
	    onError(absintheSocket, notifier, errorsToString(response.errors));
	  } else {
	    onSubscribeSucceed(absintheSocket, notifier, response);
	  }
	}.bind(undefined);

	var subscribe = function subscribe(absintheSocket, notifier) {
	  newArrowCheck(this, _this$s);

	  return pushRequestUsing(absintheSocket, notifier, onSubscribe);
	}.bind(undefined);

	var onDataMessage = function onDataMessage(absintheSocket, _ref3) {
	  newArrowCheck(this, _this$s);

	  var payload = _ref3.payload;
	  var notifier = find(absintheSocket.notifiers, "subscriptionId", payload.subscriptionId);

	  if (notifier) {
	    notifyResultEvent(notifier, payload.result);
	  }
	}.bind(undefined);

	var dataMessageEventName = "subscription:data";

	var isDataMessage = function isDataMessage(message) {
	  newArrowCheck(this, _this$s);

	  return message.event === dataMessageEventName;
	}.bind(undefined);

	var _this$t = undefined;

	var cancelQueryOrMutationSending = function cancelQueryOrMutationSending(absintheSocket, notifier) {
	  newArrowCheck(this, _this$t);

	  return updateNotifiers(absintheSocket, refresh(flushCanceled(cancel(notifier))));
	}.bind(undefined);

	var cancelQueryOrMutationIfSending = function cancelQueryOrMutationIfSending(absintheSocket, notifier) {
	  newArrowCheck(this, _this$t);

	  return notifier.requestStatus === requestStatuses.sending ? cancelQueryOrMutationSending(absintheSocket, notifier) : absintheSocket;
	}.bind(undefined);

	var cancelPending = function cancelPending(absintheSocket, notifier) {
	  newArrowCheck(this, _this$t);

	  return updateNotifiers(absintheSocket, remove$4(flushCanceled(cancel(notifier))));
	}.bind(undefined);

	var cancelQueryOrMutation = function cancelQueryOrMutation(absintheSocket, notifier) {
	  newArrowCheck(this, _this$t);

	  return notifier.requestStatus === requestStatuses.pending ? cancelPending(absintheSocket, notifier) : cancelQueryOrMutationIfSending(absintheSocket, notifier);
	}.bind(undefined);

	var unsubscribeIfNeeded = function unsubscribeIfNeeded(absintheSocket, notifier) {
	  newArrowCheck(this, _this$t);

	  return notifier.requestStatus === requestStatuses.sent ? unsubscribe(absintheSocket, notifier) : absintheSocket;
	}.bind(undefined);

	var cancelNonPendingSubscription = function cancelNonPendingSubscription(absintheSocket, notifier) {
	  newArrowCheck(this, _this$t);

	  return unsubscribeIfNeeded(absintheSocket, refreshNotifier(absintheSocket, cancel(notifier)));
	}.bind(undefined);

	var cancelSubscription = function cancelSubscription(absintheSocket, notifier) {
	  newArrowCheck(this, _this$t);

	  return notifier.requestStatus === requestStatuses.pending ? cancelPending(absintheSocket, notifier) : cancelNonPendingSubscription(absintheSocket, notifier);
	}.bind(undefined);

	var cancelActive = function cancelActive(absintheSocket, notifier) {
	  newArrowCheck(this, _this$t);

	  return notifier.operationType === "subscription" ? cancelSubscription(absintheSocket, notifier) : cancelQueryOrMutation(absintheSocket, notifier);
	}.bind(undefined);
	/**
	 * Cancels a notifier sending a Cancel event to all its observers and
	 * unsubscribing in case it holds a subscription request
	 *
	 * @example
	 * import * as withAbsintheSocket from "@absinthe/socket";
	 *
	 * withAbsintheSocket.cancel(absintheSocket, notifier);
	 */


	var cancel$1 = function cancel(absintheSocket, notifier) {
	  newArrowCheck(this, _this$t);

	  return notifier.isActive ? cancelActive(absintheSocket, notifier) : absintheSocket;
	}.bind(undefined);

	var nativeJoin = [].join;

	var ES3_STRINGS = indexedObject != Object;
	var STRICT_METHOD$1 = arrayMethodIsStrict('join', ',');

	// `Array.prototype.join` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.join
	_export({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD$1 }, {
	  join: function join(separator) {
	    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
	  }
	});

	var _this$u = undefined;

	function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$6(Object(source), true).forEach(function (key) { defineProperty$3(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	var setNotifierRequestStatusSent = function setNotifierRequestStatusSent(absintheSocket, notifier) {
	  newArrowCheck(this, _this$u);

	  return refreshNotifier(absintheSocket, _objectSpread$5(_objectSpread$5({}, notifier), {}, {
	    requestStatus: requestStatuses.sent
	  }));
	}.bind(undefined);

	var onQueryOrMutationSucceed = function onQueryOrMutationSucceed(absintheSocket, notifier, response) {
	  newArrowCheck(this, _this$u);

	  return updateNotifiers(absintheSocket, remove$4(notifyResultEvent(setNotifierRequestStatusSent(absintheSocket, notifier), response)));
	}.bind(undefined);

	var pushQueryOrMutation = function pushQueryOrMutation(absintheSocket, notifier) {
	  newArrowCheck(this, _this$u);

	  return pushRequestUsing(absintheSocket, notifyStartEvent(notifier), onQueryOrMutationSucceed);
	}.bind(undefined);

	var pushRequest = function pushRequest(absintheSocket, notifier) {
	  newArrowCheck(this, _this$u);

	  if (notifier.operationType === "subscription") {
	    subscribe(absintheSocket, notifier);
	  } else {
	    pushQueryOrMutation(absintheSocket, notifier);
	  }
	}.bind(undefined);

	var _this$v = undefined;

	var createChannelJoinError = function createChannelJoinError(message) {
	  newArrowCheck(this, _this$v);

	  return new Error("channel join: ".concat(message));
	}.bind(undefined);

	var notifyErrorToAllActive = function notifyErrorToAllActive(absintheSocket, errorMessage) {
	  var _this2 = this;

	  newArrowCheck(this, _this$v);

	  return absintheSocket.notifiers.forEach(function (notifier) {
	    newArrowCheck(this, _this2);

	    return notifyActive(notifier, createErrorEvent(createChannelJoinError(errorMessage)));
	  }.bind(this));
	}.bind(undefined); // join Push is reused and so the handler
	// https://github.com/phoenixframework/phoenix/blob/master/assets/js/phoenix.js#L356


	var createChannelJoinHandler = function createChannelJoinHandler(absintheSocket) {
	  var _this3 = this;

	  newArrowCheck(this, _this$v);

	  return {
	    onError: function onError(errorMessage) {
	      newArrowCheck(this, _this3);

	      return notifyErrorToAllActive(absintheSocket, errorMessage);
	    }.bind(this),
	    onSucceed: function onSucceed() {
	      var _this4 = this;

	      newArrowCheck(this, _this3);

	      return absintheSocket.notifiers.forEach(function (notifier) {
	        newArrowCheck(this, _this4);

	        return pushRequest(absintheSocket, notifier);
	      }.bind(this));
	    }.bind(this),
	    onTimeout: function onTimeout() {
	      newArrowCheck(this, _this3);

	      return notifyErrorToAllActive(absintheSocket, "timeout");
	    }.bind(this)
	  };
	}.bind(undefined);

	var joinChannel = function joinChannel(absintheSocket) {
	  newArrowCheck(this, _this$v);

	  handlePush(absintheSocket.channel.join(), createChannelJoinHandler(absintheSocket));
	  absintheSocket.channelJoinCreated = true;
	  return absintheSocket;
	}.bind(undefined);

	var _this$w = undefined;

	var onMessage = function onMessage(absintheSocket) {
	  var _this2 = this;

	  newArrowCheck(this, _this$w);

	  return function (message) {
	    newArrowCheck(this, _this2);

	    if (isDataMessage(message)) {
	      onDataMessage(absintheSocket, message);
	    }
	  }.bind(this);
	}.bind(undefined);

	var createConnectionCloseError = function createConnectionCloseError() {
	  newArrowCheck(this, _this$w);

	  return new Error("connection: close");
	}.bind(undefined);

	var notifyConnectionCloseError = function notifyConnectionCloseError(notifier) {
	  newArrowCheck(this, _this$w);

	  return notify(notifier, createErrorEvent(createConnectionCloseError()));
	}.bind(undefined);

	var notifierOnConnectionCloseCanceled = function notifierOnConnectionCloseCanceled(absintheSocket, notifier) {
	  newArrowCheck(this, _this$w);

	  return updateNotifiers(absintheSocket, remove$4(notifyConnectionCloseError(notifier)));
	}.bind(undefined);

	var notifierOnConnectionCloseActive = function notifierOnConnectionCloseActive(absintheSocket, notifier) {
	  newArrowCheck(this, _this$w);

	  if (notifier.operationType === "mutation") {
	    abortNotifier(absintheSocket, notifier, createConnectionCloseError());
	  } else {
	    refreshNotifier(absintheSocket, reset(notifyConnectionCloseError(notifier)));
	  }
	}.bind(undefined);

	var notifierOnConnectionClose = function notifierOnConnectionClose(absintheSocket) {
	  var _this3 = this;

	  newArrowCheck(this, _this$w);

	  return function (notifier) {
	    newArrowCheck(this, _this3);

	    if (notifier.isActive) {
	      notifierOnConnectionCloseActive(absintheSocket, notifier);
	    } else {
	      notifierOnConnectionCloseCanceled(absintheSocket, notifier);
	    }
	  }.bind(this);
	}.bind(undefined);

	var onConnectionClose = function onConnectionClose(absintheSocket) {
	  var _this4 = this;

	  newArrowCheck(this, _this$w);

	  return function () {
	    newArrowCheck(this, _this4);

	    return absintheSocket.notifiers.forEach(notifierOnConnectionClose(absintheSocket));
	  }.bind(this);
	}.bind(undefined);

	var shouldJoinChannel = function shouldJoinChannel(absintheSocket) {
	  newArrowCheck(this, _this$w);

	  return !absintheSocket.channelJoinCreated && absintheSocket.notifiers.length > 0;
	}.bind(undefined);

	var onConnectionOpen = function onConnectionOpen(absintheSocket) {
	  var _this5 = this;

	  newArrowCheck(this, _this$w);

	  return function () {
	    newArrowCheck(this, _this5);

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
	  newArrowCheck(this, _this$w);

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

	var _this$x = undefined;

	function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$7(Object(source), true).forEach(function (key) { defineProperty$3(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	var observe = function observe(_ref, observer) {
	  newArrowCheck(this, _this$x);

	  var activeObservers = _ref.activeObservers,
	      rest = objectWithoutProperties(_ref, ["activeObservers"]);

	  return _objectSpread$6(_objectSpread$6({}, rest), {}, {
	    activeObservers: [].concat(toConsumableArray(activeObservers), [observer]),
	    isActive: true
	  });
	}.bind(undefined);

	var _this$y = undefined;

	/**
	 * Observes given notifier using the provided observer
	 *
	 * @example
	 * import * as withAbsintheSocket from "@absinthe/socket"
	 *
	 * const logEvent = eventName => (...args) => console.log(eventName, ...args);
	 *
	 * const updatedNotifier = withAbsintheSocket.observe(absintheSocket, notifier, {
	 *   onAbort: logEvent("abort"),
	 *   onError: logEvent("error"),
	 *   onStart: logEvent("open"),
	 *   onResult: logEvent("result")
	 * });
	 */
	var observe$1 = function observe$1(absintheSocket, notifier, observer) {
	  newArrowCheck(this, _this$y);

	  return refreshNotifier(absintheSocket, observe(notifier, observer));
	}.bind(undefined);

	var _this$z = undefined;

	var createUsing = function createUsing(request, operationType) {
	  newArrowCheck(this, _this$z);

	  return {
	    operationType: operationType,
	    request: request,
	    activeObservers: [],
	    canceledObservers: [],
	    isActive: true,
	    requestStatus: requestStatuses.pending,
	    subscriptionId: undefined
	  };
	}.bind(undefined);

	var create$1 = function create(request) {
	  newArrowCheck(this, _this$z);

	  return createUsing(request, getOperationType(request.operation));
	}.bind(undefined);

	var _this$A = undefined;

	function ownKeys$8(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$8(Object(source), true).forEach(function (key) { defineProperty$3(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$8(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	var reactivate = function reactivate(notifier) {
	  newArrowCheck(this, _this$A);

	  return notifier.isActive ? notifier : _objectSpread$7(_objectSpread$7({}, notifier), {}, {
	    isActive: true
	  });
	}.bind(undefined);

	var _this$B = undefined;

	var connectOrJoinChannel = function connectOrJoinChannel(absintheSocket) {
	  newArrowCheck(this, _this$B);

	  if (absintheSocket.phoenixSocket.isConnected()) {
	    joinChannel(absintheSocket);
	  } else {
	    // socket ignores connect calls if a connection has already been created
	    absintheSocket.phoenixSocket.connect();
	  }
	}.bind(undefined);

	var sendNew = function sendNew(absintheSocket, request) {
	  newArrowCheck(this, _this$B);

	  var notifier = create$1(request);
	  updateNotifiers(absintheSocket, append$1([notifier]));

	  if (absintheSocket.channelJoinCreated) {
	    pushRequest(absintheSocket, notifier);
	  } else {
	    connectOrJoinChannel(absintheSocket);
	  }

	  return notifier;
	}.bind(undefined);

	var updateCanceledReactivate = function updateCanceledReactivate(absintheSocket, notifier) {
	  newArrowCheck(this, _this$B);

	  return refreshNotifier(absintheSocket, reactivate(notifier));
	}.bind(undefined);

	var updateCanceled = function updateCanceled(absintheSocket, notifier) {
	  newArrowCheck(this, _this$B);

	  return notifier.requestStatus === requestStatuses.sending ? updateCanceledReactivate(absintheSocket, flushCanceled(notifier)) : updateCanceledReactivate(absintheSocket, notifier);
	}.bind(undefined);

	var updateIfCanceled = function updateIfCanceled(absintheSocket, notifier) {
	  newArrowCheck(this, _this$B);

	  return notifier.isActive ? notifier : updateCanceled(absintheSocket, notifier);
	}.bind(undefined);

	var getExistentIfAny = function getExistentIfAny(absintheSocket, request) {
	  newArrowCheck(this, _this$B);

	  var notifier = find(absintheSocket.notifiers, "request", request);
	  return notifier && updateIfCanceled(absintheSocket, notifier);
	}.bind(undefined);
	/**
	 * Sends given request and returns an object (notifier) to track its progress
	 * (see observe function)
	 *
	 * @example
	 * import * as withAbsintheSocket from "@absinthe/socket";
	 *
	 * const operation = `
	 *   subscription userSubscription($userId: ID!) {
	 *     user(userId: $userId) {
	 *       id
	 *       name
	 *     }
	 *   }
	 * `;
	 *
	 * // This example uses a subscription, but the functionallity is the same for
	 * // all operation types (queries, mutations and subscriptions)
	 *
	 * const notifier = withAbsintheSocket.send(absintheSocket, {
	 *   operation,
	 *   variables: {userId: 10}
	 * });
	 */


	var send = function send(absintheSocket, request) {
	  newArrowCheck(this, _this$B);

	  return getExistentIfAny(absintheSocket, request) || sendNew(absintheSocket, request);
	}.bind(undefined);

	var Observable_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Observable = void 0;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	// === Symbol Support ===
	var hasSymbols = function () {
	  return typeof Symbol === 'function';
	};

	var hasSymbol = function (name) {
	  return hasSymbols() && Boolean(Symbol[name]);
	};

	var getSymbol = function (name) {
	  return hasSymbol(name) ? Symbol[name] : '@@' + name;
	};

	if (hasSymbols() && !hasSymbol('observable')) {
	  Symbol.observable = Symbol('observable');
	}

	var SymbolIterator = getSymbol('iterator');
	var SymbolObservable = getSymbol('observable');
	var SymbolSpecies = getSymbol('species'); // === Abstract Operations ===

	function getMethod(obj, key) {
	  var value = obj[key];
	  if (value == null) return undefined;
	  if (typeof value !== 'function') throw new TypeError(value + ' is not a function');
	  return value;
	}

	function getSpecies(obj) {
	  var ctor = obj.constructor;

	  if (ctor !== undefined) {
	    ctor = ctor[SymbolSpecies];

	    if (ctor === null) {
	      ctor = undefined;
	    }
	  }

	  return ctor !== undefined ? ctor : Observable;
	}

	function isObservable(x) {
	  return x instanceof Observable; // SPEC: Brand check
	}

	function hostReportError(e) {
	  if (hostReportError.log) {
	    hostReportError.log(e);
	  } else {
	    setTimeout(function () {
	      throw e;
	    });
	  }
	}

	function enqueue(fn) {
	  Promise.resolve().then(function () {
	    try {
	      fn();
	    } catch (e) {
	      hostReportError(e);
	    }
	  });
	}

	function cleanupSubscription(subscription) {
	  var cleanup = subscription._cleanup;
	  if (cleanup === undefined) return;
	  subscription._cleanup = undefined;

	  if (!cleanup) {
	    return;
	  }

	  try {
	    if (typeof cleanup === 'function') {
	      cleanup();
	    } else {
	      var unsubscribe = getMethod(cleanup, 'unsubscribe');

	      if (unsubscribe) {
	        unsubscribe.call(cleanup);
	      }
	    }
	  } catch (e) {
	    hostReportError(e);
	  }
	}

	function closeSubscription(subscription) {
	  subscription._observer = undefined;
	  subscription._queue = undefined;
	  subscription._state = 'closed';
	}

	function flushSubscription(subscription) {
	  var queue = subscription._queue;

	  if (!queue) {
	    return;
	  }

	  subscription._queue = undefined;
	  subscription._state = 'ready';

	  for (var i = 0; i < queue.length; ++i) {
	    notifySubscription(subscription, queue[i].type, queue[i].value);
	    if (subscription._state === 'closed') break;
	  }
	}

	function notifySubscription(subscription, type, value) {
	  subscription._state = 'running';
	  var observer = subscription._observer;

	  try {
	    var m = getMethod(observer, type);

	    switch (type) {
	      case 'next':
	        if (m) m.call(observer, value);
	        break;

	      case 'error':
	        closeSubscription(subscription);
	        if (m) m.call(observer, value);else throw value;
	        break;

	      case 'complete':
	        closeSubscription(subscription);
	        if (m) m.call(observer);
	        break;
	    }
	  } catch (e) {
	    hostReportError(e);
	  }

	  if (subscription._state === 'closed') cleanupSubscription(subscription);else if (subscription._state === 'running') subscription._state = 'ready';
	}

	function onNotify(subscription, type, value) {
	  if (subscription._state === 'closed') return;

	  if (subscription._state === 'buffering') {
	    subscription._queue.push({
	      type: type,
	      value: value
	    });

	    return;
	  }

	  if (subscription._state !== 'ready') {
	    subscription._state = 'buffering';
	    subscription._queue = [{
	      type: type,
	      value: value
	    }];
	    enqueue(function () {
	      return flushSubscription(subscription);
	    });
	    return;
	  }

	  notifySubscription(subscription, type, value);
	}

	var Subscription =
	/*#__PURE__*/
	function () {
	  function Subscription(observer, subscriber) {
	    _classCallCheck(this, Subscription);

	    // ASSERT: observer is an object
	    // ASSERT: subscriber is callable
	    this._cleanup = undefined;
	    this._observer = observer;
	    this._queue = undefined;
	    this._state = 'initializing';
	    var subscriptionObserver = new SubscriptionObserver(this);

	    try {
	      this._cleanup = subscriber.call(undefined, subscriptionObserver);
	    } catch (e) {
	      subscriptionObserver.error(e);
	    }

	    if (this._state === 'initializing') this._state = 'ready';
	  }

	  _createClass(Subscription, [{
	    key: "unsubscribe",
	    value: function unsubscribe() {
	      if (this._state !== 'closed') {
	        closeSubscription(this);
	        cleanupSubscription(this);
	      }
	    }
	  }, {
	    key: "closed",
	    get: function () {
	      return this._state === 'closed';
	    }
	  }]);

	  return Subscription;
	}();

	var SubscriptionObserver =
	/*#__PURE__*/
	function () {
	  function SubscriptionObserver(subscription) {
	    _classCallCheck(this, SubscriptionObserver);

	    this._subscription = subscription;
	  }

	  _createClass(SubscriptionObserver, [{
	    key: "next",
	    value: function next(value) {
	      onNotify(this._subscription, 'next', value);
	    }
	  }, {
	    key: "error",
	    value: function error(value) {
	      onNotify(this._subscription, 'error', value);
	    }
	  }, {
	    key: "complete",
	    value: function complete() {
	      onNotify(this._subscription, 'complete');
	    }
	  }, {
	    key: "closed",
	    get: function () {
	      return this._subscription._state === 'closed';
	    }
	  }]);

	  return SubscriptionObserver;
	}();

	var Observable =
	/*#__PURE__*/
	function () {
	  function Observable(subscriber) {
	    _classCallCheck(this, Observable);

	    if (!(this instanceof Observable)) throw new TypeError('Observable cannot be called as a function');
	    if (typeof subscriber !== 'function') throw new TypeError('Observable initializer must be a function');
	    this._subscriber = subscriber;
	  }

	  _createClass(Observable, [{
	    key: "subscribe",
	    value: function subscribe(observer) {
	      if (typeof observer !== 'object' || observer === null) {
	        observer = {
	          next: observer,
	          error: arguments[1],
	          complete: arguments[2]
	        };
	      }

	      return new Subscription(observer, this._subscriber);
	    }
	  }, {
	    key: "forEach",
	    value: function forEach(fn) {
	      var _this = this;

	      return new Promise(function (resolve, reject) {
	        if (typeof fn !== 'function') {
	          reject(new TypeError(fn + ' is not a function'));
	          return;
	        }

	        function done() {
	          subscription.unsubscribe();
	          resolve();
	        }

	        var subscription = _this.subscribe({
	          next: function (value) {
	            try {
	              fn(value, done);
	            } catch (e) {
	              reject(e);
	              subscription.unsubscribe();
	            }
	          },
	          error: reject,
	          complete: resolve
	        });
	      });
	    }
	  }, {
	    key: "map",
	    value: function map(fn) {
	      var _this2 = this;

	      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
	      var C = getSpecies(this);
	      return new C(function (observer) {
	        return _this2.subscribe({
	          next: function (value) {
	            try {
	              value = fn(value);
	            } catch (e) {
	              return observer.error(e);
	            }

	            observer.next(value);
	          },
	          error: function (e) {
	            observer.error(e);
	          },
	          complete: function () {
	            observer.complete();
	          }
	        });
	      });
	    }
	  }, {
	    key: "filter",
	    value: function filter(fn) {
	      var _this3 = this;

	      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
	      var C = getSpecies(this);
	      return new C(function (observer) {
	        return _this3.subscribe({
	          next: function (value) {
	            try {
	              if (!fn(value)) return;
	            } catch (e) {
	              return observer.error(e);
	            }

	            observer.next(value);
	          },
	          error: function (e) {
	            observer.error(e);
	          },
	          complete: function () {
	            observer.complete();
	          }
	        });
	      });
	    }
	  }, {
	    key: "reduce",
	    value: function reduce(fn) {
	      var _this4 = this;

	      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
	      var C = getSpecies(this);
	      var hasSeed = arguments.length > 1;
	      var hasValue = false;
	      var seed = arguments[1];
	      var acc = seed;
	      return new C(function (observer) {
	        return _this4.subscribe({
	          next: function (value) {
	            var first = !hasValue;
	            hasValue = true;

	            if (!first || hasSeed) {
	              try {
	                acc = fn(acc, value);
	              } catch (e) {
	                return observer.error(e);
	              }
	            } else {
	              acc = value;
	            }
	          },
	          error: function (e) {
	            observer.error(e);
	          },
	          complete: function () {
	            if (!hasValue && !hasSeed) return observer.error(new TypeError('Cannot reduce an empty sequence'));
	            observer.next(acc);
	            observer.complete();
	          }
	        });
	      });
	    }
	  }, {
	    key: "concat",
	    value: function concat() {
	      var _this5 = this;

	      for (var _len = arguments.length, sources = new Array(_len), _key = 0; _key < _len; _key++) {
	        sources[_key] = arguments[_key];
	      }

	      var C = getSpecies(this);
	      return new C(function (observer) {
	        var subscription;
	        var index = 0;

	        function startNext(next) {
	          subscription = next.subscribe({
	            next: function (v) {
	              observer.next(v);
	            },
	            error: function (e) {
	              observer.error(e);
	            },
	            complete: function () {
	              if (index === sources.length) {
	                subscription = undefined;
	                observer.complete();
	              } else {
	                startNext(C.from(sources[index++]));
	              }
	            }
	          });
	        }

	        startNext(_this5);
	        return function () {
	          if (subscription) {
	            subscription.unsubscribe();
	            subscription = undefined;
	          }
	        };
	      });
	    }
	  }, {
	    key: "flatMap",
	    value: function flatMap(fn) {
	      var _this6 = this;

	      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
	      var C = getSpecies(this);
	      return new C(function (observer) {
	        var subscriptions = [];

	        var outer = _this6.subscribe({
	          next: function (value) {
	            if (fn) {
	              try {
	                value = fn(value);
	              } catch (e) {
	                return observer.error(e);
	              }
	            }

	            var inner = C.from(value).subscribe({
	              next: function (value) {
	                observer.next(value);
	              },
	              error: function (e) {
	                observer.error(e);
	              },
	              complete: function () {
	                var i = subscriptions.indexOf(inner);
	                if (i >= 0) subscriptions.splice(i, 1);
	                completeIfDone();
	              }
	            });
	            subscriptions.push(inner);
	          },
	          error: function (e) {
	            observer.error(e);
	          },
	          complete: function () {
	            completeIfDone();
	          }
	        });

	        function completeIfDone() {
	          if (outer.closed && subscriptions.length === 0) observer.complete();
	        }

	        return function () {
	          subscriptions.forEach(function (s) {
	            return s.unsubscribe();
	          });
	          outer.unsubscribe();
	        };
	      });
	    }
	  }, {
	    key: SymbolObservable,
	    value: function () {
	      return this;
	    }
	  }], [{
	    key: "from",
	    value: function from(x) {
	      var C = typeof this === 'function' ? this : Observable;
	      if (x == null) throw new TypeError(x + ' is not an object');
	      var method = getMethod(x, SymbolObservable);

	      if (method) {
	        var observable = method.call(x);
	        if (Object(observable) !== observable) throw new TypeError(observable + ' is not an object');
	        if (isObservable(observable) && observable.constructor === C) return observable;
	        return new C(function (observer) {
	          return observable.subscribe(observer);
	        });
	      }

	      if (hasSymbol('iterator')) {
	        method = getMethod(x, SymbolIterator);

	        if (method) {
	          return new C(function (observer) {
	            enqueue(function () {
	              if (observer.closed) return;
	              var _iteratorNormalCompletion = true;
	              var _didIteratorError = false;
	              var _iteratorError = undefined;

	              try {
	                for (var _iterator = method.call(x)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                  var _item = _step.value;
	                  observer.next(_item);
	                  if (observer.closed) return;
	                }
	              } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	              } finally {
	                try {
	                  if (!_iteratorNormalCompletion && _iterator.return != null) {
	                    _iterator.return();
	                  }
	                } finally {
	                  if (_didIteratorError) {
	                    throw _iteratorError;
	                  }
	                }
	              }

	              observer.complete();
	            });
	          });
	        }
	      }

	      if (Array.isArray(x)) {
	        return new C(function (observer) {
	          enqueue(function () {
	            if (observer.closed) return;

	            for (var i = 0; i < x.length; ++i) {
	              observer.next(x[i]);
	              if (observer.closed) return;
	            }

	            observer.complete();
	          });
	        });
	      }

	      throw new TypeError(x + ' is not observable');
	    }
	  }, {
	    key: "of",
	    value: function of() {
	      for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        items[_key2] = arguments[_key2];
	      }

	      var C = typeof this === 'function' ? this : Observable;
	      return new C(function (observer) {
	        enqueue(function () {
	          if (observer.closed) return;

	          for (var i = 0; i < items.length; ++i) {
	            observer.next(items[i]);
	            if (observer.closed) return;
	          }

	          observer.complete();
	        });
	      });
	    }
	  }, {
	    key: SymbolSpecies,
	    get: function () {
	      return this;
	    }
	  }]);

	  return Observable;
	}();

	exports.Observable = Observable;

	if (hasSymbols()) {
	  Object.defineProperty(Observable, Symbol('extensions'), {
	    value: {
	      symbol: SymbolObservable,
	      hostReportError: hostReportError
	    },
	    configurable: true
	  });
	}
	});

	var zenObservable = Observable_1.Observable;

	var _this$C = undefined;

	function ownKeys$9(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$8(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$9(Object(source), true).forEach(function (key) { defineProperty$3(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$9(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	// prettier-ignore
	var getUnsubscriber = function getUnsubscriber(absintheSocket, _ref, observer, unsubscribe) {
	  var _this2 = this;

	  newArrowCheck(this, _this$C);

	  var request = _ref.request;
	  return function () {
	    newArrowCheck(this, _this2);

	    var notifier = find(absintheSocket.notifiers, "request", request);
	    unsubscribe(absintheSocket, notifier, notifier ? observer : undefined);
	  }.bind(this);
	}.bind(undefined);

	var onResult = function onResult(_ref2, observableObserver) {
	  var _this3 = this;

	  newArrowCheck(this, _this$C);

	  var operationType = _ref2.operationType;
	  return function (result) {
	    newArrowCheck(this, _this3);

	    observableObserver.next(result);

	    if (operationType !== "subscription") {
	      observableObserver.complete();
	    }
	  }.bind(this);
	}.bind(undefined);

	var createObserver = function createObserver(notifier, handlers, observableObserver) {
	  newArrowCheck(this, _this$C);

	  return _objectSpread$8(_objectSpread$8({}, handlers), {}, {
	    onAbort: observableObserver.error.bind(observableObserver),
	    onResult: onResult(notifier, observableObserver)
	  });
	}.bind(undefined);
	/**
	 * Creates an Observable that will follow the given notifier
	 *
	 * @param {AbsintheSocket} absintheSocket
	 * @param {Notifier<Result, Variables>} notifier
	 * @param {Object} [options]
	 * @param {function(error: Error): undefined} [options.onError]
	 * @param {function(notifier: Notifier<Result, Variables>): undefined} [options.onStart]
	 * @param {function(): undefined} [options.unsubscribe]
	 *
	 * @return {Observable}
	 *
	 * @example
	 * import * as withAbsintheSocket from "@absinthe/socket";
	 *
	 * const unobserveOrCancelIfNeeded = (absintheSocket, notifier, observer) => {
	 *   if (notifier && observer) {
	 *     withAbsintheSocket.unobserveOrCancel(absintheSocket, notifier, observer);
	 *   }
	 * };
	 *
	 * const logEvent = eventName => (...args) => console.log(eventName, ...args);
	 *
	 * const observable = withAbsintheSocket.toObservable(absintheSocket, notifier, {
	 *   onError: logEvent("error"),
	 *   onStart: logEvent("open"),
	 *   unsubscribe: unobserveOrCancelIfNeeded
	 * });
	 */


	var toObservable = function toObservable(absintheSocket, notifier) {
	  var _this4 = this;

	  var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
	      unsubscribe = _ref3.unsubscribe,
	      handlers = objectWithoutProperties(_ref3, ["unsubscribe"]);

	  return new zenObservable(function (observableObserver) {
	    newArrowCheck(this, _this4);

	    var observer = createObserver(notifier, handlers, observableObserver);
	    observe$1(absintheSocket, notifier, observer);
	    return unsubscribe && getUnsubscriber(absintheSocket, notifier, observer, unsubscribe);
	  }.bind(this));
	};

	var $includes = arrayIncludes.includes;



	var USES_TO_LENGTH$4 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

	// `Array.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.includes
	_export({ target: 'Array', proto: true, forced: !USES_TO_LENGTH$4 }, {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('includes');

	var MATCH = wellKnownSymbol('match');

	// `IsRegExp` abstract operation
	// https://tc39.github.io/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
	};

	var notARegexp = function (it) {
	  if (isRegexp(it)) {
	    throw TypeError("The method doesn't accept regular expressions");
	  } return it;
	};

	var MATCH$1 = wellKnownSymbol('match');

	var correctIsRegexpLogic = function (METHOD_NAME) {
	  var regexp = /./;
	  try {
	    '/./'[METHOD_NAME](regexp);
	  } catch (e) {
	    try {
	      regexp[MATCH$1] = false;
	      return '/./'[METHOD_NAME](regexp);
	    } catch (f) { /* empty */ }
	  } return false;
	};

	// `String.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.includes
	_export({ target: 'String', proto: true, forced: !correctIsRegexpLogic('includes') }, {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~String(requireObjectCoercible(this))
	      .indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var $indexOf = arrayIncludes.indexOf;



	var nativeIndexOf = [].indexOf;

	var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
	var STRICT_METHOD$2 = arrayMethodIsStrict('indexOf');
	var USES_TO_LENGTH$5 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

	// `Array.prototype.indexOf` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	_export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD$2 || !USES_TO_LENGTH$5 }, {
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? nativeIndexOf.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var _this$D = undefined;

	function ownKeys$a(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$9(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$a(Object(source), true).forEach(function (key) { defineProperty$3(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$a(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	var removeObserver = function removeObserver(observers, observer) {
	  newArrowCheck(this, _this$D);

	  return remove$1(observers.indexOf(observer), 1, observers);
	}.bind(undefined);

	var unobserve = function unobserve(_ref, observer) {
	  newArrowCheck(this, _this$D);

	  var activeObservers = _ref.activeObservers,
	      rest = objectWithoutProperties(_ref, ["activeObservers"]);

	  return _objectSpread$9(_objectSpread$9({}, rest), {}, {
	    activeObservers: removeObserver(activeObservers, observer)
	  });
	}.bind(undefined);

	var _this$E = undefined;

	var ensureHasActiveObserver = function ensureHasActiveObserver(notifier, observer) {
	  newArrowCheck(this, _this$E);

	  if (notifier.activeObservers.includes(observer)) return notifier;
	  throw new Error("Observer is not attached to notifier");
	}.bind(undefined);
	/**
	 * Detaches observer from notifier
	 *
	 * @example
	 * import * as withAbsintheSocket from "@absinthe/socket";
	 *
	 * withAbsintheSocket.unobserve(absintheSocket, notifier, observer);
	 */


	var unobserve$1 = function unobserve$1(absintheSocket, notifier, observer) {
	  newArrowCheck(this, _this$E);

	  return updateNotifiers(absintheSocket, refresh(unobserve(ensureHasActiveObserver(notifier, observer), observer)));
	}.bind(undefined);

	var _this$F = undefined;

	var doUnobserveOrCancel = function doUnobserveOrCancel(absintheSocket, notifier, observer) {
	  newArrowCheck(this, _this$F);

	  return notifier.activeObservers.length === 1 ? cancel$1(absintheSocket, notifier) : unobserve$1(absintheSocket, notifier, observer);
	}.bind(undefined);
	/**
	 * Cancels notifier if there are no more observers apart from the one given, or
	 * detaches given observer from notifier otherwise
	 *
	 * @example
	 * import * as withAbsintheSocket from "@absinthe/socket";
	 *
	 * withAbsintheSocket.unobserve(absintheSocket, notifier, observer);
	 */


	var unobserveOrCancel = function unobserveOrCancel(absintheSocket, notifier, observer) {
	  newArrowCheck(this, _this$F);

	  return notifier.isActive ? doUnobserveOrCancel(absintheSocket, notifier, observer) : absintheSocket;
	}.bind(undefined);

	exports.cancel = cancel$1;
	exports.create = create;
	exports.observe = observe$1;
	exports.send = send;
	exports.toObservable = toObservable;
	exports.unobserve = unobserve$1;
	exports.unobserveOrCancel = unobserveOrCancel;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
