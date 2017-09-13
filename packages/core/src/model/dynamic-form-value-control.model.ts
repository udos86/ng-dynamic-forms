import { Subject } from "rxjs/Subject";
import {
    DynamicFormControlModel,
    DynamicFormControlModelConfig,
    DynamicValidatorsMap,
    ClsConfig
} from "./dynamic-form-control.model";
import { serializable } from "../decorator/serializable.decorator";

export type DynamicFormControlValue = boolean | number | string | Date | Array<boolean | number | string>;

export interface DynamicFormValueControlModelConfig<T> extends DynamicFormControlModelConfig {

    asyncValidators?: DynamicValidatorsMap;
    hint?: string;
    required?: boolean;
    tabIndex?: number;
    validators?: DynamicValidatorsMap;
    value?: T;
}

export abstract class DynamicFormValueControlModel<T> extends DynamicFormControlModel {

    @serializable() asyncValidators: DynamicValidatorsMap | null;
    @serializable() hint: string | null;
    @serializable() required: boolean;
    @serializable() tabIndex: number | null;
    @serializable() validators: DynamicValidatorsMap | null;
    @serializable("value") _value: T | null;
    valueUpdates: Subject<T>;

    constructor(config: DynamicFormValueControlModelConfig<T>, cls?: ClsConfig) {

        super(config, cls);

        this.asyncValidators = config.asyncValidators || null;
        this.hint = config.hint || null;
        this.required = typeof config.required === "boolean" ? config.required : false;
        this.tabIndex = config.tabIndex || null;
        this.validators = config.validators || null;
        this._value = config.value || null;

        this.valueUpdates = new Subject<T>();
        this.valueUpdates.subscribe((value: T) => this.value = value);
    }

    set value(value: T | null) {
        this._value = value;
    }

    get value(): T | null {
        return this._value;
    }
}