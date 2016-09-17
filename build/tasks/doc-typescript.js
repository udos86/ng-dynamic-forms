"use strict";
var typedoc = require("gulp-typedoc");

module.exports = function (src, config) {

    return function () {

        return gulp.src(src, {read: false})
                   .pipe(typedoc(config));
    }
};