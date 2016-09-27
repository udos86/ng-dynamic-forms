import {ValidatorFn, AsyncValidatorFn} from "@angular/forms";
import {Subject} from "rxjs/Subject";
import {DynamicFormControlModel, DynamicFormControlModelConfig, ClsConfig} from "./dynamic-form-control.model";
import {serializable} from "../decorator/serialize.decorator";
import {getValue, serialize} from "../utils";

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
    @serializable() hint: string | null;
    @serializable() required: boolean;
    @serializable() tabIndex: number | null;
    validators: Array<ValidatorFn>;
    @serializable("value") _value: T | null;
    valueUpdates: Subject<T>;

    constructor(config: DynamicFormValueControlModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.asyncValidators = getValue(config, "asyncValidators", []);
        this.hint = getValue(config, "hint", null);
        this.required = getValue(config, "required", false);
        this.tabIndex = getValue(config, "tabIndex", null);
        this.validators = getValue(config, "validators", []);
        this._value = getValue(config, "value", null);

        this.valueUpdates = new Subject<T>();
        this.valueUpdates.subscribe((value: T) => this.value = value);
    }

    set value(value: T) {
        this._value = value;
    }

    get value(): T {
        return this._value;
    }

    toJSON() {
        return Object.getPrototypeOf(this) ? Object.assign(super.toJSON(), serialize(this)) : serialize(this);
    }
}