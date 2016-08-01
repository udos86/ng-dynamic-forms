import {getValue} from "../../utils";
import {DynamicFormAbstractControlModel} from "../dynamic-form-abstract-control.model";
import {IDynamicFormGroupModel} from "../dynamic-form.model";
import {DynamicCheckboxModel} from "./dynamic-checkbox.model";

export const DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP = "CHECKBOX_GROUP";

export class DynamicCheckboxGroupModel extends DynamicFormAbstractControlModel implements IDynamicFormGroupModel {

    group: Array<DynamicCheckboxModel>;
    legend: string;
    
    constructor(config: {} = {}, cls?: {}) {

        super(config, cls);

        this.group = getValue(config, "group", []);
        this.legend = getValue(config, "legend", null);
        this.type = DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP;
    }
}