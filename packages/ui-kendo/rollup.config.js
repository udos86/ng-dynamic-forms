const path        = require("path"),
      utils       = require(path.join(__dirname, "../../build/utils")),
      packageJson = require(path.join(__dirname, "package.json"));

const format  = utils.getRollupFormat(process.argv),
      minify  = utils.hasMinifyFlag(process.argv),
      globals = {
          "@angular/core": "ng.core",
          "@angular/forms": "ng.forms",
          "@ng-dynamic-forms/core": "ngDF.core",
          "@progress/kendo-angular-dateinputs": "progress/kendo-angular-dateinputs",
          "@progress/kendo-angular-dropdowns": "progress/kendo-angular-dropdowns",
          "@progress/kendo-angular-inputs": "progress/kendo-angular-inputs",
          "@progress/kendo-angular-upload": "progress/kendo-angular-upload",
          "angular2-text-mask": "angular2-text-mask"
      };

export default {

    input: utils.getRollupInputPath(packageJson),
    output: {file: utils.getRollupOutputPath(packageJson, format, minify), format: format},
    banner: utils.getBanner(packageJson),
    context: "this",
    exports: "named",
    external: Object.keys(globals),
    globals: globals,
    name: "ngDF.kendoUI",
    plugins: utils.getRollupPlugins(minify),
    sourcemap: true
};
