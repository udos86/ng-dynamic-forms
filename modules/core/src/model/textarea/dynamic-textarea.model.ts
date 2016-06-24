import {DynamicInputControlModel} from "../dynamic-input-control.model";
import {getValue} from "../../utils";

export const DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA = "TEXTAREA";

export const DYNAMIC_FORM_TEXTAREA_WRAP_HARD = "hard";
export const DYNAMIC_FORM_TEXTAREA_WRAP_SOFT = "soft";

export class DynamicTextAreaModel extends DynamicInputControlModel<string> {

    cols: number;
    rows: number;
    wrap: string;

    constructor(modelConfig: {} = {}, clsConfig: {} = {}) {

        super(modelConfig, clsConfig);

        this.cols = getValue(modelConfig, "cols", 20);
        this.rows = getValue(modelConfig, "rows", 2);
        this.type = DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA;
        this.wrap = getValue(modelConfig, "wrap", DYNAMIC_FORM_TEXTAREA_WRAP_SOFT);
    }
}