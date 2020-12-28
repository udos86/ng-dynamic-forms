import { BehaviorSubject, Observable } from "rxjs";
import { DynamicFormControlLayout } from "./misc/dynamic-form-control-layout.model";
import { DynamicPathable } from "./misc/dynamic-form-control-path.model";
import { DynamicFormControlRelation } from "./misc/dynamic-form-control-relation.model";
import { DynamicFormHook, DynamicValidatorsConfig } from "./misc/dynamic-form-control-validation.model";
import { serializable, serialize } from "../decorator/serializable.decorator";
import { isBoolean, isObject, isString } from "../utils/core.utils";
import {DynamicFormControlDataConfig} from './misc/dynamic-form-control-data.model';

export interface DynamicFormControlModelConfig {

    asyncValidators?: DynamicValidatorsConfig;
    disabled?: boolean;
    errorMessages?: DynamicValidatorsConfig;
    hidden?: boolean;
    id: string;
    label?: string;
    labelTooltip?: string;
    controlTooltip?: string;
    name?: string;
    relations?: DynamicFormControlRelation[];
    updateOn?: DynamicFormHook;
    validators?: DynamicValidatorsConfig;
    dataProvider?: DynamicFormControlDataConfig;
}

export abstract class DynamicFormControlModel implements DynamicPathable {

    @serializable() asyncValidators: DynamicValidatorsConfig | null;
    @serializable("disabled") _disabled: boolean;
    @serializable() errorMessages: DynamicValidatorsConfig | null;
    @serializable() hidden: boolean;
    @serializable() id: string;
    @serializable() label: string | null;
    @serializable() labelTooltip: string | null;
    @serializable() controlTooltip: string | null;
    @serializable() layout: DynamicFormControlLayout | null;
    @serializable() name: string;
    parent: DynamicPathable | null = null;
    @serializable() relations: DynamicFormControlRelation[];
    @serializable() updateOn: DynamicFormHook | null;
    @serializable() validators: DynamicValidatorsConfig | null;
    @serializable() dataProvider: DynamicFormControlDataConfig | null;

    private readonly disabled$: BehaviorSubject<boolean>;

    readonly disabledChanges: Observable<boolean>;

    abstract readonly type: string;

    protected constructor(config: DynamicFormControlModelConfig, layout: DynamicFormControlLayout | null = null) {

        this.asyncValidators = config.asyncValidators ?? null;
        this.errorMessages = config.errorMessages ?? null;
        this.hidden = isBoolean(config.hidden) ? config.hidden : false;
        this.id = config.id;
        this.label = config.label ?? null;
        this.labelTooltip = config.labelTooltip ?? null;
        this.controlTooltip = config.controlTooltip ?? null;
        this.layout = layout;
        this.name = config.name ?? config.id;
        this.relations = Array.isArray(config.relations) ? config.relations : [];
        this.updateOn = isString(config.updateOn) ? config.updateOn : null;
        this.validators = config.validators ?? null;

        this.disabled$ = new BehaviorSubject(isBoolean(config.disabled) ? config.disabled : false);
        this.disabled$.subscribe(disabled => this._disabled = disabled);
        this.disabledChanges = this.disabled$.asObservable();
        this.dataProvider = config.dataProvider || null;
    }

    get disabled(): boolean {
        return this.disabled$.getValue();
    }

    set disabled(disabled: boolean) {
        this.disabled$.next(disabled);
    }

    get hasErrorMessages(): boolean {
        return isObject(this.errorMessages);
    }

    toJSON() {
        return serialize(this);
    }
}
