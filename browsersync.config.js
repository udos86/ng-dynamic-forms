var indexPath = "./example/index.html";

module.exports = {

    server: {

        baseDir: [".", "example"],
        middleware: {
            1: require("connect-history-api-fallback")({index: indexPath})
        }
    },
    startPath: indexPath
};