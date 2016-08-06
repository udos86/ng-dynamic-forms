import {ClsConfig} from "./dynamic-form-control.model";
import {DynamicFormValueControlModel, DynamicFormValueControlModelConfig} from "./dynamic-form-value-control.model";
import {getValue} from "../utils";
import {} from "./dynamic-form-value-control.model";

export interface DynamicFormOption<T> {

    disabled?: boolean;
    label?: string;
    value: T;
    //selected?: boolean;
}

export interface DynamicOptionControlModelConfig extends DynamicFormValueControlModelConfig {

    options?: Array<DynamicFormOption<any>>;
}

export abstract class DynamicOptionControlModel<T> extends DynamicFormValueControlModel<T> {

    options: Array<DynamicFormOption<T>>;

    constructor(config: DynamicOptionControlModelConfig, cls?: ClsConfig) {

        super(config, cls);
        
        this.options = getValue(config, "options", []);
    }
}