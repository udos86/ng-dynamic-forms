import {getValue} from "../utils";
import {DynamicFormControlModel, DynamicFormControlModelConfig, ClsConfig} from "./dynamic-form-control.model";

export interface DynamicFormValueControlModelConfig extends DynamicFormControlModelConfig {

    help?: string;
    required?: boolean;
    validators?: Array<any>;
    validatorsAsync?: Array<any>;
    value?: any;
}

export abstract class DynamicFormValueControlModel<T> extends DynamicFormControlModel {

    help: string;
    required: boolean;
    validators: Array<any>;
    validatorsAsync: Array<any>;
    value: T;

    constructor(config: DynamicFormValueControlModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.help = getValue(config, "help", null);
        this.required = getValue(config, "required", false);
        this.validators = getValue(config, "validators", []);
        this.validatorsAsync = getValue(config, "validatorsAsync", []);
        this.value = getValue(config, "value", null);
    }
}