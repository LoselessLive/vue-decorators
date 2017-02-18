import specialKeys from '../special.keys';

export function InjectDirectives(directives) {
  if(typeof directives !== 'object'){
    console.error('[Vue decorator error] directives must be a object');

    return directives;
  }

  return function(target){
    if (!target[specialKeys.DIRECTIVES]) {
      target[specialKeys.DIRECTIVES] = {};
    }

    target[specialKeys.DIRECTIVES] = {
      ...target[specialKeys.DIRECTIVES],
      ...directives
    };

    return target;
  }
}
