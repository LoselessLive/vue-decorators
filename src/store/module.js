import specialKeys from '../special.keys';

function storeFactory(options = {}) {
  return function (Store) {
    let noptions = {};
    let proto = Store.prototype;

    /** Combine **/
    noptions = {
      ...options
    };

    /** States **/
    if (proto[specialKeys.STATES]) {
      let instanceStore = new Store();

      if(!noptions.state){
        noptions.state = {};
      }

      for (let key of proto[specialKeys.STATES]) {
        noptions.state[key] = instanceStore[key];
      }
    }

    /** Actions **/
    if (proto[specialKeys.ACTIONS]) {
      noptions.actions = {
        ...options.actions,
        ...proto[specialKeys.ACTIONS]
      };
    }

    /** Getters **/
    if (proto[specialKeys.GETTERS]) {
      noptions.getters = {
        ...options.getters,
        ...proto[specialKeys.GETTERS]
      };
    }

    /** Mutations **/
    if (proto[specialKeys.MUTATIONS]) {
      noptions.mutations = {
        ...options.mutations,
        ...proto[specialKeys.MUTATIONS]
      };
    }

    /** Modules **/
    if (Store[specialKeys.MODULES]) {
      noptions.modules = {
        ...options.modules,
        ...Store[specialKeys.MODULES]
      };
    }

    return noptions;
  }
}

export function Module(options){
  if(options instanceof Function){
    return storeFactory()(options);
  }

  return storeFactory(options);
}
