import {ClsConfig} from "../dynamic-form-control.model";
import {DynamicFormValueControlModel, DynamicFormValueControlModelConfig} from "../dynamic-form-value-control.model";
import {getValue} from "../../utils";

export const DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX = "CHECKBOX";

export const DYNAMIC_FORM_CONTROL_CHECKBOX_ALIGN_START = "start";
export const DYNAMIC_FORM_CONTROL_CHECKBOX_ALIGN_END = "end";

export interface CheckboxModelConfig extends DynamicFormValueControlModelConfig {

    align?: string;
    indeterminate?: boolean;
}

export class DynamicCheckboxModel extends DynamicFormValueControlModel<boolean> {

    align: string;
    indeterminate: boolean;

    constructor(config: CheckboxModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.align = getValue(config, "align", DYNAMIC_FORM_CONTROL_CHECKBOX_ALIGN_START);
        this.indeterminate = getValue(config, "indeterminate", false);
        this.type = DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX;
        
        if (this.value !== true) {
            this.value = false;
        }
    }
}