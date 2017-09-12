const util    = require("gulp-util"),
      webpack = require("webpack");

module.exports = function (config) {

    return function (done) {

        webpack(config, function (error, stats) {

            if (error) {
                throw new util.PluginError("webpack", error);
            }

            util.log("bundle:packages", stats.toString({
                chunks: false,
                colors: true,
                hash: false,
                version: false
            }));
            done();
        });
    }
};