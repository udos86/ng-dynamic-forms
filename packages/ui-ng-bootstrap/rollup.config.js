const path        = require("path"),
      utils       = require(path.join(__dirname, "../../build/utils")),
      packageJson = require(path.join(__dirname, "package.json"));

const format  = utils.getRollupFormat(process.argv),
      globals = utils.getRollupGlobals(),
      target  = utils.getTarget(process.argv),
      minify  = utils.hasMinifyFlag(process.argv);

export default {

    input: utils.getRollupInputPath(packageJson, target),
    output: {
        file: utils.getRollupOutputPath(packageJson, format, target, minify),
        format: format,
        name: "ngDF.ngBootstrapUI",
        globals: globals,
        sourcemap: true,
        exports: "named",
        banner: utils.getBanner(packageJson)
    },
    context: "this",
    external: Object.keys(globals),
    plugins: utils.getRollupPlugins(minify)
};
