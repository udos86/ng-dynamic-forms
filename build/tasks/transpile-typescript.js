var gulp = require("gulp"),
    typeScript = require("gulp-typescript"),
    merge = require("merge2"),
    sourceMaps = require("gulp-sourcemaps");

module.exports = function (src, dest, configPath) {

    return function () {

        var tsProject = typeScript.createProject(configPath, {
            typescript: require("typescript")
        });

        var pipe = gulp.src(src)
                            .pipe(sourceMaps.init())
                            .pipe(typeScript(tsProject));

        var dts = pipe.dts.pipe(gulp.dest(dest));

        return merge([
            dts,
            pipe
                .pipe(sourceMaps.write("."))
                .pipe(gulp.dest(dest))
        ]);
    };
};