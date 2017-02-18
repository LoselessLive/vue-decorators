/**
 * Vue-decorators v1.1.7
 * (c) 2017 Paweł Partyka
 * @license MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(require('vue'));
var Vuex = require('vuex');
var Vuex__default = _interopDefault(Vuex);

var specialKeys = {
    /** Vue decorators **/
    'DATA': '$_vd_data',
    'PROPS': '$_vd_props',
    'MIXINS': '$_vd_mixins',
    'FILTERS': '$_vd_filters',
    'METHODS': '$_vd_methods',
    'TEMPLATE': '$_vd_template',
    'WATCHERS': '$_vd_watchers',
    'COMPUTED': '$_vd_computed',
    'LIFECYCLE': '$_vd_lifecycle',
    'COMPONENTS': '$_vd_components',
    'DIRECTIVES': '$_vd_directives',

    /** Vuex decorators **/
    'STATES': '$_vd_states',
    'GETTERS': '$_vd_getters',
    'ACTIONS': '$_vd_actions',
    'MUTATIONS': '$_vd_mutations',

    'MODULES': '$_vd_modules',
    'PLUGINS': '$_vd_plugins',
    'SUBSCRIBERS': '$_vd_subscribers',

    /** Others **/
    'USED_PROPS': '$_vd_used_props'
};

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function combineDataObject(vm, Component, optionsData) {
  var instanceComponent = new Component();
  var data = new Set(Object.getOwnPropertyNames(instanceComponent));

  [].concat(_toConsumableArray(Object.getOwnPropertyNames(vm)), _toConsumableArray(Object.getOwnPropertyNames(new Vue()))).forEach(function (key) {
    data.delete(key);
  });

  for (var key in Component.prototype[specialKeys.USED_PROPS]) {
    data.delete(key);
  }

  var plainData = {};

  if (optionsData) {
    if (typeof optionsData === 'function') {
      plainData = _extends({}, plainData, new optionsData());
    } else {
      plainData = _extends({}, plainData, optionsData);
    }
  }

  if (Component[specialKeys.DATA]) {
    for (var _key in Component[specialKeys.DATA]) {
      plainData[_key] = Component[specialKeys.DATA][_key];
    }
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = data.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _key2 = _step.value;

      plainData[_key2] = instanceComponent[_key2];
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return plainData;
}

function componentFactory() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (Component) {
    var noptions = {};
    var proto = Component.prototype;

    /** Methods **/
    if (!proto[specialKeys.METHODS]) {
      proto[specialKeys.METHODS] = {};
    }

    var componentMethods = new Set(Object.getOwnPropertyNames(proto));
    componentMethods.delete('constructor');

    for (var key in specialKeys) {
      componentMethods.delete(specialKeys[key]);
    }

    if (proto[specialKeys.USED_PROPS]) {
      for (var _key3 in proto[specialKeys.USED_PROPS]) {
        componentMethods.delete(_key3);
      }
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = componentMethods.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var method = _step2.value;

        proto[specialKeys.METHODS][method] = proto[method];
      }

      /** Combine, Lifecycle, Name & Data **/
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    noptions = _extends({}, options, proto[specialKeys.LIFECYCLE]);

    noptions.name = options.name || Component.name;
    noptions.data = function () {
      return combineDataObject(this, Component, options.data);
    };

    /** Template **/
    if (Component[specialKeys.TEMPLATE]) {
      noptions.template = Component[specialKeys.TEMPLATE];
    }

    /** Props **/
    if (proto[specialKeys.PROPS]) {
      noptions.props = _extends({}, options.props, proto[specialKeys.PROPS]);
    }

    /** Components **/
    if (Component[specialKeys.COMPONENTS]) {
      noptions.components = _extends({}, options.components, Component[specialKeys.COMPONENTS]);
    }

    /** Directives **/
    if (Component[specialKeys.DIRECTIVES]) {
      noptions.directives = _extends({}, noptions.directives, Component[specialKeys.DIRECTIVES]);
    }

    /** Computed **/
    if (proto[specialKeys.COMPUTED] || proto[specialKeys.STATES] || proto[specialKeys.GETTERS]) {
      noptions.computed = _extends({}, options.computed, proto[specialKeys.COMPUTED], proto[specialKeys.STATES], proto[specialKeys.GETTERS]);
    }

    /** Methods **/
    if (proto[specialKeys.METHODS] || proto[specialKeys.ACTIONS] || proto[specialKeys.MUTATIONS]) {
      noptions.methods = _extends({}, options.methods, proto[specialKeys.METHODS], proto[specialKeys.ACTIONS], proto[specialKeys.MUTATIONS]);
    }

    /** Watchers **/
    if (proto[specialKeys.WATCHERS]) {
      noptions.watch = _extends({}, options.watch, proto[specialKeys.WATCHERS]);
    }

    /** Filters **/
    if (proto[specialKeys.FILTERS]) {
      noptions.filters = _extends({}, options.filters, proto[specialKeys.FILTERS]);
    }

    /** Mixins **/
    if (Component[specialKeys.MIXINS]) {
      var _ref;

      (_ref = noptions.mixins || (noptions.mixins = [])).push.apply(_ref, _toConsumableArray(Component[specialKeys.MIXINS]));
    }

    return noptions;
  };
}

