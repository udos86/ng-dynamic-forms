import {DynamicFormAbstractControlModel} from "./dynamic-form-abstract-control.model";
import {DynamicFormControlModel} from "@ng2-dynamic-forms/core";
import {IDynamicFormModel} from "./dynamic-form.model";
import {getValue} from "../utils";

export const DYNAMIC_FORM_CONTROL_TYPE_ARRAY = "ARRAY";

export class DynamicFormArrayModel extends DynamicFormAbstractControlModel implements IDynamicFormModel {

    items: Array<DynamicFormControlModel<any>>;
    
    constructor(config: {} = {}, cls?: {}) {

        super(config, cls);

        this.items = getValue(config, "items", []);
        this.type = DYNAMIC_FORM_CONTROL_TYPE_ARRAY;
    }
}