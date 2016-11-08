"use strict";
exports.METADATA_KEY_SERIALIZABLE = "SERIALIZABLE";
function serializable(name) {
    return function (target, key) {
        Reflect.defineMetadata(exports.METADATA_KEY_SERIALIZABLE, { key: key, name: name || key }, target, key);
    };
}
exports.serializable = serializable;
function getSerializables(target) {
    var serializables = [];
    for (var key in target) {
        var metadata = Reflect.getMetadata(exports.METADATA_KEY_SERIALIZABLE, target, key);
        if (metadata) {
            serializables.push(metadata);
        }
    }
    return serializables;
}
exports.getSerializables = getSerializables;

//# sourceMappingURL=serializable.decorator.js.map
