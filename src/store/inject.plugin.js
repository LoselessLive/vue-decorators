import specialKeys from '../special.keys';

export function InjectPlugin(plugin) {
  if(typeof plugin !== 'function'){
    console.error('[Vue decorator error] plugin must be a function');

    return plugin;
  }

  return function(target){
    if(target[specialKeys.PLUGINS]){
      target[specialKeys.PLUGINS].push(plugin);
    } else {
      target[specialKeys.PLUGINS] = [plugin];
    }

    return target;
  }
}
