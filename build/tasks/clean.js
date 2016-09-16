"use strict";
var del = require("del");

module.exports = function (src) {

    return function () {
        return del(src);
    }
};