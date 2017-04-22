import { ClsConfig } from "./dynamic-form-control.model";
import { DynamicFormValueControlModelConfig, DynamicFormValueControlModel } from "./dynamic-form-value-control.model";
import { serializable } from "../decorator/serializable.decorator";

export interface DynamicDateControlModelConfig extends DynamicFormValueControlModelConfig<string | Date> {

    format?: string;
    max?: string | Date;
    min?: string | Date;
    placeholder?: string;
}

export abstract class DynamicDateControlModel extends DynamicFormValueControlModel<string | Date> {

    @serializable() format: string | null;
    @serializable() max: string | Date | null;
    @serializable() min: string | Date | null;
    @serializable() placeholder: string | null;

    constructor(config: DynamicDateControlModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.format = config.format || null;
        this.max = config.max || null;
        this.min = config.min || null;
        this.placeholder = config.placeholder || null;
    }
}