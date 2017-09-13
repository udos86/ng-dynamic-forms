import { ClsConfig } from "../dynamic-form-control.model";
import { serializable } from "../../decorator/serializable.decorator";
import { DynamicDateControlModel, DynamicDateControlModelConfig } from "../dynamic-date-control.model";

export const DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER = "TIMEPICKER";

export interface DynamicTimePickerModelConfig extends DynamicDateControlModelConfig {

    meridian?: boolean;
    showSeconds?: boolean;
}

export class DynamicTimePickerModel extends DynamicDateControlModel {

    @serializable() meridian: boolean;
    @serializable() showSeconds: boolean;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER;

    constructor(config: DynamicTimePickerModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.meridian = typeof config.meridian === "boolean" ? config.meridian : false;
        this.showSeconds = typeof config.showSeconds === "boolean" ? config.showSeconds : false;
    }
}