import {ValidatorFn, AsyncValidatorFn} from "@angular/forms";
import {DynamicFormControlModel, DynamicFormControlModelConfig, ClsConfig} from "./dynamic-form-control.model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {getValue} from "../utils";

export interface DynamicFormValueControlModelConfig extends DynamicFormControlModelConfig {

    asyncValidators?: Array<AsyncValidatorFn>;
    hint?: string;
    required?: boolean;
    tabIndex?: number;
    validators?: Array<ValidatorFn>;
    value?: boolean | number | string;
}

export abstract class DynamicFormValueControlModel<T> extends DynamicFormControlModel {

    asyncValidators: Array<AsyncValidatorFn>;
    hint: string | null;
    required: boolean;
    tabIndex: number | null;
    validators: Array<ValidatorFn>;
    value: T | null;
    valueChanges: BehaviorSubject<T>;

    constructor(config: DynamicFormValueControlModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.asyncValidators = getValue(config, "asyncValidators", []);
        this.hint = getValue(config, "hint", null);
        this.required = getValue(config, "required", false);
        this.tabIndex = getValue(config, "tabIndex", null);
        this.validators = getValue(config, "validators", []);

        this.valueChanges = new BehaviorSubject<T>(getValue(config, "value", null));
        this.valueChanges.subscribe((value: T) => this.value = value);
    }
}