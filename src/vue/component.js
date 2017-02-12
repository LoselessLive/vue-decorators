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
  let noptions = {};
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
  noptions = {
    ...options,
    ...proto[specialKeys.LIFECYCLE]
  };
  noptions.name = options.name || Component.name;
  noptions.data = function(){
    return combineDataObject(this, Component);
  };
  noptions.props = {
    ...options.props,
    ...proto[specialKeys.PROPS]
  };
  noptions.components = {
    ...options.components,
    ...Component[specialKeys.COMPONENTS]
  };
  noptions.computed = {
    ...options.computed,
    ...proto[specialKeys.COMPUTED],
    ...proto[specialKeys.STATES],
    ...proto[specialKeys.GETTERS]
  };
  noptions.methods = {
    ...options.methods,
    ...proto[specialKeys.METHODS],
    ...proto[specialKeys.ACTIONS],
    ...proto[specialKeys.MUTATIONS]
  };
  noptions.watch = {
    ...options.watch,
    ...proto[specialKeys.WATCHERS]
  };
  noptions.mixins = {
    ...options.mixins
  };

  return Super.extend(noptions);
}

export default function Component(options){
  if(options instanceof Function){
    return componentFactory(options);
  }

  return componentFactory(Component, options);
};
