import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
//import uglify from "rollup-plugin-uglify"

export default {

    input: "./aot/app/main.aot.js",

    output: {

        file: "./dist/bundle.aot.js",

        format: "iife"
    },

    context: "this",

    sourcemap: false,

    sourcemapFile: "./dist/bundle.aot.js.map",

    onwarn: function (warning) {

        if (warning.code === "THIS_IS_UNDEFINED" || warning.code === "MISSING_EXPORT") {

        }
    },

    plugins: [

        nodeResolve({

            jsnext: true,
            module: true
        }),

        commonjs({

            include: [
                "../node_modules/angular2-text-mask/**/*",
                "../node_modules/primeng/**/*",
                "../node_modules/rxjs/**",
                "../node_modules/text-mask-core/**/*"
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
                    "InputMask",
                    "InputMaskModule",
                    "InputSwitch",
                    "InputSwitchModule",
                    "InputTextModule",
                    "InputTextareaModule",
                    "MultiSelect",
                    "MultiSelectModule",
                    "RadioButtonModule",
                    "RatingModule",
                    "Slider",
                    "SliderModule",
                    "SpinnerModule"
                ]
            }
        })

        //uglify()
    ]
}