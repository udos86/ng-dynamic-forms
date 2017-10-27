import { Subject } from "rxjs/Subject";
import {
    DynamicFormControlModel,
    DynamicFormControlModelConfig,
    DynamicFormControlClsConfig
} from "./dynamic-form-control.model";
import { serializable } from "../decorator/serializable.decorator";

export type DynamicFormControlValue = boolean | number | string | object | Date | Array<boolean | number | string | object>;

export interface DynamicFormValueControlModelConfig<T> extends DynamicFormControlModelConfig {

    hint?: string;
    required?: boolean;
    tabIndex?: number;
    value?: T;
}

export abstract class DynamicFormValueControlModel<T> extends DynamicFormControlModel {

    @serializable() hint: string | null;
    @serializable() required: boolean;
    @serializable() tabIndex: number | null;
    @serializable("value") _value: T | null;
    valueUpdates: Subject<T>;

    constructor(config: DynamicFormValueControlModelConfig<T>, clsConfig?: DynamicFormControlClsConfig) {

        super(config, clsConfig);

        this.hint = config.hint || null;
        this.required = typeof config.required === "boolean" ? config.required : false;
        this.tabIndex = config.tabIndex || null;

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