const config = require('./webpack.config.js'),
      merge  = require("webpack-merge");

module.exports = merge(config, {

    entry: {
        "app": "./aot/sample/main.aot.ngc.js"
    }
});