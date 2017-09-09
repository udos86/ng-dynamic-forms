module.exports.config = {

    baseUrl: "http://localhost:3000/",

    seleniumAddress: "http://localhost:4444/wd/hub",

    specs: ["./sample/**/*.e2e.spec.js"],

    framework: "jasmine",

    useAllAngular2AppRoots: true
};