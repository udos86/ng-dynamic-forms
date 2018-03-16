import { Subject } from "rxjs/Subject";
import { DynamicFormControlModel, DynamicFormControlModelConfig } from "./dynamic-form-control.model";
import { DynamicFormControlLayout } from "./misc/dynamic-form-control-layout.model";
import { serializable } from "../decorator/serializable.decorator";

export type DynamicFormControlValue = boolean | number | string | object | Date |
    Array<boolean | number | string | object>;

export interface DynamicFormValueControlModelConfig<T> extends DynamicFormControlModelConfig {

    additional?: { [key: string]: any };
    hint?: string;
    required?: boolean;
    tabIndex?: number;
    value?: T;
}

export abstract class DynamicFormValueControlModel<T> extends DynamicFormControlModel {

    @serializable() additional: { [key: string]: any } | null;
    @serializable() hint: string | null;
    @serializable() required: boolean;
    @serializable() tabIndex: number | null;
    @serializable("value") _value: T | null;
    valueUpdates: Subject<T>;

    constructor(config: DynamicFormValueControlModelConfig<T>, layout?: DynamicFormControlLayout) {

        super(config, layout);

        this.additional = typeof config.additional === "object" && config.additional !== null ? config.additional : null;
        this.hint = config.hint || null;
        this.required = typeof config.required === "boolean" ? config.required : false;
        this.tabIndex = config.tabIndex || null;

        this.value = config.value !== null && config.value !== undefined ? config.value : null;
        this.valueUpdates = new Subject<T>();
        this.valueUpdates.subscribe((value: T) => this.value = value);
    }

    set value(value: T | null) {
        this._value = value;
    }

    get value(): T | null {
        return this._value;
    }

    getAdditional(key: string, defaultValue: any = null): any {
        return this.additional !== null && this.additional.hasOwnProperty(key) ? this.additional[key] : defaultValue;
    }
}