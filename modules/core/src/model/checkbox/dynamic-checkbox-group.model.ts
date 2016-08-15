import {ClsConfig} from "../dynamic-form-control.model";
import {DynamicFormGroupModel, DynamicFormGroupModelConfig} from "../form-group/dynamic-form-group.model";
import {DynamicCheckboxModel} from "./dynamic-checkbox.model";

export const DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP = "CHECKBOX_GROUP";

export class DynamicCheckboxGroupModel extends DynamicFormGroupModel {

    group: Array<DynamicCheckboxModel>;

    constructor(config: DynamicFormGroupModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.type = DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP;
    }
}