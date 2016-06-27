import {DynamicFormControlModel} from "../dynamic-form-control.model";
import {getValue} from "../../utils";

export const DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX = "CHECKBOX";

export class DynamicCheckboxModel extends DynamicFormControlModel<boolean> {

    align: string;
    //checked: boolean; // actually makes no sense since type of value is boolean
    indeterminate: boolean;

    constructor(config: {} = {}, cls?: {}) {

        super(config, cls);

        this.align = getValue(config, "align", "start");
        //this.checked = getValue(config, "checked", false);
        this.indeterminate = getValue(config, "indeterminate", false);
        this.type = DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX;
    }
}