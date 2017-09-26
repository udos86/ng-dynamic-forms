const run = require("gulp-run");

module.exports = function (packageName) {

    return function () {
        return run(`npm run compile:package:${packageName}`).exec();
    };
};