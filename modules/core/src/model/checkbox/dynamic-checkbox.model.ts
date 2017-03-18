import { ClsConfig } from "../dynamic-form-control.model";
import { DynamicCheckControlModel, DynamicCheckControlModelConfig } from "../dynamic-check-control.model";
import { serializable } from "../../decorator/serializable.decorator";
import { isBoolean } from "../../utils";

export const DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX = "CHECKBOX";

export interface DynamicCheckboxModelConfig extends DynamicCheckControlModelConfig {

    indeterminate?: boolean;
}

export class DynamicCheckboxModel extends DynamicCheckControlModel {

    @serializable() indeterminate: boolean;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX;

    constructor(config: DynamicCheckboxModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.indeterminate = isBoolean(config.indeterminate) ? config.indeterminate : false;
    }
}