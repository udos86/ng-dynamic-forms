import {DynamicInputControlModel} from "../dynamic-input-control.model";
import {getValue} from "../../utils";

export const DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA = "TEXTAREA";

export const DYNAMIC_FORM_TEXTAREA_WRAP_HARD = "hard";
export const DYNAMIC_FORM_TEXTAREA_WRAP_SOFT = "soft";

export class DynamicTextAreaModel extends DynamicInputControlModel<string> {

    cols: number;
    rows: number;
    wrap: string;

    constructor(config: {} = {}, cls?: {}) {

        super(config, cls);

        this.cols = getValue(config, "cols", 20);
        this.rows = getValue(config, "rows", 2);
        this.type = DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA;
        this.wrap = getValue(config, "wrap", DYNAMIC_FORM_TEXTAREA_WRAP_SOFT);
    }
}