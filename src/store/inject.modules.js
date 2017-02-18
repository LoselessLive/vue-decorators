import specialKeys from '../special.keys';

export function InjectModules(modules) {
  if(typeof modules !== 'object'){
    console.error('[Vue decorator error] modules must be a object');

    return modules;
  }

  return function(target){
    if (!target[specialKeys.MODULES]) {
      target[specialKeys.MODULES] = {};
    }

    target[specialKeys.MODULES] = {
      ...target[specialKeys.MODULES],
      ...modules
    };

    return target;
  }
}
