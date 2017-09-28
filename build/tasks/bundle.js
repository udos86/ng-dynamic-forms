const run = require("gulp-run");

module.exports = function (pathRollupConfig) {

    return function () {
        return run(`rollup --config ${pathRollupConfig} -f es && rollup --config ${pathRollupConfig} -f umd && rollup --config ${pathRollupConfig} -f umd --minify`).exec();
    };
};