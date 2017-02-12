/**
 * Vue-decorators v1.0.5
 * (c) 2017 Paweł Partyka
 * @license MIT
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('vuex')) :
	typeof define === 'function' && define.amd ? define(['exports', 'vue', 'vuex'], factory) :
	(factory((global['vue-decorators'] = global['vue-decorators'] || {}),global.Vue,global.vuex));
}(this, (function (exports,Vue,vuex) { 'use strict';

Vue = 'default' in Vue ? Vue['default'] : Vue;

var specialKeys = {
  'PROPS': '$_vd_props',
  'METHODS': '$_vd_methods',
  'WATCHERS': '$_vd_watchers',
  'COMPUTED': '$_vd_computed',
  'LIFECYCLE': '$_vd_lifecycle',
  'COMPONENTS': '$_vd_components',
  'FILTERS': '$_vd_filter',

  'STATES': '$_vd_states',
  'GETTERS': '$_vd_getters',
  'ACTIONS': '$_vd_actions',
  'MUTATIONS': '$_vd_mutations',

  'USED_PROPS': '$_vd_used_props'
};

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function combineDataObject(vm, Component) {
  var instanceComponent = new Component();
  var data = new Set(Object.getOwnPropertyNames(instanceComponent));

  [].concat(_toConsumableArray(Object.getOwnPropertyNames(vm)), _toConsumableArray(Object.getOwnPropertyNames(new Vue()))).forEach(function (key) {
    data.delete(key);
  });

  var plainData = {};

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = data.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      plainData[key] = instanceComponent[key];
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
    var Super = proto instanceof Vue ? proto.constructor : Vue;

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
      for (var _key in proto[specialKeys.USED_PROPS]) {
        componentMethods.delete(_key);
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
      return combineDataObject(this, Component);
    };
    noptions.props = _extends({}, options.props, proto[specialKeys.PROPS]);
    noptions.components = _extends({}, options.components, Component[specialKeys.COMPONENTS]);
    noptions.computed = _extends({}, options.computed, proto[specialKeys.COMPUTED], proto[specialKeys.STATES], proto[specialKeys.GETTERS]);
    noptions.methods = _extends({}, options.methods, proto[specialKeys.METHODS], proto[specialKeys.ACTIONS], proto[specialKeys.MUTATIONS]);
    noptions.watch = _extends({}, options.watch, proto[specialKeys.WATCHERS]);
    noptions.filters = _extends({}, options.filters, proto[specialKeys.FILTERS]);

    return Super.extend(noptions);
  };
}

function Component(options) {
  if (options instanceof Function) {
    return componentFactory()(options);
  }

  return componentFactory(options);
}

var _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function makeComponentsDecorator(options) {
  return function (target) {
    if (!target[specialKeys.COMPONENTS]) {
      target[specialKeys.COMPONENTS] = {};
    }

    target[specialKeys.COMPONENTS] = _extends$1({}, target[specialKeys.COMPONENTS], options);

    return target;
  };
}

function Components(options) {
  if (options instanceof Vue) {
    return makeComponentsDecorator()(options);
  }

  return makeComponentsDecorator(options);
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

function makeStateDecorator(options) {
  return function (target, key) {
    if (!target[specialKeys.USED_PROPS]) {
      target[specialKeys.USED_PROPS] = {};
    }

    if (!target[specialKeys.STATES]) {
      target[specialKeys.STATES] = {};
    }

    if (!target[specialKeys.STATES][key]) {
      target[specialKeys.USED_PROPS][key] = true;
      target[specialKeys.STATES][key] = vuex.mapState([options || key])[options || key];
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
exports.Components = Components;
exports.Prop = Prop;
exports.Watch = Watch;
exports.Computed = Computed;
exports.Lifecycle = Lifecycle;
exports.Filter = Filter;
exports.State = state;
exports.Action = action;
exports.Getter = getter;
exports.Mutation = mutation;

Object.defineProperty(exports, '__esModule', { value: true });

})));
