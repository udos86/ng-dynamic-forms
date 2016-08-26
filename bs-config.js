module.exports = {

    server: {
        middleware: {
            1: require("connect-history-api-fallback")({
                index: "./example/index.html"
            })
        }
    },

    startPath: "./example/index.html"
};
