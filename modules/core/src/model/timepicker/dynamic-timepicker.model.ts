import { ClsConfig } from "../dynamic-form-control.model";
import { serializable } from "../../decorator/serializable.decorator";
import { Utils } from "../../utils/core.utils";
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

        this.meridian = Utils.isBoolean(config.meridian) ? config.meridian : false;
        this.showSeconds = Utils.isBoolean(config.showSeconds) ? config.showSeconds : false;
    }
}