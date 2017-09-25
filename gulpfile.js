const gulp        = require("gulp"),
      del         = require("del"),
      runSequence = require("run-sequence"),
      pkg         = require("./package.json");

const TASK_BUNDLE_ROLLUP        = require("./build/tasks/bundle-rollup-stream"),
      TASK_CLEAN                = require("./build/tasks/clean"),
      TASK_COPY                 = require("./build/tasks/copy"),
      TASK_COMPILE_PACKAGE      = require("./build/tasks/compile-package"),
      TASK_INCREMENT_VERSION    = require("./build/tasks/increment-version"),
      TASK_INLINE_NG2_TEMPLATES = require("./build/tasks/inline-ng2-templates"),
      TASK_LINT_TYPESCRIPT      = require("./build/tasks/lint-typescript"),
      TASK_PREPROCESS           = require("./build/tasks/preprocess"),
      TASK_REMOVE_MODULE_ID     = require("./build/tasks/remove-module-id"),
      TASK_TRANSPILE_TYPESCRIPT = require("./build/tasks/transpile-typescript"),
      TASK_DOC_TYPESCRIPT       = require("./build/tasks/doc-typescript");

const NPM_SCOPE      = "@ng-dynamic-forms",
      SRC_PATH       = "./packages",
      DIST_BASE_PATH = "./dist",
      DIST_PATH      = `${DIST_BASE_PATH}/${NPM_SCOPE}`,
      NPM_BASE_PATH  = "./node_modules",
      NPM_PATH       = `${NPM_BASE_PATH}/${NPM_SCOPE}`,
      TEST_PATH      = "./test",
      PACKAGES_NAMES = [
          "core",
          "ui-basic",
          "ui-bootstrap",
          "ui-foundation",
          "ui-ionic",
          "ui-kendo",
          "ui-material",
          "ui-ng-bootstrap",
          "ui-primeng"
      ];

PACKAGES_NAMES.forEach(packageName => {

    const PACKAGE_SRC_PATH  = `${SRC_PATH}/${packageName}`,
          PACKAGE_DIST_PATH = `${DIST_PATH}/${packageName}`;

    const TASK_NAME_LINT                = `lint:${packageName}`,
          TASK_NAME_CLEAN               = `clean:${packageName}`,
          TASK_NAME_COMPILE             = `compile:${packageName}`,
          TASK_NAME_COPY                = `copy:${packageName}`,
          TASK_NAME_PREPROCESS          = `preprocess:${packageName}`,
          TASK_NAME_INLINE_NG_TEMPLATES = `inline-ng-templates:${packageName}`,
          TASK_NAME_BUNDLE              = `bundle:${packageName}`,
          TASK_NAME_REMOVE_MODULE_ID    = `remove-module-id:${packageName}`,
          TASK_NAME_CLEANUP             = `cleanup:${packageName}`,
          TASK_NAME_BUILD               = `build:${packageName}`;

    gulp.task(TASK_NAME_LINT,
        TASK_LINT_TYPESCRIPT([`${PACKAGE_SRC_PATH}/**/*.ts`], "./tslint.json"));

    gulp.task(TASK_NAME_CLEAN,
        TASK_CLEAN([`${PACKAGE_DIST_PATH}/**/*`]));

    gulp.task(TASK_NAME_COMPILE,
        TASK_COMPILE_PACKAGE(packageName));

    gulp.task(TASK_NAME_COPY,
        TASK_COPY([`${PACKAGE_SRC_PATH}/package.json`, `${PACKAGE_SRC_PATH}/README.md`, `${PACKAGE_SRC_PATH}/**/*.html`], PACKAGE_DIST_PATH));

    gulp.task(TASK_NAME_PREPROCESS,
        TASK_PREPROCESS(`${PACKAGE_DIST_PATH}/**/*.js`, PACKAGE_DIST_PATH));

    gulp.task(TASK_NAME_INLINE_NG_TEMPLATES,
        TASK_INLINE_NG2_TEMPLATES([`${PACKAGE_DIST_PATH}/**/*.js`], PACKAGE_DIST_PATH));

    gulp.task(TASK_NAME_BUNDLE,
        TASK_BUNDLE_ROLLUP(DIST_PATH, packageName, "ng2DF", pkg, DIST_PATH));

    gulp.task(TASK_NAME_REMOVE_MODULE_ID,
        TASK_REMOVE_MODULE_ID([`${PACKAGE_DIST_PATH}/**/*`], PACKAGE_DIST_PATH));

    gulp.task(TASK_NAME_CLEANUP, function () {
        return del([`${PACKAGE_DIST_PATH}/*.js`, `${PACKAGE_DIST_PATH}/src/**/*.js`]);
    });


    gulp.task(TASK_NAME_BUILD, done => {
        runSequence(
            TASK_NAME_LINT,
            TASK_NAME_CLEAN,
            TASK_NAME_COMPILE,
            TASK_NAME_COPY,
            TASK_NAME_PREPROCESS,
            TASK_NAME_INLINE_NG_TEMPLATES,
            TASK_NAME_BUNDLE,
            TASK_NAME_REMOVE_MODULE_ID,
            TASK_NAME_CLEANUP,
            done
        );
    });
});

