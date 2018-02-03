const gulp    = require("gulp"),
      typeDoc = require("gulp-typedoc");

module.exports = (src, tsConfig) => () => {

    return gulp.src(src, {read: false})
               .pipe(typeDoc(tsConfig));
};