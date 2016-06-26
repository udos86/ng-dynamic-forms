import {DynamicFormControlModel} from "../dynamic-form-control.model";
import {DynamicCheckboxModel} from "./dynamic-checkbox.model";
import {getValue} from "../../utils";

export const DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP = "CHECKBOX_GROUP";

export class DynamicCheckboxGroupModel extends DynamicFormControlModel<boolean> {

    items: Array<DynamicCheckboxModel>;
    legend: string;
    
    constructor(config: {} = {}, cls?: {}) {

        super(config, cls);

        this.items = getValue(config, "items", []);
        this.legend = getValue(config, "legend", null);
        this.type = DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP;
    }
}