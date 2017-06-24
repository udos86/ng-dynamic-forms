import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
//import uglify from "rollup-plugin-uglify"

export default {

    entry: "./example/app/main.aot.js",
    dest: "./example/dist/bundle.aot.js",
    format: "iife",
    sourceMap: false,
    sourceMapFile: "./example/dist/bundle.aot.js.map",
    onwarn: function (warning) {
        // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
        if (warning.code === "THIS_IS_UNDEFINED" || warning.code === "MISSING_EXPORT") {
            return;
        }

        console.error(warning);
    },
    plugins: [

        nodeResolve(
            {
                jsnext: true,
                module: true
            }
        ),

        commonjs(
            {
                include: [
                    "node_modules/angular2-text-mask/**/*",
                    "node_modules/primeng/**/*",
                    "node_modules/rxjs/**"
                ],
                namedExports: {
                    "node_modules/primeng/primeng.js": [
                        "AutoComplete",
                        "AutoCompleteModule",
                        "Calendar",
                        "CalendarModule",
                        "Checkbox",
                        "CheckboxModule",
                        "Chips",
                        "ChipsModule",
                        "Dropdown",
                        "DropdownModule",
                        "Editor",
                        "EditorModule",
                        "InputSwitch",
                        "InputSwitchModule",
                        "InputTextModule",
                        "InputTextareaModule",
                        "MultiSelect",
                        "MultiSelectModule",
                        "RadioButtonModule",
                        "Slider",
                        "SliderModule",
                        "SpinnerModule"
                    ]
                }
            }
        ),

        //uglify()
    ]
}