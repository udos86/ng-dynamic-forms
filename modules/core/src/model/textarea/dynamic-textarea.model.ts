import {ClsConfig} from "../dynamic-form-control.model";
import {DynamicInputControlModel, DynamicInputControlModelConfig} from "../dynamic-input-control.model";
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

    cols: number;
    rows: number;
    wrap: string;

    constructor(config: DynamicTextAreaModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.cols = getValue(config, "cols", 20);
        this.rows = getValue(config, "rows", 2);
        this.type = DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA;
        this.wrap = getValue(config, "wrap", DYNAMIC_FORM_TEXTAREA_WRAP_SOFT);
    }
}