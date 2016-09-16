var pkg = require("./package.json"),
    gulp = require("gulp"),
    deleteLines = require("gulp-delete-lines"),
    preprocess = require("gulp-preprocess");

var TASK_LINT_TYPESCRIPT = require("./build/tasks/lint-ts"),
    TASK_CLEAN = require("./build/tasks/clean"),
    TASK_INLINE_NG2_TEMPLATES = require("./build/tasks/inline-ng2-templates"),
    TASK_BUNDLE_WEBPACK = require("./build/tasks/bundle-webpack"),
    TASK_BUNDLE_SYSTEM_JS = require("./build/tasks/bundle-systemjs"),
    TASK_DOC_API = require("./build/tasks/doc-api"),
    TASK_INCREMENT_VERSION = require("./build/tasks/increment-version");

var DIST_PATH = "./@ng2-dynamic-forms/";

gulp.task("lint:modules", TASK_LINT_TYPESCRIPT(["./modules/**/*.ts"], "./tslint.json"));

gulp.task("clean:modules", TASK_CLEAN([DIST_PATH + "**/*", "./node_modules/@ng2-dynamic-forms/**/*"]));

gulp.task("prepare:modules", ["lint:modules", "clean:modules"], function () {

    return gulp.src([
            "./modules/**/*.json",
            "./modules/**/*.html",
            "./modules/**/*.css",
            "./modules/**/*.js",
            "./modules/**/*.js.map",
            "./modules/**/*.ts",
            "!./modules/**/*.spec.*"
        ],
        {base: "modules"})
               .pipe(gulp.dest("./node_modules/@ng2-dynamic-forms/"))
               .pipe(preprocess())
               .pipe(gulp.dest(DIST_PATH));
});

gulp.task("inline:ng2-templates", ["prepare:modules"], TASK_INLINE_NG2_TEMPLATES([DIST_PATH + "**/*.js"], DIST_PATH));

gulp.task("bundle:modules:webpack:dev", ["inline:ng2-templates"], TASK_BUNDLE_WEBPACK(require("./webpack.config")));

gulp.task("bundle:modules:webpack:prod", ["inline:ng2-templates"], TASK_BUNDLE_WEBPACK(require("./webpack.min.config")));

gulp.task("bundle:modules:systemjs", ["inline:ng2-templates"], TASK_BUNDLE_SYSTEM_JS());

gulp.task("prime:modules", ["bundle:modules:webpack:dev", "bundle:modules:webpack:prod"], function () {

    return gulp.src([DIST_PATH + "**/*.umd.js", DIST_PATH + "**/*.umd.min.js",], {base: "@ng2-dynamic-forms"})
               .pipe(deleteLines({'filters': [/# sourceMappingURL=/]}))
               .pipe(gulp.dest("./node_modules/@ng2-dynamic-forms/"))
               .pipe(gulp.dest(DIST_PATH));
});

gulp.task("build:documentation", TASK_DOC_API(["./modules/*/src/**/*.ts"],
    {
        exclude: "./modules/**/*.spec.ts",
        module: "commonjs",
        target: "es5",
        out: "./docs/",
        name: "ng2 Dynamic Forms",
        includeDeclarations: true,
        ignoreCompilerErrors: true
    }
));

gulp.task("increment:version", TASK_INCREMENT_VERSION(pkg, ["./package.json", "./modules/**/package.json"], "./modules"));

gulp.task("build:modules", [
    "lint:modules",
    "clean:modules",
    "prepare:modules",
    "inline:ng2-templates",
    "bundle:modules:webpack:dev",
    "bundle:modules:webpack:prod",
    "prime:modules"
]);