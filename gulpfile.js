var gulp = require("gulp"),
    pkg = require("./package.json");

var TASK_BUNDLE_ROLLUP = require("./build/tasks/bundle-rollup"),
    TASK_CLEAN = require("./build/tasks/clean"),
    TASK_COPY = require("./build/tasks/copy"),
    TASK_INCREMENT_VERSION = require("./build/tasks/increment-version"),
    TASK_INLINE_NG2_TEMPLATES = require("./build/tasks/inline-ng2-templates"),
    TASK_LINT_TYPESCRIPT = require("./build/tasks/lint-typescript"),
    TASK_PREPROCESS = require("./build/tasks/preprocess"),
    TASK_TRANSPILE_TYPESCRIPT = require("./build/tasks/transpile-typescript");

var SRC_PATH = "./modules",
    NPM_PATH = "./node_modules/@ng2-dynamic-forms",
    DIST_PATH = "./@ng2-dynamic-forms",
    MODULES = [
        "core",
        "ui-basic",
        "ui-bootstrap",
        "ui-foundation",
        "ui-material",
        "ui-primeng"
    ];


gulp.task("lint:modules",
    TASK_LINT_TYPESCRIPT([`${SRC_PATH}/**/*.ts`], "./tslint.json"));


gulp.task("clean:dist", ["lint:modules"],
    TASK_CLEAN([`${DIST_PATH}**/*`, `${NPM_PATH}/**/*`]));


gulp.task("copy:modules:npm", ["clean:dist"],
    TASK_COPY([`${SRC_PATH}/**/!(*.spec).*`], NPM_PATH));


gulp.task("copy:modules:dist", ["clean:dist"],
    TASK_COPY([`${SRC_PATH}/**/*.*`], DIST_PATH));


gulp.task("transpile:modules:es6", ["copy:modules:npm", "copy:modules:dist"],
    TASK_TRANSPILE_TYPESCRIPT([`${DIST_PATH}/**/*.ts`], DIST_PATH, "./tsconfig.es6.json"));


gulp.task("preprocess:modules", ["transpile:modules:es6"],
    TASK_PREPROCESS(`${DIST_PATH}/**/*.js`, DIST_PATH));


gulp.task("inline:ng2-templates", ["preprocess:modules"],
    TASK_INLINE_NG2_TEMPLATES([`${DIST_PATH}/**/*.js`], DIST_PATH));


gulp.task("bundle:modules", ["inline:ng2-templates"],
    TASK_BUNDLE_ROLLUP(MODULES, DIST_PATH, "@ng2-dynamic-forms", "ng2DF", pkg, DIST_PATH));


gulp.task("transpile:modules:es5", ["bundle:modules"],
    TASK_TRANSPILE_TYPESCRIPT([`${DIST_PATH}/**/*.ts`], DIST_PATH, "./tsconfig.es5.json"));


gulp.task("prime:modules", ["transpile:modules:es5"],
    TASK_COPY([`${DIST_PATH}/**/*`], NPM_PATH));


gulp.task("increment:version",
    TASK_INCREMENT_VERSION(pkg, ["./package.json", `${SRC_PATH}/**/package.json`]));


gulp.task("build:modules", [
    "lint:modules",
    "clean:dist",
    "copy:modules:npm",
    "copy:modules:dist",
    "transpile:modules:es6",
    "preprocess:modules",
    "inline:ng2-templates",
    "bundle:modules",
    "transpile:modules:es5",
    "prime:modules"
]);