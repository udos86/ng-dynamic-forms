import { ClsConfig } from "../dynamic-form-control.model";
import { DynamicFormValueControlModelConfig, DynamicFormValueControlModel } from "../dynamic-form-value-control.model";
import { serializable } from "../../decorator/serializable.decorator";
import { Utils } from "../../utils/core.utils";

export const DYNAMIC_FORM_CONTROL_TYPE_RATING = "RATING";

export interface DynamicRatingModelConfig extends DynamicFormValueControlModelConfig<number> {

    max?: number;
}

export class DynamicRatingModel extends DynamicFormValueControlModel<number> {

    @serializable() max: number | null;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_RATING;

    constructor(config: DynamicRatingModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.max = Utils.isNumber(config.max) ? config.max : 10;
    }
}