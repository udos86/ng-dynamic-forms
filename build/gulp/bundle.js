const run = require("gulp-run");

module.exports = rollupConfigPath => () => {

    return run(`rollup --config ${rollupConfigPath} -f es --target es5 &&
            rollup --config ${rollupConfigPath} -f es --target es2015 &&  
            rollup --config ${rollupConfigPath} -f umd --target es5 && 
            rollup --config ${rollupConfigPath} -f umd --target es5 --minify`).exec();
};