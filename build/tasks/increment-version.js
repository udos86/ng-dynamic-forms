"use strict";
var gulp = require("gulp"),
    replace = require("gulp-replace");

module.exports = function (pkg, src, dest) {

    return function () {

        var versionNumber = Number(pkg.version.slice(-2)),
            versionString = /(\d\.\d\.\d-[a-z]+\.)\d{1,2}/,
            newVersionNumber = versionNumber + 1,
            newVersionString = pkg.version.replace(versionString, "$1" + newVersionNumber),
            versionField = /("version":\s)"\d\.\d\.\d-[a-z]+\.\d{1,2}"/,
            dependencyField = /("@ng2-dynamic-forms\/[a-z\-]+":\s)"\^\d\.\d\.\d-[a-z]+\.\d{1,2}"/g;

        return gulp.src(src)
                   .pipe(replace(versionField, "$1" + '"' + newVersionString + '"'))
                   .pipe(replace(dependencyField, "$1" + '"^' + newVersionString + '"'))
                   .pipe(gulp.dest(dest));
    }
};