import specialKeys from '../special.keys';

export function InjectModule(moduleName, module) {
  if(typeof module !== 'object'){
    console.error('[Vue decorator error] module must be a object');

    return module;
  }

  return function(target){
    if (!target[specialKeys.MODULES]) {
      target[specialKeys.MODULES] = {};
    }

    target[specialKeys.MODULES] = {
      ...target[specialKeys.MODULES],
      [moduleName]: module
    };

    return target;
  }
}
