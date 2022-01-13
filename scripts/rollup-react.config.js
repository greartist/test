import multiInput from 'rollup-plugin-multi-input';
import url from '@rollup/plugin-url';
import nodeResolve from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';
import ignoreImport from 'rollup-plugin-ignore-import';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
// import { terser } from 'rollup-plugin-terser';

const env = process.env.NODE_ENV;

import pkg from '../packages/dml-react/package.json';
import rootPkg from '../package.json';

const externalDeps = Object.keys(pkg.dependencies || {}).concat(
  Object.keys(rootPkg.dependencies || {})
);
const externalPeerDeps = Object.keys(pkg.peerDependencies || {}).concat(
  Object.keys(rootPkg.peerDependencies || {})
);
const inputList = [
  'packages/dml-react/components/**/*.ts',
  'packages/dml-react/components/**/*.tsx',
];

const getPlugins = (options) => {
  const { type = 'lib' } = options || {};
  const plugins = [
    multiInput({ relative: 'packages/dml-react/components/' }),
    nodeResolve(),
    commonjs(),
    esbuild({
      include: /\.[jt]sx?$/,
      target: 'esnext',
      minify: false,
      jsx: 'transform',
      tsconfig: 'tsconfig.json',
    }),
    url(),
    json(),
    replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify(env),
      },
    }),
  ];

  if (type === 'lib') {
    plugins.push(ignoreImport({ extensions: ['*.less'] }));
  }

  if (type === 'esm') {
    plugins.push();
  }
  return plugins;
};

const libConfig = {
  input: inputList,
  external: externalDeps.concat(externalPeerDeps), //否则会出现存在多个 react react-dom 导致报错
  plugins: getPlugins({ type: 'lib' }),
  output: {
    dir: 'packages/dml-react/lib',
    format: 'esm',
    sourcemap: true,
    chunkFileNames: '_chunks/[name]-[hash].js',
  },
};

// 按需加载组件 带原始 less 文件，可定制主题
const esmConfig = {
  input: inputList,
  external: externalDeps.concat(externalPeerDeps), //否则会出现存在多个 react react-dom 导致报错
  plugins: getPlugins({ type: 'esm' }),
  output: {
    dir: 'packages/dml-react/esm',
    format: 'esm',
    sourcemap: true,
    chunkFileNames: '_chunks/[name]-[hash].js',
  },
};

export default [libConfig];
