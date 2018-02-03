const gulp       = require("gulp"),
      sourceMaps = require("gulp-sourcemaps"),
      ts         = require("gulp-typescript"),
      util       = require("gulp-util");

module.exports = (src, dest, tsConfigPath, moduleFormat) => () => {

    const tsProject = ts.createProject(tsConfigPath, {module: moduleFormat});

    util.log(`Using TypeScript ${util.colors.magenta(tsProject.typescript.version)}`);

    return gulp.src(src)
               .pipe(sourceMaps.init())
               .pipe(tsProject(ts.reporter.defaultReporter()))
               .pipe(sourceMaps.write("."))
               .pipe(gulp.dest(dest));
};