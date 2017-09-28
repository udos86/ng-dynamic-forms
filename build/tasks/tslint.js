const gulp   = require("gulp"),
      tsLint = require("gulp-tslint");

module.exports = function (src, configPath) {

    return function () {
        return gulp.src(src)
                   .pipe(tsLint({configuration: configPath}))
                   .pipe(tsLint.report());
    }
};