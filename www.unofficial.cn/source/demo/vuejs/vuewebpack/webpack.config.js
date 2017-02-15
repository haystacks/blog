const path = require('path');

module.exports = {
    entry  : path.resolve(__dirname, './app/index/index.js'),
    output : {
        path       : path.resolve(__dirname, './app/dist'),
        filename   : 'bundle.js',
        publicPath : '/assets/'
    },
    module : {
        loaders: [{
            test   : /\.vue$/,
            loader : 'vue-loader'
        }]
    }
}
