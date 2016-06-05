import {DynamicFormInputControlModel} from "../dynamic-form-input-control.model";

export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_EMAIL = "email";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_PASSWORD = "password";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_SEARCH = "search";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT = "text";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_URL = "url";

export class DynamicTextInputModel extends DynamicFormInputControlModel<string> {
    
    constructor(configObject: {} = {}) {

        super(configObject);

        this.inputType = configObject["inputType"] || DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT;
    }
}