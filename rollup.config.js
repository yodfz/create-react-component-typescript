import typescript from 'rollup-plugin-typescript2';
import babel from "rollup-plugin-babel";

export default {
    input: './src/index.tsx',
    output: {
        format:'umd',
        name:'ToolToMattingMessageService',
        file:'dist/index.js'
    },
	plugins: [
        typescript(),
        babel({
            extensions:['.js','.ts','.tsx'],
            exclude: /node_modules/,
            babelrc: false,
            runtimeHelpers: true,
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: [
              'react-require',
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-proposal-class-properties',
              ['@babel/plugin-proposal-object-rest-spread', {
                useBuiltIns: true,
              }],
              ['@babel/plugin-transform-runtime', {
                corejs: 2,
                helpers: true,
                regenerator: true,
                useESModules: false,
              }],
            ],
          })
	]
}