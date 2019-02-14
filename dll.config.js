const webpack = require('webpack');

const vendors = [
  'react',
  'react-dom',
  'react-router',
  'redux',
  'react-redux',
  'jquery',
  'react-swipeable-views'
];

module.exports = {
    output: {
        path: 'common',
        filename: '[name].js',
        library: '[name]',
    },
    entry: {
        "lib": vendors,
    },
    plugins: [
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]',
            context: __dirname,
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false  // remove all comments
            }
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ],
};
