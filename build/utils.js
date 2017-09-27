const resolve = require("rollup-plugin-node-resolve");
const sourcemaps = require("rollup-plugin-sourcemaps");
const uglify = require("rollup-plugin-uglify");
const dateFormat = require("dateformat");
const license = require("fs").readFileSync("./LICENSE", "utf8");

const buildUtils = {

    hasMinifyFlag: argv => {
        return !!argv.includes("--minify");
    },

    getBanner: pkg => {

        return `/*!\n${pkg.name} ${pkg.version} ${dateFormat(Date.now(), "UTC:yyyy-mm-dd HH:MM")} UTC\n${license}\n*/`;
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

module.exports = buildUtils;
