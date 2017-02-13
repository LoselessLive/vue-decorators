/**
 * Vue-decorators v1.1.0
 * (c) 2017 Paweł Partyka
 * @license MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(require('vue'));
var vuex = require('vuex');

var specialKeys = {
  'DATA': '$_vd_data',

  'PROPS': '$_vd_props',
  'METHODS': '$_vd_methods',
  'WATCHERS': '$_vd_watchers',
  'COMPUTED': '$_vd_computed',
  'LIFECYCLE': '$_vd_lifecycle',
  'COMPONENTS': '$_vd_components',
  'FILTERS': '$_vd_filters',

  'TEMPLATE': '$_vd_template',
  'MIXINS': '$_vd_mixins',

  'STATES': '$_vd_states',
  'GETTERS': '$_vd_getters',
  'ACTIONS': '$_vd_actions',
  'MUTATIONS': '$_vd_mutations',

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

      /** Combine **/
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
    noptions.props = _extends({}, options.props, proto[specialKeys.PROPS]);
    noptions.components = _extends({}, options.components, Component[specialKeys.COMPONENTS]);
    noptions.computed = _extends({}, options.computed, proto[specialKeys.COMPUTED], proto[specialKeys.STATES], proto[specialKeys.GETTERS]);
    noptions.methods = _extends({}, options.methods, proto[specialKeys.METHODS], proto[specialKeys.ACTIONS], proto[specialKeys.MUTATIONS]);
    noptions.watch = _extends({}, options.watch, proto[specialKeys.WATCHERS]);
    noptions.filters = _extends({}, options.filters, proto[specialKeys.FILTERS]);

    if (Component[specialKeys.TEMPLATE]) {
      noptions.template = Component[specialKeys.TEMPLATE];
    }

    if (options.mixins) {
      var _ref;

      (_ref = noptions.mixins || (noptions.mixins = [])).push.apply(_ref, _toConsumableArray(options.mixins));
    }
    if (Component[specialKeys.MIXINS]) {
      var _ref2;

      (_ref2 = noptions.mixins || (noptions.mixins = [])).push.apply(_ref2, _toConsumableArray(Component[specialKeys.MIXINS]));
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

function Data(data) {
  if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
    console.error('[Vue decorator error] data must be a object');

    return data;
  }

  return function (target) {
    if (!target[specialKeys.DATA]) {
      target[specialKeys.DATA] = {};
    }

    target[specialKeys.DATA] = _extends$1({}, target[specialKeys.DATA], data);

    return target;
  };
}

var _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function InjectComponent(componentName, component) {
  if ((typeof component === 'undefined' ? 'undefined' : _typeof$1(component)) !== 'object') {
    console.error('[Vue decorator error] component must be a vue component object');

    return component;
  }

  return function (target) {
    if (!target[specialKeys.COMPONENTS]) {
      target[specialKeys.COMPONENTS] = {};
    }

    target[specialKeys.COMPONENTS] = _extends$2({}, target[specialKeys.COMPONENTS], _defineProperty({}, componentName, component));

    return target;
  };
}

var _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof$2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function InjectComponents(components) {
  if ((typeof components === 'undefined' ? 'undefined' : _typeof$2(components)) !== 'object') {
    console.error('[Vue decorator error] components must be a object');

    return components;
  }

  return function (target) {
    if (!target[specialKeys.COMPONENTS]) {
      target[specialKeys.COMPONENTS] = {};
    }

    target[specialKeys.COMPONENTS] = _extends$3({}, target[specialKeys.COMPONENTS], components);

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

var _typeof$3 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function Mixin(mixin) {
  if ((typeof mixin === 'undefined' ? 'undefined' : _typeof$3(mixin)) !== 'object') {
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

function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function makeStateDecorator(options) {
  return function (target, key) {
    if (!target[specialKeys.USED_PROPS]) {
      target[specialKeys.USED_PROPS] = {};
    }

    if (!target[specialKeys.STATES]) {
      target[specialKeys.STATES] = {};
    }

    if (!target[specialKeys.STATES][key]) {
      var fc = void 0;

      if (typeof options === 'function') {
        fc = vuex.mapState(_defineProperty$1({}, key, options))[key];
      } else {
        fc = vuex.mapState([options || key])[options || key];
      }

      target[specialKeys.USED_PROPS][key] = true;
      target[specialKeys.STATES][key] = fc;
    }
  };
}

var state = function (options, key, descriptor) {
  if (options instanceof Vue) {
    return makeStateDecorator()(options, key);
  }

  return makeStateDecorator(options);
};

function makeActionDecorator(options) {
  return function (target, key) {
    if (!target[specialKeys.USED_PROPS]) {
      target[specialKeys.USED_PROPS] = {};
    }

    if (!target[specialKeys.ACTIONS]) {
      target[specialKeys.ACTIONS] = {};
    }

    if (!target[specialKeys.ACTIONS][key]) {
      target[specialKeys.USED_PROPS][key] = true;
      target[specialKeys.ACTIONS][key] = vuex.mapActions([options || key])[options || key];
    }
  };
}

var action = function (options, key, descriptor) {
  if (options instanceof Vue) {
    return makeActionDecorator()(options, key);
  }

  return makeActionDecorator(options);
};

function makeGetterDecorator(options) {
  return function (target, key) {
    if (!target[specialKeys.USED_PROPS]) {
      target[specialKeys.USED_PROPS] = {};
    }

    if (!target[specialKeys.GETTERS]) {
      target[specialKeys.GETTERS] = {};
    }

    if (!target[specialKeys.GETTERS][key]) {
      target[specialKeys.USED_PROPS][key] = true;
      target[specialKeys.GETTERS][key] = vuex.mapGetters([options || key])[options || key];
    }
  };
}

var getter = function (options, key, descriptor) {
  if (options instanceof Vue) {
    return makeGetterDecorator()(options, key);
  }

  return makeGetterDecorator(options);
};

function makeMutationDecorator(options) {
  return function (target, key) {
    if (!target[specialKeys.USED_PROPS]) {
      target[specialKeys.USED_PROPS] = {};
    }

    if (!target[specialKeys.MUTATIONS]) {
      target[specialKeys.MUTATIONS] = {};
    }

    if (!target[specialKeys.MUTATIONS][key]) {
      target[specialKeys.USED_PROPS][key] = true;
      target[specialKeys.MUTATIONS][key] = vuex.mapMutations([options || key])[options || key];
    }
  };
}

var mutation = function (options, key, descriptor) {
  if (options instanceof Vue) {
    return makeMutationDecorator()(options, key);
  }

  return makeMutationDecorator(options);
};

exports.Component = Component;
exports.Data = Data;
exports.InjectComponent = InjectComponent;
exports.InjectComponents = InjectComponents;
exports.Prop = Prop;
exports.Watch = Watch;
exports.Computed = Computed;
exports.Lifecycle = Lifecycle;
exports.Filter = Filter;
exports.Template = Template;
exports.Mixin = Mixin;
exports.Mixins = Mixins;
exports.State = state;
exports.Action = action;
exports.Getter = getter;
exports.Mutation = mutation;
