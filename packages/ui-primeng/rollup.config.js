const path  = require("path"),
      utils = require(path.join(__dirname, "../../build/utils")),
      pkg   = require(path.join(__dirname, "package.json"));

const format  = utils.getRollupFormat(process.argv),
      minify  = utils.hasMinifyFlag(process.argv),
      globals = {
          "@angular/core": "ng.core",
          "@angular/forms": "ng.forms",
          "@ng-dynamic-forms/core": "ngDF.core",
          "angular2-text-mask": "angular2-text-mask",
          "primeng/primeng": "primeng/primeng",
      };

export default {
    input: "./dist/@ng-dynamic-forms/ui-primeng/public_api.js",
    output: {
        file: `./dist/@ng-dynamic-forms/ui-primeng/bundles/ui-primeng.${format}.${minify ? "min." : ""}js`,
        format: format
    },
    banner: utils.getBanner(pkg),
    context: "this",
    exports: "named",
    external: Object.keys(globals),
    globals: globals,
    name: "ngDF.uiPrimeNG",
    plugins: utils.getRollupPlugins(minify),
    sourcemap: true
};
