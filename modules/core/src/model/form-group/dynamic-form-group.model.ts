import {DynamicFormAbstractControlModel} from "../dynamic-form-abstract-control.model";
import {getValue} from "../../utils";
import {IDynamicFormGroupModel} from "../dynamic-form.model";

export interface IDynamicFieldSet {

    legend: string;
}

export const DYNAMIC_FORM_CONTROL_TYPE_GROUP = "GROUP";

export class DynamicFormGroupModel extends DynamicFormAbstractControlModel implements IDynamicFormGroupModel, IDynamicFieldSet {

    group: Array<DynamicFormAbstractControlModel> = [];
    legend: string;

    constructor(config: {} = {}, cls?: {}) {

        super(config, cls);

        if (!Array.isArray(config["group"])) {
            throw new Error("group array must be specified for DynamicFormGroupModel");
        }

        this.group = getValue(config, "group", []);
        this.legend = getValue(config, "legend", null);
        this.type = DYNAMIC_FORM_CONTROL_TYPE_GROUP;
    }
}