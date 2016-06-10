import {DynamicFormControlModel} from "../dynamic-form-control.model";

export const DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX = "CHECKBOX";

export class DynamicCheckboxModel extends DynamicFormControlModel<boolean> {

    align: string;
    //checked: boolean; // actually makes no sense since type of value is boolean
    indeterminate: boolean;
    text: string;

    constructor(configObject: {} = {}) {

        super(configObject);

        this.align = configObject["align"] || "start";
        //this.checked = configObject["checked"] === undefined ? false : configObject["checked"];
        this.indeterminate = configObject["indeterminate"] === undefined ? false : configObject["indeterminate"];
        this.text = configObject["text"] || "";
        this.type = DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX;
    }
}