import {DynamicFormAbstractControlModel} from "./dynamic-form-abstract-control.model";
import {DynamicFormControlModel} from "@ng2-dynamic-forms/core";
import {IFormGroupModel} from "./dynamic-form.model";
import {getValue} from "../utils";

export const DYNAMIC_FORM_CONTROL_TYPE_ARRAY = "ARRAY";

export class DynamicFormArrayModel extends DynamicFormAbstractControlModel implements IFormGroupModel {

    initialCount: number;
    items: Array<DynamicFormControlModel<any>>;
    
    constructor(config: {} = {}, cls?: {}) {

        super(config, cls);

        this.initialCount = getValue(config, "initialCount", 1);
        this.items = getValue(config, "items", []);
        this.type = DYNAMIC_FORM_CONTROL_TYPE_ARRAY;
    }
}