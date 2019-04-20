const gulp    = require("gulp"),
      replace = require("gulp-replace"),
      util    = require("gulp-util"),
      pkg     = require("./package.json");


const LIB_BASE_PATH  = "./projects/ng-dynamic-forms",
      VERSION_NUMBER = {MAJOR: "MAJOR", MINOR: "MINOR", PATCH: "PATCH"},
      VERSION_SRC    = ["./package.json", "./package-lock.json", `${LIB_BASE_PATH}/**/package.json`];

function incrementVersion(pkg, src, versionNumber, dest) {

    function replaceVersionString(match, $1, $2, $3) {

        switch (versionNumber) {

            case VERSION_NUMBER.MAJOR:
                return (Number($1) + 1) + ".0.0";

            case VERSION_NUMBER.MINOR:
                return $1 + "." + (Number($2) + 1) + ".0";

            case VERSION_NUMBER.PATCH:
                return $1 + "." + $2 + "." + (Number($3) + 1);

            default:
                return match;
        }
    }

    return () => {

        const regExVersionString   = /(\d+).(\d+).(\d+)/,
              regExVersionField    = /("version":\s)"\d+.\d+.\d+"/,
              regExDependencyField = /("@ng-dynamic-forms\/[a-z\-]+":\s)"\^\d+.\d+.\d+"/g,
              newVersionString     = pkg.version.replace(regExVersionString, replaceVersionString);

        util.log(`Incrementing version to ${util.colors.magenta(newVersionString)}`);

        return gulp.src(src, {base: dest})
                   .pipe(replace(regExVersionField, "$1" + '"' + newVersionString + '"'))
                   .pipe(replace(regExDependencyField, "$1" + '"^' + newVersionString + '"'))
                   .pipe(gulp.dest(dest));
    }
}

gulp.task("version:major", incrementVersion(pkg, VERSION_SRC, VERSION_NUMBER.MAJOR, LIB_BASE_PATH));
gulp.task("version:minor", incrementVersion(pkg, VERSION_SRC, VERSION_NUMBER.MINOR, LIB_BASE_PATH));
gulp.task("version:patch", incrementVersion(pkg, VERSION_SRC, VERSION_NUMBER.PATCH, LIB_BASE_PATH));
