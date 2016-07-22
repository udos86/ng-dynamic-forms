import {DynamicFormControlModel} from "./dynamic-form-control.model";
import {getValue} from "../utils";

export interface DynamicFormOption<T> {

    disabled?: boolean;
    label?: string;
    value: T;
    //selected?: boolean;
}

export abstract class DynamicOptionControlModel<T> extends DynamicFormControlModel<T> {

    options: Array<DynamicFormOption<T>>;

    constructor(config: {} = {}, cls?: {}) {

        super(config, cls);
        
        this.options = getValue(config, "options", []);
    }
}