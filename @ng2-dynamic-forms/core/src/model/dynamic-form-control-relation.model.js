"use strict";
exports.DYNAMIC_FORM_CONTROL_ACTION_DISABLE = "DISABLE";
exports.DYNAMIC_FORM_CONTROL_ACTION_ENABLE = "ENABLE";
exports.DYNAMIC_FORM_CONTROL_CONNECTIVE_AND = "AND";
exports.DYNAMIC_FORM_CONTROL_CONNECTIVE_OR = "OR";
function findDisableRelation(relGroups) {
    return relGroups.find(function (rel) { return rel.action === exports.DYNAMIC_FORM_CONTROL_ACTION_DISABLE; });
}
exports.findDisableRelation = findDisableRelation;
function findEnableRelation(relGroups) {
    return relGroups.find(function (rel) { return rel.action === exports.DYNAMIC_FORM_CONTROL_ACTION_ENABLE; });
}
exports.findEnableRelation = findEnableRelation;
function findActivationRelation(relGroups) {
    return relGroups.find(function (rel) { return rel.action === exports.DYNAMIC_FORM_CONTROL_ACTION_DISABLE || rel.action === exports.DYNAMIC_FORM_CONTROL_ACTION_ENABLE; });
}
exports.findActivationRelation = findActivationRelation;
function findIds(relGroups) {
    var ids = [];
    relGroups.forEach(function (relGroup) { return relGroup.when.forEach(function (rel) {
        if (ids.indexOf(rel.id) === -1) {
            ids.push(rel.id);
        }
    }); });
    return ids;
}
exports.findIds = findIds;
function toBeDisabled(relGroup, formGroup) {
    return relGroup.when.reduce(function (toBeDisabled, rel, index) {
        var control = formGroup.get(rel.id);
        if (control && relGroup.action === exports.DYNAMIC_FORM_CONTROL_ACTION_DISABLE) {
            if (index > 0 && relGroup.connective === exports.DYNAMIC_FORM_CONTROL_CONNECTIVE_AND && !toBeDisabled) {
                return false;
            }
            if (index > 0 && relGroup.connective === exports.DYNAMIC_FORM_CONTROL_CONNECTIVE_OR && toBeDisabled) {
                return true;
            }
            return rel.value === control.value || rel.status === control.status;
        }
        if (control && relGroup.action === exports.DYNAMIC_FORM_CONTROL_ACTION_ENABLE) {
            if (index > 0 && relGroup.connective === exports.DYNAMIC_FORM_CONTROL_CONNECTIVE_AND && toBeDisabled) {
                return true;
            }
            if (index > 0 && relGroup.connective === exports.DYNAMIC_FORM_CONTROL_CONNECTIVE_OR && !toBeDisabled) {
                return false;
            }
            return !(rel.value === control.value || rel.status === control.status);
        }
        return false;
    }, false);
}
exports.toBeDisabled = toBeDisabled;

//# sourceMappingURL=dynamic-form-control-relation.model.js.map
