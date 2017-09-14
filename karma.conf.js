const TRAVIS = process.env["TRAVIS"] !== undefined;

module.exports = function (config) {

    let reporters         = ["progress", "coverage", "karma-remap-istanbul"],
        coverageReporters = [/*{type: "text-summary"}*/],
        reports           = {"text-summary": null};

    if (TRAVIS) {

        reporters.push("coveralls");
        //coverageReporters.push({type: "lcov", dir: "coverage"});
        reports.lcovonly = "coverage/lcov.info";

    } else {

        //coverageReporters.push({type: "html", dir: "coverage"});
        reports.html = "coverage";
    }

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: "",

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ["jasmine"],

        plugins: [
            "karma-chrome-launcher",
            "karma-coverage",
            "karma-coveralls",
            "karma-jasmine",
            "karma-phantomjs-launcher",
            "karma-remap-istanbul",
            "karma-sourcemap-loader"
        ],

        // list of files / patterns to load in the browser
        files: [
            "node_modules/core-js/client/shim.min.js",
            "node_modules/reflect-metadata/Reflect.js",
            "node_modules/hammerjs/hammer.min.js",
            "node_modules/systemjs/dist/system.src.js",

            "node_modules/zone.js/dist/zone.js",
            "node_modules/zone.js/dist/long-stack-trace-zone.js",
            "node_modules/zone.js/dist/proxy.js",
            "node_modules/zone.js/dist/sync-test.js",
            "node_modules/zone.js/dist/jasmine-patch.js",
            "node_modules/zone.js/dist/async-test.js",
            "node_modules/zone.js/dist/fake-async-test.js",

            {pattern: "systemjs-angular-loader.js", included: false, watched: false},

            {pattern: "node_modules/rxjs/**/*.js", included: false, watched: false},
            {pattern: "node_modules/rxjs/**/*.js.map", included: false, watched: false},

            {pattern: "node_modules/@angular/**/*.js", included: false, watched: false},
            {pattern: "node_modules/@angular/**/*.js.map", included: false, watched: false},

            {pattern: "node_modules/@ng-bootstrap/**/*.js", included: false, watched: false},

            {pattern: "node_modules/@progress/**/*.js", included: false, watched: false},
            {pattern: "node_modules/@telerik/**/*.js", included: false, watched: false},

            {pattern: "node_modules/angular2-text-mask/**/*.js", included: false, watched: false},
            {pattern: "node_modules/text-mask-core/**/*.js", included: false, watched: false},

            {pattern: "node_modules/ionic-angular/**/*.js", included: false, watched: false},

            {pattern: "node_modules/primeng/**/*.js", included: false, watched: false},
            {pattern: "node_modules/primeng/**/*.js.map", included: false, watched: false},

            {pattern: "node_modules/tslib/**/*.js", included: false, watched: false},

            {pattern: "dist/@ng-dynamic-forms/**/*.js", included: false, watched: false},
            {pattern: "dist/@ng-dynamic-forms/**/*.js.map", included: false, watched: false},

            {pattern: "test/**/*.*", included: false, watched: true},

            "karma-test-shim.js"
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {

            "test/*/src/**/!(*.spec).js": ["coverage"],

            "test/*/src/**/*.js": ["sourcemap"]
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: reporters,


        coverageReporter: {

            reporters: coverageReporters
        },


        remapIstanbulReporter: {

            reports: reports
        },

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ["PhantomJS"],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
};