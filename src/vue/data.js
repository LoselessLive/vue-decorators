import specialKeys from '../special.keys';

export function Data(data) {
  if(typeof data !== 'object'){
    console.error('[Vue decorator error] data must be a object');

    return data;
  }

  return function(target){
    if (!target[specialKeys.DATA]) {
      target[specialKeys.DATA] = {};
    }

    target[specialKeys.DATA] = {
      ...target[specialKeys.DATA],
      ...data
    };

    return target;
  }
}