var pkg = require("./package.json"),
    fs = require("fs"),
    license = fs.readFileSync("./LICENSE", "utf-8"),
    gulp = require("gulp"),
    path = require("path"),
    rollup = require("rollup").rollup;

var TASK_CLEAN = require("./build/tasks/clean"),
    TASK_COPY = require("./build/tasks/copy"),
    TASK_INCREMENT_VERSION = require("./build/tasks/increment-version"),
    TASK_INLINE_NG2_TEMPLATES = require("./build/tasks/inline-ng2-templates"),
    TASK_LINT_TYPESCRIPT = require("./build/tasks/lint-typescript"),
    TASK_PREPROCESS = require("./build/tasks/preprocess"),
    TASK_TRANSPILE_TYPESCRIPT = require("./build/tasks/transpile-typescript");

var NPM_PATH = "./node_modules/@ng2-dynamic-forms/",
    DIST_PATH = "./@ng2-dynamic-forms/";


gulp.task("lint:modules", TASK_LINT_TYPESCRIPT(["./modules/**/*.ts"], "./tslint.json"));


gulp.task("clean:dist", ["lint:modules"], TASK_CLEAN([DIST_PATH + "**/*", "./node_modules/@ng2-dynamic-forms/**/*"]));


gulp.task("copy:modules:npm", ["clean:dist"], TASK_COPY(["./modules/**/!(*.spec).*"], "node_modules/@ng2-dynamic-forms"));


gulp.task("copy:modules:dist", ["clean:dist"], TASK_COPY(["./modules/**/*.*"], DIST_PATH));


gulp.task("transpile:modules:es6", ["copy:modules:npm", "copy:modules:dist"], TASK_TRANSPILE_TYPESCRIPT([DIST_PATH + "**/*.ts"], DIST_PATH, "./tsconfig.es6.json"));


gulp.task("preprocess:modules", ["transpile:modules:es6"], TASK_PREPROCESS(DIST_PATH + "**/*.js", DIST_PATH));


gulp.task("inline:ng2-templates", ["preprocess:modules"], TASK_INLINE_NG2_TEMPLATES([DIST_PATH + "**/*.js"], DIST_PATH));


gulp.task("bundle:modules", ["inline:ng2-templates"], function () {

    function camelCase(string) {
        return string.replace(/-(\w)/g, function (_, letter) {
            return letter.toUpperCase();
        });
    }

    var modules = [
            "core",
            "ui-basic",
            "ui-bootstrap",
            "ui-foundation",
            "ui-material",
            "ui-primeng"
        ],
        globals = {

            "@angular/core": "ng.core",
            "@angular/common": "ng.common",
            "@angular/forms": "ng.forms",
            "@angular/http": "ng.http",
            "@angular/platform-browser": "ng.platformBrowser",
            "@angular/platform-browser-dynamic": "ng.platformBrowserDynamic",

            "@angular2-material/checkbox": "md.checkbox",
            "@angular2-material/core": "md.core",
            "@angular2-material/input": "md.input",
            "@angular2-material/radio": "md.radio",

            "primeng/components/checkbox/checkbox": "primeng/components/checkbox/checkbox",
            "primeng/components/dropdown/dropdown": "primeng/components/dropdown/dropdown",
            "primeng/components/inputtext/inputtext": "primeng/components/inputtext/inputtext",
            "primeng/components/inputtextarea/inputtextarea": "primeng/components/inputtextarea/inputtextarea",
            "primeng/components/radiobutton/radiobutton": "primeng/components/radiobutton/radiobutton",
            "primeng/components/spinner/spinner": "primeng/components/spinner/spinner"
        };

    modules.forEach(name => {
        globals[`@ng2-dynamic-forms/${name}`] = `ng2DF.${camelCase(name)}`;
    });

    return modules.reduce((previous, name) => {

        return previous.then(() => {

            return rollup({

                context: "window",
                entry: path.join(DIST_PATH, name, "index.js"),
                external: [...Object.keys(globals)]

            }).then(bundle => {

                var result = bundle.generate({

                    banner: `/* ${license} */`,
                    format: "umd",
                    globals: globals,
                    moduleName: `ng2DF.${camelCase(name)}`
                });

                fs.writeFileSync(path.join(DIST_PATH, name, `${name}.umd.js`), result.code);
            });
        });
    }, Promise.resolve());
});


gulp.task("transpile:modules:es5", ["bundle:modules"], TASK_TRANSPILE_TYPESCRIPT([DIST_PATH + "**/*.ts"], DIST_PATH, "./tsconfig.es5.json"));


gulp.task("prime:modules", ["transpile:modules:es5"], TASK_COPY([DIST_PATH + "**/*"], "node_modules/@ng2-dynamic-forms"));


gulp.task("increment:version", TASK_INCREMENT_VERSION(pkg, ["./package.json", "./modules/**/package.json"], "./modules"));


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