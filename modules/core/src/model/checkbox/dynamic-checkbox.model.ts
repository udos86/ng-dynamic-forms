import {DynamicFormControlModel} from "../dynamic-form-control.model";
import {getValue} from "../../utils";

export const DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX = "CHECKBOX";

export class DynamicCheckboxModel extends DynamicFormControlModel<boolean> {

    align: string;
    //checked: boolean; // actually makes no sense since type of value is boolean
    indeterminate: boolean;

    constructor(configObject: {} = {}) {

        super(configObject);

        this.align = getValue(configObject, "align", "start");
        //this.checked = getValue(configObject, "checked", false);
        this.indeterminate = getValue(configObject, "indeterminate", false);
        this.type = DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX;
    }
}