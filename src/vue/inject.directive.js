import specialKeys from '../special.keys';

export function InjectDirective(directiveName, directive) {
  if(typeof directive !== 'object'){
    console.error('[Vue decorator error] directive must be a object');

    return directive;
  }

  return function(target){
    if (!target[specialKeys.DIRECTIVES]) {
      target[specialKeys.DIRECTIVES] = {};
    }

    target[specialKeys.DIRECTIVES] = {
      ...target[specialKeys.DIRECTIVES],
      [directiveName]: directive
    };

    return target;
  }
}
