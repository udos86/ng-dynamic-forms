var pkg = require("./package.json");
var gulp = require("gulp");
var del = require("del");
var replace = require("gulp-replace");
var typedoc = require('gulp-typedoc');

gulp.task("clean:example", function () {

    return del([
        "node_modules/@ng2-dynamic-forms/**/*",
        "example/node_modules/@ng2-dynamic-forms/**/*"
    ]);
});

gulp.task("copy:example", ["clean:example"], function () {

    return gulp.src([
            "modules/core/**/*",
            "modules/ui-basic/**/*",
            "modules/ui-bootstrap/**/*",
            "modules/ui-foundation/**/*",
            "modules/ui-material/**/*",
            "!modules/**/*.spec.*"
        ],
        {base: "modules"})
        .pipe(gulp.dest("node_modules/@ng2-dynamic-forms/"))
        .pipe(gulp.dest("example/node_modules/@ng2-dynamic-forms/"));
});

gulp.task("update:example", ["clean:example", "copy:example"]);


gulp.task("build:documentation", function () {

    return gulp.src(["./modules/*/src/**/*.ts"], {read: false})
        .pipe(typedoc({
            exclude: "./modules/**/*.spec.ts",
            module: "commonjs",
            target: "es5",
            out: "docs/",
            name: "ng2 Dynamic Forms",
            includeDeclarations: true,
            ignoreCompilerErrors: true
        }));
});

gulp.task("increment:version", function () {

    var versionNumber = Number(pkg.version.substr(pkg.version.length - 1)),
        versionString = /(\d\.\d\.\d-[a-z]+\.)\d/,
        newVersionString = pkg.version.replace(versionString, "$1" + (versionNumber + 1)),
        versionField = /("version":\s)"\d\.\d\.\d-[a-z]+\.\d"/,
        dependencyField = /("@ng2-dynamic-forms\/[a-z\-]+":\s)"\d\.\d\.\d-[a-z]+\.\d"/g;

    return gulp.src([
            "./package.json",
            "example/package.json",
            "modules/**/package.json"
        ],
        {base: "./modules"})
        .pipe(replace(versionField, "$1" + '"' + newVersionString + '"'))
        .pipe(replace(dependencyField, "$1" + '"' + newVersionString + '"'))
        .pipe(gulp.dest("./modules"));
});

gulp.task("publish", ["increment:version"]);