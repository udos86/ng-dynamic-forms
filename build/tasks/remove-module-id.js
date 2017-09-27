const gulp        = require("gulp"),
      deleteLines = require("gulp-delete-lines");

module.exports = function (src, dest) {

    return function () {

        return gulp.src(src)
                   .pipe(deleteLines({"filters": [/moduleId: module.id/]}))
                   .pipe(gulp.dest(dest));
    };
};