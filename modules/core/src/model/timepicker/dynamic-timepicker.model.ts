import { ClsConfig } from "../dynamic-form-control.model";
import { serializable } from "../../decorator/serializable.decorator";
import { isBoolean } from "../../utils";
import { DynamicDateControlModel, DynamicDateControlModelConfig } from "../dynamic-date-control.model";

export const DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER = "TIMEPICKER";

export interface DynamicTimePickerModelConfig extends DynamicDateControlModelConfig {

    meridian?: boolean;
}

export class DynamicTimePickerModel extends DynamicDateControlModel {

    @serializable() meridian: boolean;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER;

    constructor(config: DynamicTimePickerModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.meridian = isBoolean(config.meridian) ? config.meridian : false;
    }
}