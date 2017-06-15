const gulp = require("gulp");

module.exports = function (src, dest) {

    return function () {

        return gulp.src(src)
                   .pipe(gulp.dest(dest));
    };
};