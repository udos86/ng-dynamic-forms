import { DynamicCheckControlModel, DynamicCheckControlModelConfig } from "../dynamic-check-control.model";
import { DynamicFormControlLayout } from "../misc/dynamic-form-control-layout.model";
import { serializable } from "../../decorator/serializable.decorator";
import { isBoolean } from "../../utils/core.utils";

export const DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX = "CHECKBOX";

export interface DynamicCheckboxModelConfig extends DynamicCheckControlModelConfig {

    indeterminate?: boolean;
}

export class DynamicCheckboxModel extends DynamicCheckControlModel {

    @serializable() indeterminate: boolean;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX;

    constructor(config: DynamicCheckboxModelConfig, layout?: DynamicFormControlLayout) {

        super(config, layout);

        this.indeterminate = isBoolean(config.indeterminate) ? config.indeterminate : false;
    }
}