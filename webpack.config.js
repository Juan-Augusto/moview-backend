const slsw = require("serverless-webpack");
// const { NormalModuleReplacementPlugin } = require('webpack')
const nodeExternals = require("webpack-node-externals");
const WebpackBar = require("webpackbar");
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      node: "14",
                    },
                    useBuiltIns: "usage",
                    corejs: 3,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
  // output: {
  //   libraryTarget: 'commonjs',
  //   path: path.resolve(__dirname, 'dist'),
  //   filename: '[name].js',
  // },
  target: "node",
  entry: slsw.lib.entries,
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  node: false,
  optimization: {
    minimize: false,
  },
  devtool: "inline-cheap-module-source-map",
  plugins: [
    new WebpackBar(),
    // Ignore knex dynamic required dialects that we don't use
    // new NormalModuleReplacementPlugin(/mssql?|oracle(db)?|sqlite3|pg-(native|query)|cardinal|pg|^mysql$/, 'noop2'),
    // new NormalModuleReplacementPlugin(/\.\.\/migrate/, 'noop2'),
    // new NormalModuleReplacementPlugin(/\.\.\/seed/, 'noop2')
  ],
  externals: [nodeExternals()],
};