function Component(options) {
  if (options instanceof Function) {
    return componentFactory()(options);
  }

  return componentFactory(options);
}

var _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function InjectComponent(componentName, component) {
  if ((typeof component === 'undefined' ? 'undefined' : _typeof(component)) !== 'object') {
    console.error('[Vue decorator error] component must be a vue component object');

    return component;
  }

  return function (target) {
    if (!target[specialKeys.COMPONENTS]) {
      target[specialKeys.COMPONENTS] = {};
    }

    target[specialKeys.COMPONENTS] = _extends$1({}, target[specialKeys.COMPONENTS], _defineProperty({}, componentName, component));

    return target;
  };
}

var _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function InjectComponents(components) {
  if ((typeof components === 'undefined' ? 'undefined' : _typeof$1(components)) !== 'object') {
    console.error('[Vue decorator error] components must be a object');

    return components;
  }

  return function (target) {
    if (!target[specialKeys.COMPONENTS]) {
      target[specialKeys.COMPONENTS] = {};
    }

    target[specialKeys.COMPONENTS] = _extends$2({}, target[specialKeys.COMPONENTS], components);

    return target;
  };
}

var _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof$2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function InjectDirective(directiveName, directive) {
  if ((typeof directive === 'undefined' ? 'undefined' : _typeof$2(directive)) !== 'object') {
    console.error('[Vue decorator error] directive must be a object');

    return directive;
  }

  return function (target) {
    if (!target[specialKeys.DIRECTIVES]) {
      target[specialKeys.DIRECTIVES] = {};
    }

    target[specialKeys.DIRECTIVES] = _extends$3({}, target[specialKeys.DIRECTIVES], _defineProperty$1({}, directiveName, directive));

    return target;
  };
}

var _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof$3 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function InjectDirectives(directives) {
  if ((typeof directives === 'undefined' ? 'undefined' : _typeof$3(directives)) !== 'object') {
    console.error('[Vue decorator error] directives must be a object');

    return directives;
  }

  return function (target) {
    if (!target[specialKeys.DIRECTIVES]) {
      target[specialKeys.DIRECTIVES] = {};
    }

    target[specialKeys.DIRECTIVES] = _extends$4({}, target[specialKeys.DIRECTIVES], directives);

    return target;
  };
}

var _extends$5 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof$4 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function Data(data) {
  if ((typeof data === 'undefined' ? 'undefined' : _typeof$4(data)) !== 'object') {
    console.error('[Vue decorator error] data must be a object');

    return data;
  }

  return function (target) {
    if (!target[specialKeys.DATA]) {
      target[specialKeys.DATA] = {};
    }

    target[specialKeys.DATA] = _extends$5({}, target[specialKeys.DATA], data);

    return target;
  };
}

