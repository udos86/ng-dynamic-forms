const gulp       = require("gulp"),
      ts         = require("gulp-typescript"),
      sourceMaps = require("gulp-sourcemaps"),
      console    = require("console");

module.exports = function (src, dest, configPath, moduleFormat) {

    return function () {

        let tsProject = ts.createProject(configPath, {module: moduleFormat});

        console.log(`Using TypeScript version ${tsProject.typescript.version}`);

        return gulp.src(src)
                   .pipe(sourceMaps.init())
                   .pipe(tsProject(ts.reporter.defaultReporter()))
                   .pipe(sourceMaps.write("."))
                   .pipe(gulp.dest(dest));
    };
};