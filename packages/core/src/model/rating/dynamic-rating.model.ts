import { DynamicFormValueControlModelConfig, DynamicFormValueControlModel } from "../dynamic-form-value-control.model";
import { DynamicFormControlLayout } from "../misc/dynamic-form-control-layout.model";
import { serializable } from "../../decorator/serializable.decorator";
import { isNumber } from "../../utils/core.utils";

export const DYNAMIC_FORM_CONTROL_TYPE_RATING = "RATING";

export interface DynamicRatingModelConfig extends DynamicFormValueControlModelConfig<number> {

    max?: number;
}

export class DynamicRatingModel extends DynamicFormValueControlModel<number> {

    @serializable() max: number | null;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_RATING;

    constructor(config: DynamicRatingModelConfig, layout?: DynamicFormControlLayout) {

        super(config, layout);

        this.max = isNumber(config.max) ? config.max : 10;
    }
}