import {
    DynamicDateControlModel,
    DynamicDateControlModelConfig,
    DynamicDateControlValue
} from "../dynamic-date-control.model";
import { DynamicFormControlLayout } from "../misc/dynamic-form-control-layout.model";
import { serializable } from "../../decorator/serializable.decorator";

export const DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER = "DATEPICKER";

export interface DynamicDatePickerModelConfig extends DynamicDateControlModelConfig {

    autoFocus?: boolean;
    focusedDate?: DynamicDateControlValue;
    inline?: boolean;
    prefix?: string;
    readOnly?: boolean;
    suffix?: string;
    toggleIcon?: string;
    toggleLabel?: string;
}

export class DynamicDatePickerModel extends DynamicDateControlModel {

    @serializable() autoFocus: boolean;
    @serializable() focusedDate: DynamicDateControlValue | null;
    @serializable() inline: boolean;
    @serializable() prefix: string | null;
    @serializable() readOnly : boolean;
    @serializable() suffix: string | null;
    @serializable() toggleIcon: string | null;
    @serializable() toggleLabel: string | null;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER;

    constructor(config: DynamicDatePickerModelConfig, layout?: DynamicFormControlLayout) {

        super(config, layout);

        this.autoFocus = typeof config.autoFocus === "boolean" ? config.autoFocus : false;
        this.focusedDate = config.focusedDate || null;
        this.inline = typeof config.inline === "boolean" ? config.inline : false;
        this.prefix = config.prefix || null;
        this.readOnly = typeof config.readOnly === "boolean" ? config.readOnly : false;
        this.toggleIcon = typeof config.toggleIcon === "string" ? config.toggleIcon : null;
        this.toggleLabel = typeof config.toggleLabel === "string" ? config.toggleLabel : null;
        this.suffix = config.suffix || null;
    }
}