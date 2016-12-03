import {Subject} from "rxjs/Subject";
import {
    DynamicFormControlModel,
    DynamicFormControlModelConfig,
    DynamicValidatorsConfig,
    ClsConfig
} from "./dynamic-form-control.model";
import {serializable} from "../decorator/serializable.decorator";
import {getValue, isDefined} from "../utils";

export type DynamicFormControlValue = boolean | number | string;

export type DynamicErrorMessages = {[validatorName: string]: string};

export interface DynamicFormValueControlModelConfig extends DynamicFormControlModelConfig {

    asyncValidators?: DynamicValidatorsConfig;
    errorMessages?: DynamicErrorMessages;
    hint?: string;
    required?: boolean;
    tabIndex?: number;
    validators?: DynamicValidatorsConfig;
    value?: DynamicFormControlValue;
}

export abstract class DynamicFormValueControlModel<T> extends DynamicFormControlModel {

    @serializable() asyncValidators: DynamicValidatorsConfig | null;
    @serializable() errorMessages: DynamicErrorMessages | null;
    @serializable() hint: string | null;
    @serializable() required: boolean;
    @serializable() tabIndex: number | null;
    @serializable() validators: DynamicValidatorsConfig | null;
    @serializable("value") _value: T | null;
    valueUpdates: Subject<T>;

    constructor(config: DynamicFormValueControlModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.asyncValidators = getValue(config, "asyncValidators", null);
        this.errorMessages = getValue(config, "errorMessages", null);
        this.hint = getValue(config, "hint", null);
        this.required = getValue(config, "required", false);
        this.tabIndex = getValue(config, "tabIndex", null);
        this.validators = getValue(config, "validators", null);
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

    get hasErrorMessages(): boolean {
        return isDefined(this.errorMessages);
    }
}