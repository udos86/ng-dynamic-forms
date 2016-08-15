import {DynamicFormControlModel, DynamicFormControlModelConfig, ClsConfig} from "../dynamic-form-control.model";
import {getValue} from "../../utils";

export interface DynamicFieldSet {

    legend: string;
}

export const DYNAMIC_FORM_CONTROL_TYPE_GROUP = "GROUP";

export interface DynamicFormGroupModelConfig extends DynamicFormControlModelConfig {

    group?: Array<DynamicFormControlModel>;
    legend?: string;
}

export class DynamicFormGroupModel extends DynamicFormControlModel implements DynamicFieldSet {

    group: Array<DynamicFormControlModel> = [];
    legend: string;

    constructor(config: DynamicFormGroupModelConfig, cls?: ClsConfig) {

        super(config, cls);

        if (!Array.isArray(config["group"])) {
            throw new Error("group array must be specified for DynamicFormGroupModel");
        }

        this.group = getValue(config, "group", []);
        this.legend = getValue(config, "legend", null);
        this.type = DYNAMIC_FORM_CONTROL_TYPE_GROUP;
    }
}