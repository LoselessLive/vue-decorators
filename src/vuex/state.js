import Vue from 'vue';
import {mapState} from 'vuex'
import specialKeys from '../special.keys';

function makeStateDecorator(options){
  return function(target, key){
    if(!target[specialKeys.USED_PROPS]){
      target[specialKeys.USED_PROPS] = {};
    }

    if(!target[specialKeys.STATES]){
      target[specialKeys.STATES] = {};
    }

    if(!target[specialKeys.STATES][key]){
      target[specialKeys.USED_PROPS][key] = true;
      target[specialKeys.STATES][key] = mapState([options || key])[options || key];
    }
  }
}

export default function(options, key, descriptor){
  if(options instanceof Vue){
    return makeStateDecorator()(options, key);
  }

  return makeStateDecorator(options);
};
