const gulp    = require("gulp"),
      typeDoc = require("gulp-typedoc");

module.exports = function (src, config) {

    return function () {

        return gulp
            .src(src, {read: false})
            .pipe(typeDoc(config));
    }
};