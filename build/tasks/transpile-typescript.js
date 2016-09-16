"use strict";
var gulp = require("gulp"),
    ts = require("gulp-typescript"),
    merge = require("merge2"),
    sourcemaps = require("gulp-sourcemaps");

module.exports = function (src, dest, configPath) {

    return function () {

        var tsProject = ts.createProject(configPath, {
            typescript: require("typescript")
        });

        var pipe = gulp.src(src)
                            .pipe(sourcemaps.init())
                            .pipe(ts(tsProject));

        var dts = pipe.dts.pipe(gulp.dest(dest));

        return merge([
            dts,
            pipe
                .pipe(sourcemaps.write("."))
                .pipe(gulp.dest(dest))
        ]);
    };
};