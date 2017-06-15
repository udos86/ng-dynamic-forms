const gulp       = require("gulp"),
      preprocess = require("gulp-preprocess");

module.exports = function (src, dest) {

    return function () {

        return gulp.src(src)
                   .pipe(preprocess())
                   .pipe(gulp.dest(dest));
    };
};