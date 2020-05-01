const path = require('path');
const DashboardPlugin = require('webpack-dashboard/plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports =  {
    entry: {
        'bootstrap4-dialogs': './src/bootstrap4-dialogs.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'bsd',
        libraryTarget: 'umd',
        libraryExport: 'default',
        umdNamedDefine: true,
        globalObject: `(typeof self !== 'undefined' ? self : this)`
    },
    mode: 'production',
    externals: {
        jquery: {
            commonjs: 'jquery',
            commonjs2: 'jquery',
            amd: 'jquery',
            root: '$'
        }
    },
    plugins: [
        new DashboardPlugin(),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            proxy: 'http://localhost:9000/',
            browser: 'firefox'
        }),
        new CopyPlugin([
            {from: 'src/demo.html', to: 'demo.html'}
        ])
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 9000,
        serveIndex: false,
        compress: true,
        watchContentBase: true,
        index: 'demo.html'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};
