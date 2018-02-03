const gulp              = require("gulp"),
      deleteLines       = require("gulp-delete-lines"),
      htmlMinifier      = require("html-minifier"),
      inlineNg2Template = require("gulp-inline-ng2-template");

module.exports = src => () => {

    function minify(path, ext, file, callback) {

        try {

            let minifiedFile = htmlMinifier.minify(file, {
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

    return gulp.src(src)
               .pipe(deleteLines({
                   "filters": [/moduleId: module.id/]
               }))
               .pipe(inlineNg2Template({
                   removeLineBreaks: true,
                   removeModuleId: true,
                   target: "es5",
                   templateProcessor: minify,
                   useRelativePaths: true
               }))
               .pipe(gulp.dest(file => file.base));

};