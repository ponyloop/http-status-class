const json = require('rollup-plugin-json');
const babel = ('rollup-plugin-babel');

export default {
  entry: './src/main.js',
  format: 'cjs',
  plugins: [ json(), babel(), require('rollup-plugin-babel')({
      exclude: 'node_modules/**'
    })],
  dest: './dist/http-status-class.js'
};
