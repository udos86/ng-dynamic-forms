const resolve    = require("rollup-plugin-node-resolve"),
      sourcemaps = require("rollup-plugin-sourcemaps"),
      uglify     = require("rollup-plugin-uglify"),
      dateFormat = require("dateformat"),
      license    = require("fs").readFileSync("./LICENSE", "utf8");

const utils = {

    hasMinifyFlag: argv => {
        return !!argv.includes("--minify");
    },

    getBanner: packageJson => {
        return `/*!\n${packageJson.name} ${packageJson.version} ${dateFormat(Date.now(), "UTC:yyyy-mm-dd HH:MM")} UTC\n${license}\n*/`;
    },

    getRollupInputPath: packageJson => {
        return `./dist/${packageJson.name}/public_api.js`;
    },

    getRollupOutputPath: (packageJson, format, minify) => {

        let pkgNameSplit  = packageJson.name.split("/"),
            bundleFolder  = format === "umd" ? "bundles" : "@ng-dynamic-forms",
            fileExtension = minify ? "min." : "";

        return `./dist/${packageJson.name}/${bundleFolder}/${pkgNameSplit[pkgNameSplit.length - 1]}.${format}.${fileExtension}js`;
    },

    getRollupPlugins: minify => {

        const plugins = [resolve(), sourcemaps()];

        if (minify) {
            plugins.push(uglify({output: {comments: (node, comment) => comment.value.startsWith("!")}}));
        }

        return plugins;
    },

    getRollupFormat: argv => {
        return argv[argv.indexOf("-f") + 1];
    }
};

module.exports = utils;