function makePropDecorator(options) {
  return function (target, key) {
    if (!target[specialKeys.USED_PROPS]) {
      target[specialKeys.USED_PROPS] = {};
    }

    if (!target[specialKeys.PROPS]) {
      target[specialKeys.PROPS] = {};
    }

    if (!target[specialKeys.PROPS][key]) {
      target[specialKeys.USED_PROPS][key] = true;
      target[specialKeys.PROPS][key] = options || true;
    }
  };
}

function Prop(options, key, descriptor) {
  if (options instanceof Vue) {
    return makePropDecorator()(options, key);
  }

  return makePropDecorator(options);
}

function makeWatchDecorator(options) {
  return function (target, key) {
    if (!target[specialKeys.USED_PROPS]) {
      target[specialKeys.USED_PROPS] = {};
    }

    if (!target[specialKeys.WATCHERS]) {
      target[specialKeys.WATCHERS] = {};
    }

    if (!target[specialKeys.WATCHERS][options || key]) {
      target[specialKeys.USED_PROPS][key] = true;
      target[specialKeys.WATCHERS][options || key] = target[key];
    }
  };
}

function Watch(options, key, descriptor) {
  if (options instanceof Vue) {
    return makeWatchDecorator()(options, key);
  }

  return makeWatchDecorator(options);
}

var _typeof$5 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function Mixin(mixin) {
  if ((typeof mixin === 'undefined' ? 'undefined' : _typeof$5(mixin)) !== 'object') {
    console.error('[Vue decorator error] mixin must be a object');

    return mixin;
  }

  return function (target) {
    if (target[specialKeys.MIXINS]) {
      target[specialKeys.MIXINS].push(mixin);
    } else {
      target[specialKeys.MIXINS] = [mixin];
    }

    return target;
  };
}

