import {DynamicInputControlModel} from "../dynamic-input-control.model";

export const DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA = "TEXTAREA";

export const DYNAMIC_FORM_TEXTAREA_WRAP_HARD = "hard";
export const DYNAMIC_FORM_TEXTAREA_WRAP_SOFT = "soft";

export class DynamicTextAreaModel extends DynamicInputControlModel<string> {

    cols: number;
    //editor: boolean;
    rows: number;
    wrap: string;

    constructor(configObject: {} = {}) {

        super(configObject);

        this.cols = configObject["cols"] || 20;
        //this.editor = configObject["editor"] || false;
        this.rows = configObject["rows"] || 2;
        this.type = DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA;
        this.wrap = configObject["wrap"] || DYNAMIC_FORM_TEXTAREA_WRAP_SOFT;
    }
}