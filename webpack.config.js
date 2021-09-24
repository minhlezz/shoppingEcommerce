const path = require('path');
const CURRENT_WKDIR = process.cwd();
const nodeExternals = require('webpack-node-externals');
/** */
const config = {
    name: "server",
    entry: [path.join(CURRENT_WKDIR, './index.js')],
    target: "node",
    output: {
        path: path.join(CURRENT_WKDIR, '/dist/'),
        filename: "server.bundle.js",
        publicPath: '/dist/',
        libraryTarget: "commonjs2"
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    }
}

module.exports = config;