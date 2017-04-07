import { ClsConfig } from "./dynamic-form-control.model";
import { DynamicFormValueControlModelConfig, DynamicFormValueControlModel } from "./dynamic-form-value-control.model";
import { serializable } from "../decorator/serializable.decorator";

export interface DynamicDateControlModelConfig extends DynamicFormValueControlModelConfig<Date> {

    format?: string;
    max?: Date;
    min?: Date;
}

export abstract class DynamicDateControlModel extends DynamicFormValueControlModel<Date> {

    @serializable() format: string | null;
    @serializable() max: Date | null;
    @serializable() min: Date | null;

    constructor(config: DynamicDateControlModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.format = config.format || null;
        this.max = config.max || null;
        this.min = config.min || null;
    }
}