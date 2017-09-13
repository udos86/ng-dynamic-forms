import { ClsConfig } from "../dynamic-form-control.model";
import { DynamicFormValueControlModelConfig, DynamicFormValueControlModel } from "../dynamic-form-value-control.model";
import { serializable } from "../../decorator/serializable.decorator";

export const DYNAMIC_FORM_CONTROL_TYPE_SLIDER = "SLIDER";

export interface DynamicSliderModelConfig extends DynamicFormValueControlModelConfig<number> {

    max?: number;
    min?: number;
    step?: number;
    vertical?: boolean;
}

export class DynamicSliderModel extends DynamicFormValueControlModel<number> {

    @serializable() max: number | null;
    @serializable() min: number | null;
    @serializable() step: number | null;
    @serializable() vertical: boolean;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_SLIDER;

    constructor(config: DynamicSliderModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.max = typeof config.max === "number" ? config.max : 10;
        this.min = typeof config.min === "number" ? config.min : 0;
        this.step = typeof config.step === "number" ? config.step : 1;
        this.vertical = typeof config.vertical === "boolean" ? config.vertical : false;
    }
}