import {DynamicInputControlModel} from "../dynamic-input-control.model";
import {getValue} from "../../utils";

export const DYNAMIC_FORM_CONTROL_TYPE_INPUT = "INPUT";

export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_EMAIL = "email";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER = "number";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_PASSWORD = "password";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_RANGE = "range";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_SEARCH = "search";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT = "text";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_URL = "url";

export class DynamicInputModel extends DynamicInputControlModel<any> {

    inputType: string;
    max: number;
    min: number;
    step: number;
    
    constructor(configObject: {} = {}) {

        super(configObject);

        this.inputType = getValue(configObject, "inputType", DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT);
        this.max = getValue(configObject, "max", null);
        this.min = getValue(configObject, "min", null);
        this.step = getValue(configObject, "step", null);
        this.type = DYNAMIC_FORM_CONTROL_TYPE_INPUT;
    }
}