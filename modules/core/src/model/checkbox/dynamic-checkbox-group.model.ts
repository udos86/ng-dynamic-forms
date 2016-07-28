import {getValue} from "../../utils";
import {DynamicFormAbstractControlModel} from "../dynamic-form-abstract-control.model";
import {IFormGroupModel} from "../dynamic-form.model";
import {DynamicCheckboxModel} from "./dynamic-checkbox.model";

export const DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP = "CHECKBOX_GROUP";

export class DynamicCheckboxGroupModel extends DynamicFormAbstractControlModel implements IFormGroupModel {

    items: Array<DynamicCheckboxModel>;
    label: string;
    legend: string;
    
    constructor(config: {} = {}, cls?: {}) {

        super(config, cls);

        this.items = getValue(config, "items", []);
        this.label = getValue(config, "label", null);
        this.legend = getValue(config, "legend", null);
        this.type = DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP;
    }
}