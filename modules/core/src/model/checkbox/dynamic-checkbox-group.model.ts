import {getValue} from "../../utils";
import {DynamicFormArrayModel} from "../dynamic-form-array.model";

export const DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP = "CHECKBOX_GROUP";

export class DynamicCheckboxGroupModel extends DynamicFormArrayModel {

    label: string;
    legend: string;
    
    constructor(config: {} = {}, cls?: {}) {

        super(config, cls);

        this.label = getValue(config, "label", null);
        this.legend = getValue(config, "legend", null);
        this.type = DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP;
    }
}