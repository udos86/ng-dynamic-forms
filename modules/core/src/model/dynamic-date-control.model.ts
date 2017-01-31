import { ClsConfig } from "./dynamic-form-control.model";
import { DynamicFormValueControlModelConfig, DynamicFormValueControlModel } from "./dynamic-form-value-control.model";
import { serializable } from "../decorator/serializable.decorator";
import { getValue } from "../utils";

export interface DynamicDateControlModelConfig extends DynamicFormValueControlModelConfig<Date> {

    max?: Date;
    min?: Date;
}

export abstract class DynamicDateControlModel extends DynamicFormValueControlModel<Date> {

    @serializable() max: Date | null;
    @serializable() min: Date | null;

    constructor(config: DynamicDateControlModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.max = getValue(config, "max", null);
        this.min = getValue(config, "min", null);
    }
}