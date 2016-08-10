const path = require('path');
//const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const phaserModule = path.join(__dirname, '/node_modules/phaser/');

const PATHS = {
    main: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build'),
    phaser: path.join(phaserModule, 'build/custom/phaser-split.js'),
    pixi: path.join(phaserModule, 'build/custom/pixi.js'),
    p2: path.join(phaserModule, 'build/custom/p2.js')
};

module.exports = {
    entry: {
        main: ['babel-polyfill',PATHS.main]
    },
    devtool: 'eval-source-map',
    resolve: {
        extensions: ['', '.js'],
        alias: {
            'phaser': PATHS.phaser,
            'pixi': PATHS.pixi,
            'p2': PATHS.p2
        }
    },
    output: {
        path: PATHS.build,
        publicPath: '/',
        filename: '[name].js'
    },
    devServer: {
        stats: 'errors-only',
        host: process.env.HOST,
        port: process.env.PORT
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Phaser Webpack',
            publicPath: '/'
        })
    ],
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel', include: PATHS.main},
            {test: /pixi\.js/, loader: 'expose?PIXI'},
            {test: /phaser-split\.js$/, loader: 'expose?Phaser'},
            {test: /p2\.js/, loader: 'expose?p2'}
        ]
    }
}
