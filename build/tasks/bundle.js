const run = require("gulp-run");

module.exports = function (pathRollupConfig) {

    return function () {
        return run(`
            rollup --config ${pathRollupConfig} -f es --target es5 &&
            rollup --config ${pathRollupConfig} -f es --target es2015 &&  
            rollup --config ${pathRollupConfig} -f umd --target es5 && 
            rollup --config ${pathRollupConfig} -f umd --target es5 --minify`).exec();
    };
};