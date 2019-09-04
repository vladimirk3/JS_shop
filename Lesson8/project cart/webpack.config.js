const path = require('path') 
const MiniCssPlugin = require ('mini-css-extract-plugin');
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const VueLoaderPlugin = require ('vue-loader/lib/plugin');

module.exports = {
    entry: {
        main: path.resolve (__dirname, 'src', 'public', 'index.js')
    },
    output: {
        path: path.resolve (__dirname, 'dist', 'public'),
        filename: 'bundle.js'
    },
    devServer: {
        port:8080
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                loader: 'babel-loader'
            },
            
            {
                test: /\.css$/,
                exclude: '/node_modules/',
                use: [MiniCssPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins: [
        new MiniCssPlugin ({
            filename: 'css/[name].css',
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin ({
            template: path.resolve(__dirname,'src', 'public', 'index.html'),
            filename: 'index.html'
        }),
        new VueLoaderPlugin ()
    ]
}