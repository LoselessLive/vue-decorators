# Vue Decorators
> This is Vue Decorators v1.0.4 (beta)

Vue & Vuex Decorators for ECMAscript

## Dependencies

- [Vue](https://github.com/vuejs/vue)
- [Vuex](https://github.com/vuejs/vuex)

## Installation

```bash
npm install --save vue-decorators
```

## Decorators

There are 10 decorators:

* `@Component` or `@Component({ ... })`
* `@Components({ ... })`
* `@Prop` or `@Prop({ ... })`
* `@Watch` or `@Watch('...')`
* `@Lifecycle` or `@Lifecycle('...')`
* `@Computed`

* `@State` or `@State('...')`
* `@Action` or `@Action('...')`
* `@Getter` or `@Getter('...')`
* `@Mutation` or `@Mutation('...')`


## Example

```js
import Vue from 'vue'
import {
  Component,
  Components,
  Prop,
  Watch,
  Lifecycle,
  Computed,

  State,
  Action,
  Getter,
  Mutation
} from 'vue-decorators';
import Component1 from '...';
import Component2 from '...';

@Component
@Components({
    Component1,
    Component2
})
export class MyComponent extends Vue {
  credentials = {
    username: '',
    password: ''
  };
  otherData = 123;

  @Prop property1;
  @Prop({
    type: Number,
    default: 100
  }) property2;
  @Prop({ required: true }) property3;

  @Action login;
  @Getter currentUser;

  @Watch('otherData')
  otherDataListener(){ /* ... */ }

  @Lifecycle
  created(){ /* ... */ }

  @Computed
  computedMethos(){ /* ... */ }

  normalVueMethods(){
    /* ... */
    this.login().then(function(){ /* ... */ });
  }
}
```

## License

MIT