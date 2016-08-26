var indexPath = "./example/index.html";

module.exports = {

    server: {
        middleware: {
            1: require("connect-history-api-fallback")({index: indexPath})
        }
    },

    startPath: indexPath
};