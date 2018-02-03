const run = require("gulp-run");

module.exports = tsConfigPath => () => run(`ngc -p ${tsConfigPath}`).exec();