import rollup from "rollup";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import uglify from "rollup-plugin-uglify";

export default {

    entry: "example/app/main.aot.js",

    dest: "example/dist/bundle.js", // output a single application bundle

    sourceMap: false,

    format: "iife",

    onwarn: function (warning) {},

    plugins: [
        nodeResolve({
            jsnext: true,
            module: true
        }),
        commonjs({
            include: "node_modules/rxjs/**",
        }),
        uglify()
    ]
}
