import {ClsConfig} from "../dynamic-form-control.model";
import {DynamicFormValueControlModelConfig, DynamicFormValueControlModel} from "../dynamic-form-value-control.model";
import {serializable} from "../../decorator/serializable.decorator";
import {getValue} from "../../utils";

export const DYNAMIC_FORM_CONTROL_TYPE_SLIDER = "SLIDER";

export interface DynamicSliderModelConfig extends DynamicFormValueControlModelConfig {

    min?: number;
    max?: number;
    step?: number;
    vertical?: boolean;
}

export class DynamicSliderModel extends DynamicFormValueControlModel<number> {

    @serializable() min: number | null;
    @serializable() max: number | null;
    @serializable() step: number | null;
    @serializable() vertical: boolean;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_SLIDER;

    constructor(config: DynamicSliderModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.min = getValue(config, "min", 0);
        this.max = getValue(config, "max", 10);
        this.step = getValue(config, "step", 1);
        this.vertical = getValue(config, "vertical", false);
    }
}