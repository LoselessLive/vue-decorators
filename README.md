# Vue Decorators
> This is Vue Decorators v1.0.1 (beta)

Vue & Vuex Decorators for ECMAscript

## Dependencies

- [Vue](https://github.com/vuejs/vue)
- [Vuex](https://github.com/vuejs/vuex)

## Installation

```bash
npm install --save vue-decorators
```

## Decorators

There are 8 decorators:

* `@Component` or `@Component({ ... })`
* `@Prop` or `@Prop({ ... })`
* `@Watch` or `@Watch('...')`
* `@Lifecycle` or `@Lifecycle('...')`

* `@State` or `@State('...')`
* `@Action` or `@Action('...')`
* `@Getter` or `@Getter('...')`
* `@Mutation` or `@Mutation('...')`


## Example

```js
import Vue from 'vue'
import {
  Component,
  Prop,
  Watch,
  Lifecycle,

  State,
  Action,
  Getter,
  Mutation
} from 'vue-decorators'

@Component
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

  normalVueMethods(){
    /* ... */
    this.login().then(function(){ /* ... */ });
  }
}
```

## License

MIT