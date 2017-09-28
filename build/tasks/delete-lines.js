const gulp        = require("gulp"),
      deleteLines = require("gulp-delete-lines");

module.exports = function (src, dest, filters) {

    return function () {

        return gulp.src(src)
                   .pipe(deleteLines({"filters": filters}))
                   .pipe(gulp.dest(dest));
    };
};