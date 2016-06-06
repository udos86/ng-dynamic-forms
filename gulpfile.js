var package = require("./package.json");
var gulp = require("gulp");
var del = require("del");
var replace = require("gulp-replace");

gulp.task("clean:example", function () {
    
    return del([
        "example/node_modules/@ng2-dynamic-forms/**/*"
    ]);
});

gulp.task("copy:example", ["clean:example"], function () {

    return gulp.src([
            "modules/core/**/*",
            "modules/ui-basic/**/*",
            "modules/ui-bootstrap/**/*",
            "modules/ui-material/**/*"
        ],
        {base: "modules"})
        .pipe(gulp.dest("example/node_modules/@ng2-dynamic-forms/"));
});

gulp.task("update:version", function () {

    var versionField = /("version":\s)"\d\.\d\.\d-[a-z]+\.\d"/;

    return gulp.src(["**/package.json"], {base: "./modules"})
        .pipe(replace(versionField, "$1" + '"' + package.version + '"'))
        .pipe(gulp.dest("./modules"));
});

gulp.task("build:example", ["clean:example", "copy:example"]);

gulp.task("publish", ["update:version"]);