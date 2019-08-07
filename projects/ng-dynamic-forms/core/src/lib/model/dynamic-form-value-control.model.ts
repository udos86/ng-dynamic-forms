import { BehaviorSubject, Observable } from "rxjs";
import { DynamicFormControlModel, DynamicFormControlModelConfig } from "./dynamic-form-control.model";
import { DynamicFormControlLayout } from "./misc/dynamic-form-control-layout.model";
import { serializable } from "../decorator/serializable.decorator";
import { isBoolean, isObject } from "../utils/core.utils";

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
    @serializable("value") private _value: T | null;

    private readonly value$: BehaviorSubject<T>;

    readonly valueChanges: Observable<T>;

    protected constructor(config: DynamicFormValueControlModelConfig<T>, layout?: DynamicFormControlLayout) {

        super(config, layout);

        this.additional = isObject(config.additional) ? config.additional : null;
        this.hint = config.hint || null;
        this.required = isBoolean(config.required) ? config.required : false;
        this.tabIndex = config.tabIndex || null;

        this.value$ = new BehaviorSubject(config.value !== null && config.value !== undefined ? config.value : null);
        this.value$.subscribe(value => this._value = value);
        this.valueChanges = this.value$.asObservable();
    }

    get value(): T | null {
        return this.value$.getValue();
    }

    set value(value: T | null) {
        this.value$.next(value);
    }

    getAdditional(key: string, defaultValue: any | null | undefined = undefined): any {
        return this.additional !== null && this.additional.hasOwnProperty(key) ? this.additional[key] : defaultValue;
    }
}