function _toConsumableArray$1(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function Mixins(mixins) {
  if (!(mixins instanceof Array)) {
    console.error('[Vue decorator error] mixins must be a array');

    return mixins;
  }

  return function (target) {
    if (target[specialKeys.MIXINS]) {
      var _target$specialKeys$M;

      (_target$specialKeys$M = target[specialKeys.MIXINS]).push.apply(_target$specialKeys$M, _toConsumableArray$1(mixins));
    } else {
      target[specialKeys.MIXINS] = mixins;
    }

    return target;
  };
}

function makeFilterDecorator(options) {
  return function (target, key) {
    if (!target[specialKeys.USED_PROPS]) {
      target[specialKeys.USED_PROPS] = {};
    }

    if (!target[specialKeys.FILTERS]) {
      target[specialKeys.FILTERS] = {};
    }

    if (!target[specialKeys.FILTERS][options || key]) {
      target[specialKeys.USED_PROPS][key] = true;
      target[specialKeys.FILTERS][options || key] = target[key];
    }
  };
}

function Filter(options, key, descriptor) {
  if (options instanceof Vue) {
    return makeFilterDecorator()(options, key);
  }

  return makeFilterDecorator(options);
}

function Template(template) {
  if (typeof template !== 'string') {
    console.error('[Vue decorator error] template must be a string');

    return template;
  }

  return function (target) {
    target[specialKeys.TEMPLATE] = template;

    return target;
  };
}

function makeWatchDecorator$1(options) {
  return function (target, key) {
    if (!target[specialKeys.USED_PROPS]) {
      target[specialKeys.USED_PROPS] = {};
    }

    if (!target[specialKeys.COMPUTED]) {
      target[specialKeys.COMPUTED] = {};
    }

    if (!target[specialKeys.COMPUTED][options || key]) {
      target[specialKeys.USED_PROPS][key] = true;
      target[specialKeys.COMPUTED][options || key] = target[key];
    }
  };
}

function Computed(options, key, descriptor) {
  if (options instanceof Vue) {
    return makeWatchDecorator$1()(options, key);
  }

  return makeWatchDecorator$1(options);
}

function makeLifecycleDecorator(options) {
  return function (target, key) {
    if (!target[specialKeys.USED_PROPS]) {
      target[specialKeys.USED_PROPS] = {};
    }

    if (!target[specialKeys.LIFECYCLE]) {
      target[specialKeys.LIFECYCLE] = {};
    }

    if (!target[specialKeys.LIFECYCLE][options || key]) {
      target[specialKeys.USED_PROPS][key] = true;
      target[specialKeys.LIFECYCLE][options || key] = target[key];
    }
  };
}

function Lifecycle(options, key, descriptor) {
  if (options instanceof Vue) {
    return makeLifecycleDecorator()(options, key);
  }

  return makeLifecycleDecorator(options);
}

var _extends$6 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray$2(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function storeFactory() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (Store) {
    var noptions = {};
    var proto = Store.prototype;

    /** Combine **/
    noptions = _extends$6({}, options);

    /** States **/
    if (proto[specialKeys.STATES]) {
      var instanceStore = new Store();

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = proto[specialKeys.STATES][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          noptions.state[key] = instanceStore[key];
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    /** Actions **/
    if (proto[specialKeys.ACTIONS]) {
      noptions.actions = _extends$6({}, options.actions, proto[specialKeys.ACTIONS]);
    }

    /** Getters **/
    if (proto[specialKeys.GETTERS]) {
      noptions.getters = _extends$6({}, options.getters, proto[specialKeys.GETTERS]);
    }

    /** Mutations **/
    if (proto[specialKeys.MUTATIONS]) {
      noptions.mutations = _extends$6({}, options.mutations, proto[specialKeys.MUTATIONS]);
    }

    /** Modules **/
    if (Store[specialKeys.MODULES]) {
      noptions.modules = _extends$6({}, options.modules, Store[specialKeys.MODULES]);
    }

    /** Plugins **/
    if (Store[specialKeys.PLUGINS]) {
      var _ref;

      (_ref = noptions.plugins || (noptions.plugins = [])).push.apply(_ref, _toConsumableArray$2(Store[specialKeys.PLUGINS]));
    }

    var storeInstance = new Vuex__default.Store(noptions);

    /** Subscribers **/
    if (proto[specialKeys.SUBSCRIBERS]) {
      for (var _key in proto[specialKeys.SUBSCRIBERS]) {
        storeInstance.subscribe(proto[specialKeys.SUBSCRIBERS][_key]);
      }
    }

    return storeInstance;
  };
}

function Store(options) {
  if (options instanceof Function) {
    return storeFactory()(options);
  }

  return storeFactory(options);
}

var _extends$7 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function storeFactory$1() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (Store) {
    var noptions = {};
    var proto = Store.prototype;

    /** Combine **/
    noptions = _extends$7({}, options);

    /** States **/
    if (proto[specialKeys.STATES]) {
      var instanceStore = new Store();

      if (!noptions.state) {
        noptions.state = {};
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = proto[specialKeys.STATES][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          noptions.state[key] = instanceStore[key];
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    /** Actions **/
    if (proto[specialKeys.ACTIONS]) {
      noptions.actions = _extends$7({}, options.actions, proto[specialKeys.ACTIONS]);
    }

    /** Getters **/
    if (proto[specialKeys.GETTERS]) {
      noptions.getters = _extends$7({}, options.getters, proto[specialKeys.GETTERS]);
    }

    /** Mutations **/
    if (proto[specialKeys.MUTATIONS]) {
      noptions.mutations = _extends$7({}, options.mutations, proto[specialKeys.MUTATIONS]);
    }

    /** Modules **/
    if (Store[specialKeys.MODULES]) {
      noptions.modules = _extends$7({}, options.modules, Store[specialKeys.MODULES]);
    }

    return noptions;
  };
}

function Module(options) {
  if (options instanceof Function) {
    return storeFactory$1()(options);
  }

  return storeFactory$1(options);
}

function makeSubscribeDecorator(options) {
  return function (target, key) {
    if (!target[specialKeys.USED_PROPS]) {
      target[specialKeys.USED_PROPS] = {};
    }

    if (!target[specialKeys.SUBSCRIBERS]) {
      target[specialKeys.SUBSCRIBERS] = {};
    }

    if (!target[specialKeys.SUBSCRIBERS][key]) {
      target[specialKeys.USED_PROPS][key] = true;
      target[specialKeys.SUBSCRIBERS][key] = target[key];
    }
  };
}

function Subscribe(options, key, descriptor) {
  if (options instanceof Vuex__default.Store) {
    return makeSubscribeDecorator()(options, key);
  }

  return makeSubscribeDecorator(options);
}

var _extends$8 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof$6 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function InjectModule(moduleName, module) {
  if ((typeof module === 'undefined' ? 'undefined' : _typeof$6(module)) !== 'object') {
    console.error('[Vue decorator error] module must be a object');

    return module;
  }

  return function (target) {
    if (!target[specialKeys.MODULES]) {
      target[specialKeys.MODULES] = {};
    }

    target[specialKeys.MODULES] = _extends$8({}, target[specialKeys.MODULES], _defineProperty$2({}, moduleName, module));

    return target;
  };
}

var _extends$9 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof$7 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function InjectModules(modules) {
  if ((typeof modules === 'undefined' ? 'undefined' : _typeof$7(modules)) !== 'object') {
    console.error('[Vue decorator error] modules must be a object');

    return modules;
  }

  return function (target) {
    if (!target[specialKeys.MODULES]) {
      target[specialKeys.MODULES] = {};
    }

    target[specialKeys.MODULES] = _extends$9({}, target[specialKeys.MODULES], modules);

    return target;
  };
}

function InjectPlugin(plugin) {
  if (typeof plugin !== 'function') {
    console.error('[Vue decorator error] plugin must be a function');

    return plugin;
  }

  return function (target) {
    if (target[specialKeys.PLUGINS]) {
      target[specialKeys.PLUGINS].push(plugin);
    } else {
      target[specialKeys.PLUGINS] = [plugin];
    }

    return target;
  };
}

function _toConsumableArray$3(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function InjectPlugins(plugins) {
  if (!(plugins instanceof Array)) {
    console.error('[Vue decorator error] plugins must be a array');

    return plugins;
  }

  return function (target) {
    if (target[specialKeys.PLUGINS]) {
      var _target$specialKeys$P;

      (_target$specialKeys$P = target[specialKeys.PLUGINS]).push.apply(_target$specialKeys$P, _toConsumableArray$3(plugins));
    } else {
      target[specialKeys.PLUGINS] = plugins;
    }

    return target;
  };
}

var _typeof$8 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty$3(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function makeStateDecorator(options) {
  var store = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return function (target, key) {
    if (!target[specialKeys.USED_PROPS]) {
      target[specialKeys.USED_PROPS] = {};
    }

    if (!target[specialKeys.STATES]) {
      if (store) {
        target[specialKeys.STATES] = [];
      } else {
        target[specialKeys.STATES] = {};
      }
    }

    if (!target[specialKeys.STATES][key]) {
      target[specialKeys.USED_PROPS][key] = true;

      if (store) {
        target[specialKeys.STATES].push(key);
      } else {
        var fc = void 0;

        if (typeof options === 'function') {
          fc = Vuex.mapState(_defineProperty$3({}, key, options))[key];
        } else {
          fc = Vuex.mapState([options || key])[options || key];
        }

        target[specialKeys.STATES][key] = fc;
      }
    }
  };
}

function State(options, key, descriptor) {
  if (options instanceof Vuex__default.Store || (typeof options === 'undefined' ? 'undefined' : _typeof$8(options)) === 'object' && !(options instanceof Vue)) {
    return makeStateDecorator(undefined, true)(options, key);
  }

  if (options instanceof Vue) {
    return makeStateDecorator()(options, key);
  }

  return makeStateDecorator(options);
}

var _typeof$9 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function makeActionDecorator(options) {
  var store = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return function (target, key) {
    if (!target[specialKeys.USED_PROPS]) {
      target[specialKeys.USED_PROPS] = {};
    }

    if (!target[specialKeys.ACTIONS]) {
      target[specialKeys.ACTIONS] = {};
    }

    if (!target[specialKeys.ACTIONS][key]) {
      target[specialKeys.USED_PROPS][key] = true;

      if (store) {
        target[specialKeys.ACTIONS][key] = target[key];
      } else {
        target[specialKeys.ACTIONS][key] = Vuex.mapActions([options || key])[options || key];
      }
    }
  };
}

function Action(options, key, descriptor) {
  if (options instanceof Vuex__default.Store || (typeof options === 'undefined' ? 'undefined' : _typeof$9(options)) === 'object' && !(options instanceof Vue)) {
    return makeActionDecorator(undefined, true)(options, key);
  }

  if (options instanceof Vue) {
    return makeActionDecorator()(options, key);
  }

  return makeActionDecorator(options);
}

var _typeof$10 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function makeGetterDecorator(options) {
  var store = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return function (target, key) {
    if (!target[specialKeys.USED_PROPS]) {
      target[specialKeys.USED_PROPS] = {};
    }

    if (!target[specialKeys.GETTERS]) {
      target[specialKeys.GETTERS] = {};
    }

    if (!target[specialKeys.GETTERS][key]) {
      target[specialKeys.USED_PROPS][key] = true;

      if (store) {
        target[specialKeys.GETTERS][key] = target[key];
      } else {
        target[specialKeys.GETTERS][key] = Vuex.mapGetters([options || key])[options || key];
      }
    }
  };
}

function Getter(options, key, descriptor) {
  if (options instanceof Vuex__default.Store || (typeof options === 'undefined' ? 'undefined' : _typeof$10(options)) === 'object' && !(options instanceof Vue)) {
    return makeGetterDecorator(undefined, true)(options, key);
  }

  if (options instanceof Vue) {
    return makeGetterDecorator()(options, key);
  }

  return makeGetterDecorator(options);
}

var _typeof$11 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function makeMutationDecorator(options) {
  var store = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return function (target, key) {
    if (!target[specialKeys.USED_PROPS]) {
      target[specialKeys.USED_PROPS] = {};
    }

    if (!target[specialKeys.MUTATIONS]) {
      target[specialKeys.MUTATIONS] = {};
    }

    if (!target[specialKeys.MUTATIONS][key]) {
      target[specialKeys.USED_PROPS][key] = true;

      if (store) {
        target[specialKeys.MUTATIONS][key] = target[key];
      } else {
        target[specialKeys.MUTATIONS][key] = Vuex.mapMutations([options || key])[options || key];
      }
    }
  };
}

function Mutation(options, key, descriptor) {
  if (options instanceof Vuex__default.Store || (typeof options === 'undefined' ? 'undefined' : _typeof$11(options)) === 'object' && !(options instanceof Vue)) {
    return makeMutationDecorator(undefined, true)(options, key);
  }

  if (options instanceof Vue) {
    return makeMutationDecorator()(options, key);
  }

  return makeMutationDecorator(options);
}

/** Vue decorators **/

exports.Component = Component;
exports.InjectComponent = InjectComponent;
exports.InjectComponents = InjectComponents;
exports.InjectDirective = InjectDirective;
exports.InjectDirectives = InjectDirectives;
exports.Data = Data;
exports.Prop = Prop;
exports.Watch = Watch;
exports.Mixin = Mixin;
exports.Mixins = Mixins;
exports.Filter = Filter;
exports.Template = Template;
exports.Computed = Computed;
exports.Lifecycle = Lifecycle;
exports.Store = Store;
exports.Module = Module;
exports.Subscribe = Subscribe;
exports.InjectModule = InjectModule;
exports.InjectModules = InjectModules;
exports.InjectPlugin = InjectPlugin;
exports.InjectPlugins = InjectPlugins;
exports.State = State;
exports.Action = Action;
exports.Getter = Getter;
exports.Mutation = Mutation;
