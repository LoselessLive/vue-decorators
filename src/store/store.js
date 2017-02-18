import Vuex from 'vuex';
import specialKeys from '../special.keys';

function storeFactory(options = {}){
  return function(Store){
    let noptions = {};
    let proto = Store.prototype;

    /** Combine **/
    noptions = {
      ...options
    };

    /** States **/
    if(proto[specialKeys.STATES]){
      let instanceStore = new Store();

      for(let key of proto[specialKeys.STATES]){
        noptions.state[key] = instanceStore[key];
      }
    }

    /** Actions **/
    if(proto[specialKeys.ACTIONS]){
      noptions.actions = {
        ...options.actions,
        ...proto[specialKeys.ACTIONS]
      };
    }

    /** Getters **/
    if(proto[specialKeys.GETTERS]){
      noptions.getters = {
        ...options.getters,
        ...proto[specialKeys.GETTERS]
      };
    }

    /** Mutations **/
    if(proto[specialKeys.MUTATIONS]){
      noptions.mutations = {
        ...options.mutations,
        ...proto[specialKeys.MUTATIONS]
      };
    }

    /** Modules **/
    if(Store[specialKeys.MODULES]){
      noptions.modules = {
        ...options.modules,
        ...Store[specialKeys.MODULES]
      };
    }

    /** Plugins **/
    if(Store[specialKeys.PLUGINS]){
      (noptions.plugins || (noptions.plugins = [])).push(...Store[specialKeys.PLUGINS]);
    }

    let storeInstance = new Vuex.Store(noptions);

    /** Subscribers **/
    if(proto[specialKeys.SUBSCRIBERS]){
      for(let key in proto[specialKeys.SUBSCRIBERS]){
        storeInstance.subscribe(proto[specialKeys.SUBSCRIBERS][key]);
      }
    }

    return storeInstance;
  }
}

export function Store(options){
  if(options instanceof Function){
    return storeFactory()(options);
  }

  return storeFactory(options);
}
