const gulp = require("gulp");

module.exports = (src, dest) => () => {

    return gulp.src(src)
               .pipe(gulp.dest(dest));
};