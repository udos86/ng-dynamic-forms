import { DynamicFormControlClsConfig } from "./dynamic-form-control.model";
import { DynamicFormValueControlModelConfig, DynamicFormValueControlModel } from "./dynamic-form-value-control.model";
import { serializable } from "../decorator/serializable.decorator";

export type DynamicDateControlValue = string | object | Date;

export interface DynamicDateControlModelConfig extends DynamicFormValueControlModelConfig<DynamicDateControlValue> {

    format?: string;
    max?: DynamicDateControlValue;
    min?: DynamicDateControlValue;
    placeholder?: string;
}

export abstract class DynamicDateControlModel extends DynamicFormValueControlModel<DynamicDateControlValue> {

    @serializable() format: string | null;
    @serializable() max: DynamicDateControlValue | null;
    @serializable() min: DynamicDateControlValue | null;
    @serializable() placeholder: string | null;

    constructor(config: DynamicDateControlModelConfig, clsConfig?: DynamicFormControlClsConfig) {

        super(config, clsConfig);

        this.format = config.format || null;
        this.max = config.max || null;
        this.min = config.min || null;
        this.placeholder = config.placeholder || null;
    }
}