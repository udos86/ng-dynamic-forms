import { DynamicDateControlModel, DynamicDateControlModelConfig } from "../dynamic-date-control.model";
import { DynamicFormControlLayout } from "../dynamic-form-control-layout.model";
import { serializable } from "../../decorator/serializable.decorator";

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

        this.meridian = typeof config.meridian === "boolean" ? config.meridian : false;
        this.showSeconds = typeof config.showSeconds === "boolean" ? config.showSeconds : false;
    }
}