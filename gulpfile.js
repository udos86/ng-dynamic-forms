const gulp        = require("gulp"),
      runSequence = require("run-sequence"),
      pkg         = require("./package.json");

const TASK_BUNDLE_ROLLUP        = require("./build/tasks/bundle-rollup-stream"),
      TASK_CLEAN                = require("./build/tasks/clean"),
      TASK_COPY                 = require("./build/tasks/copy"),
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
      PACKAGE_TASKS   = [],
      PACKAGES        = [
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

PACKAGES.forEach(packageName => {

    let taskName = `bundle:${packageName}`;

    gulp.task(taskName, TASK_BUNDLE_ROLLUP(DIST_PATH, packageName, "ng2DF", pkg, DIST_PATH));

    PACKAGE_TASKS.push(taskName);
});


gulp.task("increment:version:major",
    TASK_INCREMENT_VERSION(pkg, ["./package.json", `${SRC_PATH}/**/package.json`], "MAJOR", SRC_PATH));

gulp.task("increment:version:minor",
    TASK_INCREMENT_VERSION(pkg, ["./package.json", `${SRC_PATH}/**/package.json`], "MINOR", SRC_PATH));

gulp.task("increment:version:patch",
    TASK_INCREMENT_VERSION(pkg, ["./package.json", `${SRC_PATH}/**/package.json`], "PATCH", SRC_PATH));


gulp.task("lint:packages",
    TASK_LINT_TYPESCRIPT([`${SRC_PATH}/**/*.ts`], "./tslint.json"));


gulp.task("clean:dist",
    TASK_CLEAN([`${DIST_BASE_PATH}**/*`]));

gulp.task("clean:test",
    TASK_CLEAN([`${TEST_PATH}/**/*`]));

gulp.task("clean:dist:npm",
    TASK_CLEAN([`${NPM_PATH}**/*`]));


gulp.task("copy:packages:dist",
    TASK_COPY([`${SRC_PATH}/**/*.*`], DIST_PATH));

gulp.task("copy:packages:test",
    TASK_COPY([`${SRC_PATH}/**/*.{html,ts}`], TEST_PATH));

gulp.task("copy:dist:npm",
    TASK_COPY([`${DIST_BASE_PATH}/**/*.*`], NPM_BASE_PATH));


gulp.task("preprocess:packages:dist",
    TASK_PREPROCESS(`${DIST_PATH}/**/*.js`, DIST_PATH));

gulp.task("inline:ng2-templates:dist",
    TASK_INLINE_NG2_TEMPLATES([`${DIST_PATH}/**/*.js`], DIST_PATH));

gulp.task("remove:moduleId:dist",
    TASK_REMOVE_MODULE_ID([`${DIST_PATH}/**/*`], DIST_PATH));


gulp.task("transpile:packages:dist",
    TASK_TRANSPILE_TYPESCRIPT([`${DIST_PATH}/**/*.ts`], DIST_PATH, "./tsconfig.packages.json", "es2015"));

gulp.task("transpile:packages:debug",
    TASK_TRANSPILE_TYPESCRIPT([`${DIST_PATH}/**/*.ts`], DIST_PATH, "./tsconfig.packages.json", "commonjs"));

gulp.task("transpile:packages:test",
    TASK_TRANSPILE_TYPESCRIPT([`${TEST_PATH}/**/*.ts`], TEST_PATH, "./tsconfig.packages.json", "commonjs"));


gulp.task("build:packages:debug", function (done) {

    runSequence(
        "transpile:packages:debug",
        done
    );
});

gulp.task("build:packages:dist", function (done) {

    runSequence(
        "lint:packages",
        "clean:dist",
        "copy:packages:dist",
        "transpile:packages:dist",
        "preprocess:packages:dist",
        "inline:ng2-templates:dist",
        ...PACKAGE_TASKS,
        "remove:moduleId:dist",
        "copy:dist:npm",
        done
    );
});

gulp.task("build:packages:test", function (done) {

    runSequence(
        "clean:test",
        "copy:packages:test",
        "transpile:packages:test",
        done
    );
});


gulp.task("build:packages", function (done) {

    runSequence(
        "build:packages:dist",
        "copy:dist:npm",
        "build:packages:test",
        done
    );
});


gulp.task("doc:packages",
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


gulp.task("watch:packages", function () {
    gulp.watch([`${SRC_PATH}/**/*.*`], ["build:packages"]);
});