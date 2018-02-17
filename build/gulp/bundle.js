const run = require("gulp-run");

module.exports = rollupConfigPath => () => {

    const rollupES5 = `npm run rollup -- --config ${rollupConfigPath} -f es --target es5`;
    const rollupES2015 = `npm run rollup -- --config ${rollupConfigPath} -f es --target es2015`;
    const rollupUMD = `npm run rollup -- --config ${rollupConfigPath} -f umd --target es5`;
    const rollupUMDMin = `npm run rollup -- --config ${rollupConfigPath} -f umd --target es5 --minify`;

    return run(`${rollupES5} && ${rollupES2015} && ${rollupUMD} && ${rollupUMDMin}`).exec();
};