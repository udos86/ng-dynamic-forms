const gulp       = require("gulp"),
      sourceMaps = require("gulp-sourcemaps"),
      ts         = require("gulp-typescript"),
      util       = require("gulp-util");

module.exports = function (src, dest, configPath, moduleFormat) {

    return function () {

        let tsProject = ts.createProject(configPath, {module: moduleFormat});

        util.log(`Using TypeScript ${util.colors.magenta(tsProject.typescript.version)}`);

        return gulp.src(src)
                   .pipe(sourceMaps.init())
                   .pipe(tsProject(ts.reporter.defaultReporter()))
                   .pipe(sourceMaps.write("."))
                   .pipe(gulp.dest(dest));
    };
};