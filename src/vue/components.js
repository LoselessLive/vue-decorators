import Vue from 'vue';
import specialKeys from '../special.keys';

function makePropDecorator(options) {
  return function (target, key) {
    if (!target[specialKeys.COMPONENTS]) {
      target[specialKeys.COMPONENTS] = {};
    }

    target[specialKeys.COMPONENTS] = {
      ...target[specialKeys.COMPONENTS],
      ...options
    };
  }
}

export default function Components(options, key, descriptor) {
  if (options instanceof Vue) {
    return makePropDecorator()(options, key);
  }

  return makePropDecorator(options);
};
