const run = require("gulp-run");

module.exports = function (pathTsConfig) {

    return function () {
        return run(`ngc -p ${pathTsConfig}`).exec();
    };
};