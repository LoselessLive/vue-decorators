const babel = require('rollup-plugin-babel');
const replace = require('rollup-plugin-replace');
const version = process.env.VERSION || require('./package.json').version;

module.exports = {
    entry: 'src/index.js',
    dest: 'dist/vue-decorators.js',
    format: 'cjs',
    moduleName: 'vue-decorators',
    external: ['vue', 'vuex'],
    plugins: [
        replace({__VERSION__: version}),
        babel()
    ],
    banner: `/**
 * Vue-decorators v${version}
 * (c) ${new Date().getFullYear()} Paweł Partyka
 * @license MIT
 */`
};
