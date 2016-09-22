var gulp = require("gulp"),
    replace = require("gulp-replace");

module.exports = function (pkg, src, type, dest) {

    function replaceVersionString(match, $1, $2, $3) {

        var versionString;

        switch (type) {

            case "MAJOR":
                versionString = (Number($1) + 1) + "." + $2 + "." + $3;
                break;

            case "MINOR":
                versionString = $1 + "." + (Number($2) + 1) + "." + $3;
                break;

            case "PATCH":
                versionString = $1 + "." + $2 + "." + (Number($3) + 1);
                break;

            default:
                versionString = match;
                break;
        }
        return versionString;
    }

    return function () {

        var regExVersionString = /(\d).(\d).(\d)/,
            regExVersionField = /("version":\s)"\d.\d.\d"/,
            regExDependencyField = /("@ng2-dynamic-forms\/[a-z\-]+":\s)"\^\d.\d.\d"/g,
            newVersionString = pkg.version.replace(regExVersionString, replaceVersionString);

        return gulp.src(src, {base: dest})
                   .pipe(replace(regExVersionField, "$1" + '"' + newVersionString + '"'))
                   .pipe(replace(regExDependencyField, "$1" + '"^' + newVersionString + '"'))
                   .pipe(gulp.dest(dest));
    }
};