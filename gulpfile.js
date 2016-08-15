var pkg = require("./package.json");
var gulp = require("gulp");
var del = require("del");
var htmlMinifier = require("html-minifier");
var inlineTemplate = require("gulp-inline-ng2-template");
var preprocess = require("gulp-preprocess");
var replace = require("gulp-replace");
var tslint = require("gulp-tslint");
var typedoc = require("gulp-typedoc");

var DIST_PATH = "./@ng2-dynamic-forms/";

gulp.task("clean:modules", function () {

    return del([
        DIST_PATH + "**/*",
        "./node_modules/@ng2-dynamic-forms/**/*",
        "./example/node_modules/@ng2-dynamic-forms/**/*"
    ]);
});


gulp.task("lint:modules", function () {

    return gulp.src(["./modules/**/*.ts"], {base: "modules"})
        .pipe(tslint({configuration: "./tslint.json"}))
        .pipe(tslint.report());
});


gulp.task("preprocess:modules", ["clean:modules", "lint:modules"], function () {

    return gulp.src([
            "./modules/**/*.json",
            "./modules/**/*.html",
            "./modules/**/*.css",
            "./modules/**/*.js",
            "./modules/**/*.js.map",
            "./modules/**/*.d.ts",
            "!./modules/**/*.spec.*"
        ],
        {base: "modules"})
        .pipe(gulp.dest("./node_modules/@ng2-dynamic-forms/"))
        .pipe(gulp.dest("./example/node_modules/@ng2-dynamic-forms/"))
        .pipe(preprocess())
        .pipe(gulp.dest(DIST_PATH));
});


gulp.task("inline:templates", ["preprocess:modules"], function () {

    function minify(path, ext, file, callback) {
        try {
            var minifiedFile = htmlMinifier.minify(file, {
                collapseWhitespace: true,
                caseSensitive: true,
                removeComments: true,
                removeRedundantAttributes: true
            });

            callback(null, minifiedFile);
        }
        catch (err) {
            callback(err);
        }
    }

    return gulp.src([DIST_PATH + "**/*.js"], {base: DIST_PATH})
        .pipe(inlineTemplate({
            base: DIST_PATH,
            removeLineBreaks: true,
            target: "es5",
            templateProcessor: minify,
            useRelativePaths: true
        }))
        .pipe(gulp.dest(DIST_PATH));
});


gulp.task("build:documentation", function () {

    return gulp.src([
            "./modules/*/src/**/*.ts"
        ],
        {read: false})
        .pipe(typedoc({
            exclude: "./modules/**/*.spec.ts",
            module: "commonjs",
            target: "es5",
            out: "./docs/",
            name: "ng2 Dynamic Forms",
            includeDeclarations: true,
            ignoreCompilerErrors: true
        }));
});


gulp.task("increment:version", function () {

    var versionNumber = Number(pkg.version.substr(pkg.version.length - 1)),
        versionString = /(\d\.\d\.\d-[a-z]+\.)\d/,
        newVersionNumber = versionNumber + 1,
        newVersionString = pkg.version.replace(versionString, "$1" + newVersionNumber),
        versionField = /("version":\s)"\d\.\d\.\d-[a-z]+\.\d"/,
        dependencyField = /("@ng2-dynamic-forms\/[a-z\-]+":\s)"\^\d\.\d\.\d-[a-z]+\.\d"/g;

    return gulp.src([
            "./package.json",
            "./example/package.json",
            "./modules/**/package.json"
        ],
        {base: "./modules"})
        .pipe(replace(versionField, "$1" + '"' + newVersionString + '"'))
        .pipe(replace(dependencyField, "$1" + '"^' + newVersionString + '"'))
        .pipe(gulp.dest("./modules"));
});


gulp.task("build:modules", ["clean:modules", "lint:modules", "preprocess:modules", "inline:templates"]);