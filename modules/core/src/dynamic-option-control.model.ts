import {DynamicFormControlModel} from "./dynamic-form-control.model";
import {getValue} from "./utils";

export interface DynamicFormOption<T> {

    text: string;
    value: T;
    disabled?: boolean;
    //selected?: boolean;
}

export abstract class DynamicOptionControlModel<T> extends DynamicFormControlModel<T> {

    options: Array<DynamicFormOption<T>>;

    constructor(configObject: {} = {}) {

        super(configObject);
        
        this.options = getValue(configObject, "options", []);
    }
}