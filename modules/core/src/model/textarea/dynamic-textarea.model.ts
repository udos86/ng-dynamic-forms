import {ClsConfig} from "../dynamic-form-control.model";
import {DynamicInputControlModel, DynamicInputControlModelConfig} from "../dynamic-input-control.model";
import {serializable} from "../../decorator/serializable.decorator";
import {getValue} from "../../utils";

export const DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA = "TEXTAREA";

export const DYNAMIC_FORM_TEXTAREA_WRAP_HARD = "hard";
export const DYNAMIC_FORM_TEXTAREA_WRAP_SOFT = "soft";

export interface DynamicTextAreaModelConfig extends DynamicInputControlModelConfig {

    cols?: number;
    rows?: number;
    wrap?: string;
}

export class DynamicTextAreaModel extends DynamicInputControlModel<string> {

    @serializable() cols: number;
    @serializable() rows: number;
    @serializable() wrap: string;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA;

    constructor(config: DynamicTextAreaModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.cols = getValue(config, "cols", 20);
        this.rows = getValue(config, "rows", 2);
        this.wrap = getValue(config, "wrap", DYNAMIC_FORM_TEXTAREA_WRAP_SOFT);
    }
}