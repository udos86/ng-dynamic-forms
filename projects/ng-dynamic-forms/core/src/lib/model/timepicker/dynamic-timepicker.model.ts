import { DynamicDateControlModel, DynamicDateControlModelConfig } from "../dynamic-date-control.model";
import { DynamicFormControlLayout } from "../misc/dynamic-form-control-layout.model";
import { serializable } from "../../decorator/serializable.decorator";
import { isBoolean } from "../../utils/core.utils";

export const DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER = "TIMEPICKER";

export interface DynamicTimePickerModelConfig extends DynamicDateControlModelConfig {

    meridian?: boolean;
    showSeconds?: boolean;
}

export class DynamicTimePickerModel extends DynamicDateControlModel {

    @serializable() meridian: boolean;
    @serializable() showSeconds: boolean;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER;

    constructor(config: DynamicTimePickerModelConfig, layout?: DynamicFormControlLayout) {

        super(config, layout);

        this.meridian = isBoolean(config.meridian) ? config.meridian : false;
        this.showSeconds = isBoolean(config.showSeconds) ? config.showSeconds : false;
    }
}