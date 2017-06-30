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

const SRC_PATH       = "./modules",
      DIST_BASE_PATH = "./dist",
      DIST_PATH      = `${DIST_BASE_PATH}/@ng2-dynamic-forms`,
      NPM_PATH       = "./node_modules",
      TEST_PATH      = "./test",
      MODULE_TASKS   = [],
      MODULES        = [
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

MODULES.forEach(moduleName => {

    let taskName = `bundle:${moduleName}`;

    gulp.task(taskName, TASK_BUNDLE_ROLLUP(DIST_PATH, moduleName, "ng2DF", pkg, DIST_PATH));

    MODULE_TASKS.push(taskName);
});


gulp.task("increment:version:major",
    TASK_INCREMENT_VERSION(pkg, ["./package.json", `${SRC_PATH}/**/package.json`], "MAJOR", SRC_PATH));

gulp.task("increment:version:minor",
    TASK_INCREMENT_VERSION(pkg, ["./package.json", `${SRC_PATH}/**/package.json`], "MINOR", SRC_PATH));

gulp.task("increment:version:patch",
    TASK_INCREMENT_VERSION(pkg, ["./package.json", `${SRC_PATH}/**/package.json`], "PATCH", SRC_PATH));


gulp.task("lint:modules",
    TASK_LINT_TYPESCRIPT([`${SRC_PATH}/**/*.ts`], "./tslint.json"));


gulp.task("clean:dist",
    TASK_CLEAN([`${DIST_PATH}**/*`]));

gulp.task("clean:test",
    TASK_CLEAN([`${TEST_PATH}/**/*`]));


gulp.task("copy:modules:dist",
    TASK_COPY([`${SRC_PATH}/**/*.*`], DIST_PATH));

gulp.task("copy:modules:test",
    TASK_COPY([`${SRC_PATH}/**/*.{html,ts}`], TEST_PATH));

gulp.task("copy:dist:npm",
    TASK_COPY([`${DIST_BASE_PATH}/**/*.*`], NPM_PATH));


gulp.task("preprocess:modules:dist",
    TASK_PREPROCESS(`${DIST_PATH}/**/*.js`, DIST_PATH));

gulp.task("inline:ng2-templates:dist",
    TASK_INLINE_NG2_TEMPLATES([`${DIST_PATH}/**/*.js`], DIST_PATH));

gulp.task("remove:moduleId:dist",
    TASK_REMOVE_MODULE_ID([`${DIST_PATH}/**/*`], DIST_PATH));


gulp.task("transpile:modules:dist",
    TASK_TRANSPILE_TYPESCRIPT([`${DIST_PATH}/**/*.ts`], DIST_PATH, "./tsconfig.modules.json", "es2015"));

gulp.task("transpile:modules:debug",
    TASK_TRANSPILE_TYPESCRIPT([`${DIST_PATH}/**/*.ts`], DIST_PATH, "./tsconfig.modules.json", "commonjs"));

gulp.task("transpile:modules:test",
    TASK_TRANSPILE_TYPESCRIPT([`${TEST_PATH}/**/*.ts`], TEST_PATH, "./tsconfig.modules.json", "commonjs"));


gulp.task("build:modules:debug", function (done) {

    runSequence(
        "transpile:modules:debug",
        done
    );
});

gulp.task("build:modules:dist", function (done) {

    runSequence(
        "lint:modules",
        "clean:dist",
        "copy:modules:dist",
        "transpile:modules:dist",
        "preprocess:modules:dist",
        "inline:ng2-templates:dist",
        ...MODULE_TASKS,
        "remove:moduleId:dist",
        done
    );
});

gulp.task("build:modules:test", function (done) {

    runSequence(
        "clean:test",
        "copy:modules:test",
        "transpile:modules:test",
        done
    );
});


gulp.task("build:modules", function (done) {

    runSequence(
        "build:modules:dist",
        "build:modules:test",
        "copy:dist:npm",
        done
    );
});


gulp.task("doc:modules",
    TASK_DOC_TYPESCRIPT([`${SRC_PATH}/*/src/**/!(*.spec).ts`], {
            externalPattern: `${DIST_PATH}/**/*.*`,
            excludeExternals: true,
            experimentalDecorators: true,
            ignoreCompilerErrors: true,
            includeDeclarations: true,
            module: "commonjs",
            name: "ng2 Dynamic Forms",
            out: "docs/",
            readme: "none",
            target: "es6",
            theme: "minimal"
        }
    ));


gulp.task("watch:modules", function () {
    gulp.watch([`${SRC_PATH}/**/*.*`], ["build:modules"]);
});