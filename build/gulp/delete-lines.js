const gulp        = require("gulp"),
      deleteLines = require("gulp-delete-lines");

module.exports = (src, dest, filters) => () => {

    return gulp.src(src)
               .pipe(deleteLines({filters}))
               .pipe(gulp.dest(dest));
};