import { ClsConfig } from "../dynamic-form-control.model";
import { serializable } from "../../decorator/serializable.decorator";
import { DynamicDateControlModel, DynamicDateControlModelConfig } from "../dynamic-date-control.model";

export const DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER = "DATEPICKER";

export interface DynamicDatePickerModelConfig extends DynamicDateControlModelConfig {

    focusedDate?: string | Date;
    inline?: boolean;
    toggleIcon?: string;
}

export class DynamicDatePickerModel extends DynamicDateControlModel {

    @serializable() focusedDate: string | Date | null;
    @serializable() inline: boolean;
    @serializable() toggleIcon: string | null;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER;

    constructor(config: DynamicDatePickerModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.focusedDate = config.focusedDate || null;
        this.inline = typeof config.inline === "boolean" ? config.inline : false;
        this.toggleIcon = typeof config.toggleIcon === "string" ? config.toggleIcon : null;
    }
}