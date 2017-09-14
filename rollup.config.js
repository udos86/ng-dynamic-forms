import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import includePaths from "rollup-plugin-includepaths";
//import uglify from "rollup-plugin-uglify"

export default {

    entry: "./sample/app/main.aot.js",
    dest: "./sample/dist/bundle.aot.js",
    format: "iife",
    sourceMap: false,
    sourceMapFile: "./sample/dist/bundle.aot.js.map",
    onwarn: function (warning) {
        // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
        if (warning.code === "THIS_IS_UNDEFINED" || warning.code === "MISSING_EXPORT") {
            return;
        }

        console.error(warning);
    },
    plugins: [

        includePaths({

            include: {
                "@ng-dynamic-forms/core": "dist/@ng-dynamic-forms/core/public_api.js",
                "@ng-dynamic-forms/ui-basic": "dist/@ng-dynamic-forms/ui-basic/public_api.js",
                "@ng-dynamic-forms/ui-bootstrap": "dist/@ng-dynamic-forms/ui-bootstrap/public_api.js",
                "@ng-dynamic-forms/ui-foundation": "dist/@ng-dynamic-forms/ui-foundation/public_api.js",
                "@ng-dynamic-forms/ui-ionic": "dist/@ng-dynamic-forms/ui-ionic/public_api.js",
                "@ng-dynamic-forms/ui-kendo": "dist/@ng-dynamic-forms/ui-kendo/public_api.js",
                "@ng-dynamic-forms/ui-material": "dist/@ng-dynamic-forms/ui-material/public_api.js",
                "@ng-dynamic-forms/ui-ng-bootstrap": "dist/@ng-dynamic-forms/ui-ng-bootstrap/public_api.js",
                "@ng-dynamic-forms/ui-primeng": "dist/@ng-dynamic-forms/ui-primeng/public_api.js"
            }
        }),

        nodeResolve({

            jsnext: true,
            module: true
        }),

        commonjs({

            include: [
                "node_modules/angular2-text-mask/**/*",
                "node_modules/primeng/**/*",
                "node_modules/rxjs/**",
                "node_modules/text-mask-core/**/*"
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