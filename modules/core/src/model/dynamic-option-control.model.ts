import {DynamicFormControlModel} from "./dynamic-form-control.model";
import {getValue} from "../utils";

export interface DynamicFormOption<T> {

    text: string;
    value: T;
    disabled?: boolean;
    //selected?: boolean;
}

export interface DynamicFormOptionGroup<T> {

    label: string;
    options: Array<DynamicFormOption<T>>;
}

export abstract class DynamicOptionControlModel<T> extends DynamicFormControlModel<T> {

    options: Array<DynamicFormOption<T>>;
    //optionGroups: Array<DynamicFormOptionGroup<T>>;

    constructor(config: {} = {}, cls?: {}) {

        super(config, cls);
        
        this.options = getValue(config, "options", []);
    }
}