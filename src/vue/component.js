import Vue from 'vue';
import specialKeys from '../special.keys';

function combineDataObject(vm, Component, optionsData){
  let instanceComponent = new Component();
  let data = new Set(Object.getOwnPropertyNames(instanceComponent));

  [...Object.getOwnPropertyNames(vm), ...Object.getOwnPropertyNames(new Vue())].forEach(function (key) {
    data.delete(key);
  });

  for(let key in Component.prototype[specialKeys.USED_PROPS]){
    data.delete(key);
  }

  let plainData = {};

  if(optionsData){
    if(typeof optionsData === 'function'){
      plainData = {
        ...plainData,
        ...(new optionsData())
      };
    } else {
      plainData = {
        ...plainData,
        ...optionsData
      };
    }
  }

  if(Component[specialKeys.DATA]){
    for(let key in Component[specialKeys.DATA]){
      plainData[key] = Component[specialKeys.DATA][key];
    }
  }

  for(let key of data.values()){
    plainData[key] = instanceComponent[key];
  }

  return plainData;
}

function componentFactory(options = {}){
  return function(Component){
    let noptions = {};
    let proto = Component.prototype;

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

    /** Combine, Lifecycle, Name & Data **/
    noptions = {
      ...options,
      ...proto[specialKeys.LIFECYCLE]
    };

    noptions.name = options.name || Component.name;
    noptions.data = function(){
      return combineDataObject(this, Component, options.data);
    };

    /** Template **/
    if(Component[specialKeys.TEMPLATE]){
      noptions.template = Component[specialKeys.TEMPLATE];
    }

    /** Props **/
    if(proto[specialKeys.PROPS]){
      noptions.props = {
        ...options.props,
        ...proto[specialKeys.PROPS]
      };
    }

    /** Components **/
    if(Component[specialKeys.COMPONENTS]){
      noptions.components = {
        ...options.components,
        ...Component[specialKeys.COMPONENTS]
      };
    }

    /** Directives **/
    if(Component[specialKeys.DIRECTIVES]){
      noptions.directives = {
        ...noptions.directives,
        ...Component[specialKeys.DIRECTIVES]
      };
    }

    /** Computed **/
    if(proto[specialKeys.COMPUTED] || proto[specialKeys.STATES] || proto[specialKeys.GETTERS]){
      noptions.computed = {
        ...options.computed,
        ...proto[specialKeys.COMPUTED],
        ...proto[specialKeys.STATES],
        ...proto[specialKeys.GETTERS]
      };
    }

    /** Methods **/
    if(proto[specialKeys.METHODS] || proto[specialKeys.ACTIONS] || proto[specialKeys.MUTATIONS]){
      noptions.methods = {
        ...options.methods,
        ...proto[specialKeys.METHODS],
        ...proto[specialKeys.ACTIONS],
        ...proto[specialKeys.MUTATIONS]
      };
    }

    /** Watchers **/
    if(proto[specialKeys.WATCHERS]){
      noptions.watch = {
        ...options.watch,
        ...proto[specialKeys.WATCHERS]
      };
    }

    /** Filters **/
    if(proto[specialKeys.FILTERS]){
      noptions.filters = {
        ...options.filters,
        ...proto[specialKeys.FILTERS]
      };
    }

    /** Mixins **/
    if(Component[specialKeys.MIXINS]){
      (noptions.mixins || (noptions.mixins = [])).push(...Component[specialKeys.MIXINS]);
    }

    return noptions;
  }
}

export function Component(options){
  if(options instanceof Function){
    return componentFactory()(options);
  }

  return componentFactory(options);
}