gulp.task("build-debug:packages", function (done) {
    runSequence("transpile:packages:debug", done);
});

gulp.task("build:packages", function (done) {
    runSequence(...PACKAGES_NAMES.map(packageName => `build:${packageName}`), done);
});

gulp.task("transpile:packages:debug",
    TASK_TRANSPILE_TYPESCRIPT([`${DIST_PATH}/**/*.ts`], DIST_PATH, "./tsconfig.packages.json", "commonjs"));

gulp.task("watch:packages", function () {
    gulp.watch([`${SRC_PATH}/**/*.*`], ["build:packages"]);
});


gulp.task("clean:tests",
    TASK_CLEAN([`${TEST_PATH}/**/*`]));

gulp.task("copy:tests",
    TASK_COPY([`${SRC_PATH}/**/*.{html,ts}`], TEST_PATH));

gulp.task("transpile:tests",
    TASK_TRANSPILE_TYPESCRIPT([`${TEST_PATH}/**/*.ts`], TEST_PATH, "./tsconfig.packages.json", "commonjs"));

gulp.task("build:tests", function (done) {
    runSequence("clean:tests", "copy:tests", "transpile:tests", done);
});


gulp.task("build", function (done) {
    runSequence("build:packages", "build:tests", done);
});


gulp.task("lint:packages",
    TASK_LINT_TYPESCRIPT([`${SRC_PATH}/**/*.ts`], "./tslint.json"));

gulp.task("clean:dist",
    TASK_CLEAN([`${DIST_BASE_PATH}/**/*`]));

gulp.task("clean:node_modules",
    TASK_CLEAN([`${NPM_PATH}/**/*`]));

gulp.task("copy:node_modules",
    TASK_COPY([`${DIST_BASE_PATH}/**/*.*`], NPM_BASE_PATH));


gulp.task("build:doc",
    TASK_DOC_TYPESCRIPT([`${SRC_PATH}/*/src/**/!(*.spec).ts`], {
            externalPattern: `${DIST_PATH}/**/*.*`,
            excludeExternals: true,
            experimentalDecorators: true,
            ignoreCompilerErrors: true,
            includeDeclarations: true,
            module: "commonjs",
            name: "ng Dynamic Forms",
            out: "docs/",
            readme: "none",
            target: "es6",
            theme: "minimal"
        }
    ));


gulp.task("increment:version:major",
    TASK_INCREMENT_VERSION(pkg, ["./package.json", `${SRC_PATH}/**/package.json`], "MAJOR", SRC_PATH));

gulp.task("increment:version:minor",
    TASK_INCREMENT_VERSION(pkg, ["./package.json", `${SRC_PATH}/**/package.json`], "MINOR", SRC_PATH));

gulp.task("increment:version:patch",
    TASK_INCREMENT_VERSION(pkg, ["./package.json", `${SRC_PATH}/**/package.json`], "PATCH", SRC_PATH));