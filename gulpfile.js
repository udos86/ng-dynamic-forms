let gulp = require("gulp"),
    runSequence = require("run-sequence"),
    pkg = require("./package.json");

let TASK_BUNDLE_ROLLUP = require("./build/tasks/bundle-rollup"),
    TASK_CLEAN = require("./build/tasks/clean"),
    TASK_COPY = require("./build/tasks/copy"),
    TASK_INCREMENT_VERSION = require("./build/tasks/increment-version"),
    TASK_INLINE_NG2_TEMPLATES = require("./build/tasks/inline-ng2-templates"),
    TASK_LINT_TYPESCRIPT = require("./build/tasks/lint-typescript"),
    TASK_PREPROCESS = require("./build/tasks/preprocess"),
    TASK_TRANSPILE_TYPESCRIPT = require("./build/tasks/transpile-typescript"),
    TASK_DOC_TYPESCRIPT = require("./build/tasks/doc-typescript");

let SRC_PATH = "./modules",
    NPM_PATH = "./node_modules/@ng2-dynamic-forms",
    DIST_PATH = "./@ng2-dynamic-forms",
    MODULES = [
        "core",
        "ui-basic",
        "ui-bootstrap",
        "ui-foundation",
        "ui-kendo",
        "ui-material",
        "ui-primeng",
        "ui-semantic"
    ];


gulp.task("increment:version:major",
    TASK_INCREMENT_VERSION(pkg, ["./package.json", `${SRC_PATH}/**/package.json`], "MAJOR", SRC_PATH));


gulp.task("increment:version:minor",
    TASK_INCREMENT_VERSION(pkg, ["./package.json", `${SRC_PATH}/**/package.json`], "MINOR", SRC_PATH));


gulp.task("increment:version:patch",
    TASK_INCREMENT_VERSION(pkg, ["./package.json", `${SRC_PATH}/**/package.json`], "PATCH", SRC_PATH));


gulp.task("lint:modules",
    TASK_LINT_TYPESCRIPT([`${SRC_PATH}/**/*.ts`], "./tslint.json"));


gulp.task("clean:dist",
    TASK_CLEAN([`${DIST_PATH}**/*`, `${NPM_PATH}/**/*`]));


gulp.task("copy:modules:npm",
    TASK_COPY([`${SRC_PATH}/**/!(*.spec).*`], NPM_PATH));


gulp.task("copy:modules:dist",
    TASK_COPY([`${SRC_PATH}/**/*.*`], DIST_PATH));


gulp.task("transpile:modules:es6",
    TASK_TRANSPILE_TYPESCRIPT([`${DIST_PATH}/**/*.ts`], DIST_PATH, "./tsconfig.es6.json"));


gulp.task("preprocess:modules",
    TASK_PREPROCESS(`${DIST_PATH}/**/*.js`, DIST_PATH));


gulp.task("inline:ng2-templates",
    TASK_INLINE_NG2_TEMPLATES([`${DIST_PATH}/**/*.js`], DIST_PATH));

/*
gulp.task("bundle:modules",
    TASK_BUNDLE_ROLLUP(MODULES, DIST_PATH, "@ng2-dynamic-forms", "ng2DF", pkg, DIST_PATH));
*/

gulp.task("bundle:core",
    TASK_BUNDLE_ROLLUP(DIST_PATH, "core", "ng2DF", pkg, DIST_PATH));

gulp.task("bundle:ui-basic",
    TASK_BUNDLE_ROLLUP(DIST_PATH, "ui-basic", "ng2DF", pkg, DIST_PATH));

gulp.task("bundle:ui-bootstrap",
    TASK_BUNDLE_ROLLUP(DIST_PATH, "ui-bootstrap", "ng2DF", pkg, DIST_PATH));

gulp.task("bundle:ui-foundation",
    TASK_BUNDLE_ROLLUP(DIST_PATH, "ui-foundation", "ng2DF", pkg, DIST_PATH));

gulp.task("bundle:ui-kendo",
    TASK_BUNDLE_ROLLUP(DIST_PATH, "ui-kendo", "ng2DF", pkg, DIST_PATH));

gulp.task("bundle:ui-material",
    TASK_BUNDLE_ROLLUP(DIST_PATH, "ui-material", "ng2DF", pkg, DIST_PATH));

gulp.task("bundle:ui-primeng",
    TASK_BUNDLE_ROLLUP(DIST_PATH, "ui-primeng", "ng2DF", pkg, DIST_PATH));

gulp.task("bundle:ui-semantic",
    TASK_BUNDLE_ROLLUP(DIST_PATH, "ui-semantic", "ng2DF", pkg, DIST_PATH));


gulp.task("transpile:modules:es5",
    TASK_TRANSPILE_TYPESCRIPT([`${DIST_PATH}/**/*.ts`], DIST_PATH, "./tsconfig.es5.json"));


gulp.task("prime:modules",
    TASK_COPY([`${DIST_PATH}/**/*`], NPM_PATH));

gulp.task("doc:modules",
    TASK_DOC_TYPESCRIPT([`${SRC_PATH}/*/src/**/!(*.spec).ts`], {
            externalPattern: `${NPM_PATH}/**/*.*`,
            excludeExternals: true,
            experimentalDecorators: true,
            ignoreCompilerErrors: true,
            includeDeclarations: true,
            module: "commonjs",
            name: "ng2 Dynamic Forms",
            out: "docs/",
            readme: "none",
            target: "es5",
            theme: "minimal"
        }
    ));

gulp.task("build:modules", function (done) {

    runSequence(
        "lint:modules",
        "clean:dist",
        "copy:modules:npm",
        "copy:modules:dist",
        "transpile:modules:es6",
        "preprocess:modules",
        "inline:ng2-templates",
        "bundle:core",
        "bundle:ui-basic",
        "bundle:ui-bootstrap",
        "bundle:ui-foundation",
        "bundle:ui-kendo",
        "bundle:ui-material",
        "bundle:ui-primeng",
        "bundle:ui-semantic",
        "transpile:modules:es5",
        "preprocess:modules",
        "inline:ng2-templates",
        "prime:modules",
        done
    );
});

gulp.task("watch:modules", function () {
    gulp.watch([`${SRC_PATH}/**/*.*`], ["build:modules"]);
});