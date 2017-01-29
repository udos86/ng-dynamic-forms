import { ClsConfig } from "../dynamic-form-control.model";
import { DynamicFormValueControlModelConfig, DynamicFormValueControlModel } from "../dynamic-form-value-control.model";
import { serializable } from "../../decorator/serializable.decorator";
import { getValue } from "../../utils";

export const DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER = "DATEPICKER";

export const DYNAMIC_FORM_CONTROL_PICKER_TYPE_DATE = "DATE";
export const DYNAMIC_FORM_CONTROL_PICKER_TYPE_TIME = "TIME";

export interface DynamicDatepickerModelConfig extends DynamicFormValueControlModelConfig<Date> {

    focusedDate?: Date;
    min?: Date;
    max?: Date;
    pickerType?: string;
}

export class DynamicDatepickerModel extends DynamicFormValueControlModel<Date> {

    @serializable() focusedDate: Date | null;
    @serializable() min: Date | null;
    @serializable() max: Date | null;
    @serializable() pickerType: string;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER;

    constructor(config: DynamicDatepickerModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.focusedDate = getValue(config, "focusedDate", null);
        this.min = getValue(config, "min", null);
        this.max = getValue(config, "max", null);
        this.pickerType = getValue(config, "pickerType", DYNAMIC_FORM_CONTROL_PICKER_TYPE_DATE);
    }
}