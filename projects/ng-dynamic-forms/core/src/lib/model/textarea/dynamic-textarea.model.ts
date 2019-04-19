import { DynamicInputControlModel, DynamicInputControlModelConfig } from "../dynamic-input-control.model";
import { DynamicFormControlLayout } from "../misc/dynamic-form-control-layout.model";
import { serializable } from "../../decorator/serializable.decorator";
import { isNumber } from "../../utils/core.utils";

export const DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA = "TEXTAREA";

export const DYNAMIC_FORM_TEXTAREA_WRAP_HARD = "hard";
export const DYNAMIC_FORM_TEXTAREA_WRAP_SOFT = "soft";

export interface DynamicTextAreaModelConfig extends DynamicInputControlModelConfig<string> {

    cols?: number;
    rows?: number;
    wrap?: string;
}

export class DynamicTextAreaModel extends DynamicInputControlModel<string> {

    @serializable() cols: number;
    @serializable() rows: number;
    @serializable() wrap: string;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA;

    constructor(config: DynamicTextAreaModelConfig, layout?: DynamicFormControlLayout) {

        super(config, layout);

        this.cols = isNumber(config.cols) ? config.cols : 20;
        this.rows = isNumber(config.rows) ? config.rows : 2;
        this.wrap = config.wrap || DYNAMIC_FORM_TEXTAREA_WRAP_SOFT;
    }
}