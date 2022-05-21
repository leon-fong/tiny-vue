import typescript from '@rollup/plugin-typescript'
export default {
  input: 'src/index.ts',
  output: [
    {
      format: 'cjs',
      file: 'lib/tiny-vue.cjs.js',
      sourcemap: true,
    },
    {
      format: 'es',
      file: 'lib/tiny-vue.es.js',
      sourcemap: true,
    },
    {
      format: 'iife',
      file: 'lib/tiny-vue.global.js',
      name: 'tinyVue',
      sourcemap: true,
    },
  ],
  plugins: [typescript()],
}
