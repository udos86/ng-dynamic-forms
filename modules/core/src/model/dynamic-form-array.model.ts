import {DynamicFormAbstractControlModel} from "./dynamic-form-abstract-control.model";
import {DynamicFormControlModel} from "@ng2-dynamic-forms/core";
import {IDynamicFormGroupModel} from "./dynamic-form.model";
import {getValue} from "../utils";

export const DYNAMIC_FORM_CONTROL_TYPE_ARRAY = "ARRAY";

export class DynamicFormArrayModel extends DynamicFormAbstractControlModel implements IDynamicFormGroupModel {

    group: Array<DynamicFormControlModel<any>>;
    initialCount: number;
    
    constructor(config: {} = {}, cls?: {}) {

        super(config, cls);

        this.group = getValue(config, "group", []);
        this.initialCount = getValue(config, "initialCount", 1);
        this.type = DYNAMIC_FORM_CONTROL_TYPE_ARRAY;
    }
}