import { ClsConfig } from "../dynamic-form-control.model";
import { serializable } from "../../decorator/serializable.decorator";
import { Utils } from "../../core.utils";
import { DynamicDateControlModel, DynamicDateControlModelConfig } from "../dynamic-date-control.model";

export const DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER = "DATEPICKER";

export interface DynamicDatePickerModelConfig extends DynamicDateControlModelConfig {

    focusedDate?: string | Date;
    inline?: boolean;
}

export class DynamicDatePickerModel extends DynamicDateControlModel {

    @serializable() focusedDate: string | Date | null;
    @serializable() inline: boolean;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER;

    constructor(config: DynamicDatePickerModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.focusedDate = config.focusedDate || null;
        this.inline = Utils.isBoolean(config.inline) ? config.inline : false;
    }
}