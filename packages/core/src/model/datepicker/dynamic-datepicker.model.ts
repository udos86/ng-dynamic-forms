import { DynamicFormControlLayout } from "../dynamic-form-control-layout.model";
import { serializable } from "../../decorator/serializable.decorator";
import {
    DynamicDateControlModel,
    DynamicDateControlModelConfig,
    DynamicDateControlValue
} from "../dynamic-date-control.model";

export const DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER = "DATEPICKER";

export interface DynamicDatePickerModelConfig extends DynamicDateControlModelConfig {

    focusedDate?: DynamicDateControlValue;
    inline?: boolean;
    toggleIcon?: string;
}

export class DynamicDatePickerModel extends DynamicDateControlModel {

    @serializable() focusedDate: DynamicDateControlValue | null;
    @serializable() inline: boolean;
    @serializable() toggleIcon: string | null;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER;

    constructor(config: DynamicDatePickerModelConfig, layout?: DynamicFormControlLayout) {

        super(config, layout);

        this.focusedDate = config.focusedDate || null;
        this.inline = typeof config.inline === "boolean" ? config.inline : false;
        this.toggleIcon = typeof config.toggleIcon === "string" ? config.toggleIcon : null;
    }
}