const gulp       = require("gulp"),
      preprocess = require("gulp-preprocess");

module.exports = src => () => {

    return gulp.src(src)
               .pipe(preprocess())
               .pipe(gulp.dest(file => file.base));
};