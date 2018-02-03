const gulp   = require("gulp"),
      tsLint = require("gulp-tslint");

module.exports = (src, tsLintConfigPath) => () => {

    return gulp.src(src)
               .pipe(tsLint({configuration: tsLintConfigPath}))
               .pipe(tsLint.report());
};