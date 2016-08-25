import {ValidatorFn, AsyncValidatorFn} from "@angular/forms";
import {getValue} from "../utils";
import {DynamicFormControlModel, DynamicFormControlModelConfig, ClsConfig} from "./dynamic-form-control.model";

export interface DynamicFormValueControlModelConfig extends DynamicFormControlModelConfig {

    asyncValidators?: Array<AsyncValidatorFn>;
    help?: string;
    required?: boolean;
    validators?: Array<ValidatorFn>;
    value?: any;
}

export abstract class DynamicFormValueControlModel<T> extends DynamicFormControlModel {

    asyncValidators: Array<AsyncValidatorFn>;
    help: string;
    required: boolean;
    validators: Array<ValidatorFn>;
    value: T;

    constructor(config: DynamicFormValueControlModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.asyncValidators = getValue(config, "asyncValidators", []);
        this.help = getValue(config, "help", null);
        this.required = getValue(config, "required", false);
        this.validators = getValue(config, "validators", []);
        this.value = getValue(config, "value", null);
    }
}