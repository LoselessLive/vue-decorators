import Vue from 'vue';
import specialKeys from '../special.keys';

function combineDataObject(vm, Component){
  let instanceComponent = new Component();
  let data = new Set(Object.getOwnPropertyNames(instanceComponent));

  [...Object.getOwnPropertyNames(vm), ...Object.getOwnPropertyNames(new Vue())].forEach(function (key) {
    data.delete(key);
  });

  let plainData = {};

  for(let key of data.values()){
    plainData[key] = instanceComponent[key];
  }

  return plainData;
}

function componentFactory(Component, options = {}){
  let proto = Component.prototype;
  let Super = proto instanceof Vue ? proto.constructor : Vue;

  /** Methods **/
  if(!proto[specialKeys.METHODS]){
    proto[specialKeys.METHODS] = {};
  }

  let componentMethods = new Set(Object.getOwnPropertyNames(proto));
  componentMethods.delete('constructor');

  for(let key in specialKeys){
    componentMethods.delete(specialKeys[key]);
  }

  if(proto[specialKeys.USED_PROPS]){
    for(let key in proto[specialKeys.USED_PROPS]){
      componentMethods.delete(key);
    }
  }

  for(let method of componentMethods.values()){
    proto[specialKeys.METHODS][method] = proto[method];
  }

  /** Combine **/
  options = {
    ...options,
    ...proto[specialKeys.LIFECYCLE]
  };
  options.name = options.name || Component.name;
  options.data = options.data;
  options.props = {
    ...options.props,
    ...proto[specialKeys.PROPS]
  };
  options.watch = {
    ...options.watch,
    ...proto[specialKeys.WATCHERS]
  };
  options.computed = {
    ...options.computed,
    ...proto[specialKeys.STATES],
    ...proto[specialKeys.GETTERS]
  };
  options.methods = {
    ...options.methods,
    ...proto[specialKeys.METHODS],
    ...proto[specialKeys.ACTIONS],
    ...proto[specialKeys.MUTATIONS]
  };
  (options.mixins || (options.mixins = [])).push({
    data: function(){ return combineDataObject(this, Component); }
  });

  return Super.extend(options);
}

export default function Component(options){
  if(options instanceof Function){
    return componentFactory(options);
  }

  return function(Component){
    return componentFactory(Component, options);
  };
};
