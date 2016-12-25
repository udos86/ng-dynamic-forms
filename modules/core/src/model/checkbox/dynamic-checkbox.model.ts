import { ClsConfig } from "../dynamic-form-control.model";
import { DynamicFormValueControlModelConfig } from "../dynamic-form-value-control.model";
import { DynamicCheckControlModel } from "../dynamic-check-control.model";
import { serializable } from "../../decorator/serializable.decorator";
import { getValue } from "../../utils";

export const DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX = "CHECKBOX";

export interface DynamicCheckboxModelConfig extends DynamicFormValueControlModelConfig<boolean> {

    indeterminate?: boolean;
    labelPosition?: string;
}

export class DynamicCheckboxModel extends DynamicCheckControlModel {

    @serializable() indeterminate: boolean;
    @serializable() labelPosition: string | null;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX;

    constructor(config: DynamicCheckboxModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.indeterminate = getValue(config, "indeterminate", false);
        this.labelPosition = getValue(config, "labelPosition", null);
    }
}