import {DynamicFormInputControlModel} from "../dynamic-form-input-control.model";

export const DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA = "textarea";

export class DynamicFormTextAreaModel extends DynamicFormInputControlModel<string> {

    editor: boolean;

    constructor(configObject: {} = {}) {

        super(configObject);

        this.editor = configObject["editor"] || false;
        this.type = DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA;
    }
}