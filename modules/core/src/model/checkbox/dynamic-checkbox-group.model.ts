import {Label} from "../dynamic-form-control.model";
import {DynamicCheckboxModel} from "./dynamic-checkbox.model";
import {getValue} from "../../utils";
import {DynamicFormModel} from "../dynamic-form.model";

export const DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP = "CHECKBOX_GROUP";

export class DynamicCheckboxGroupModel extends DynamicFormModel {

    items: Array<DynamicCheckboxModel>;
    label: Label;
    legend: string;
    type: string;
    
    constructor(config: {} = {}, cls?: {}) {

        super(getValue(config, "items", []));
        
        this.items = getValue(config, "items", []);
        this.legend = getValue(config, "legend", null);
        this.type = DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP;
    }
}