import {DynamicInputControlModel} from "../dynamic-input-control.model";

export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_EMAIL = "email";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER = "number";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_PASSWORD = "password";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_RANGE = "range";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_SEARCH = "search";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT = "text";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_URL = "url";

export class DynamicInputModel extends DynamicInputControlModel<any> {

    max: number;
    min: number;
    step: number;
    
    constructor(configObject: {} = {}) {

        super(configObject);

        this.inputType = configObject["inputType"] || DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT;
        this.max = configObject["max"] === undefined ? null : configObject["max"];
        this.min = configObject["min"] === undefined ? null : configObject["min"];
        this.step = configObject["step"] === undefined ? null : configObject["step"];
    }
}