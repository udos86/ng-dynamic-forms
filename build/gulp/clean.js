const del = require("del");

module.exports = src => () => del(src);