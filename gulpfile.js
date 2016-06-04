var gulp = require("gulp");
var del = require("del");

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


gulp.task("build:example", ["clean:example", "copy:example"]);