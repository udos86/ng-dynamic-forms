import { FormHooks } from "@angular/forms/src/model";
import { Subject } from "rxjs/Subject";
import { DynamicFormControlRelationGroup } from "./dynamic-form-control-relation.model";
import { serializable, serialize } from "../decorator/serializable.decorator";
import { Utils } from "../utils/core.utils";
import { DynamicClsConfig, DynamicClsConfigFactory } from "../utils/cls.utils";

export type DynamicValidatorsConfig = { [validatorKey: string]: any | DynamicValidatorDescriptor };

export interface DynamicValidatorDescriptor {

    name: string;
    args: any;
}

export interface DynamicPathable {

    id?: string;
    index?: number | null;
    parent: DynamicPathable | null;
}

export interface DynamicFormControlClsConfig {

    element?: DynamicClsConfig;
    grid?: DynamicClsConfig;
}

export interface DynamicFormControlModelConfig {

    asyncValidators?: DynamicValidatorsConfig;
    disabled?: boolean;
    errorMessages?: DynamicValidatorsConfig;
    id: string;
    label?: string;
    relation?: DynamicFormControlRelationGroup[];
    updateOn?: FormHooks;
    validators?: DynamicValidatorsConfig;
}

export abstract class DynamicFormControlModel implements DynamicPathable {

    @serializable() asyncValidators: DynamicValidatorsConfig | null;
    @serializable() cls: any = {};
    @serializable("disabled") _disabled: boolean;
    disabledUpdates: Subject<boolean>;
    @serializable() errorMessages: DynamicValidatorsConfig | null;
    @serializable() id: string;
    @serializable() label: string | null;
    name: string;
    parent: DynamicPathable | null = null;
    @serializable() relation: DynamicFormControlRelationGroup[];
    @serializable() updateOn: FormHooks | null;
    @serializable() validators: DynamicValidatorsConfig | null;

    abstract readonly type: string;

    constructor(config: DynamicFormControlModelConfig, clsConfig: DynamicFormControlClsConfig = {}) {

        this.asyncValidators = config.asyncValidators || null;
        this.errorMessages = config.errorMessages || null;
        this.id = config.id;
        this.label = config.label || null;
        this.name = config.id;
        this.relation = Array.isArray(config.relation) ? config.relation : [];
        this.updateOn = typeof config.updateOn === "string" ? config.updateOn : null;
        this.validators = config.validators || null;

        this.cls.element = Utils.merge(clsConfig.element, DynamicClsConfigFactory.create());
        this.cls.grid = Utils.merge(clsConfig.grid, DynamicClsConfigFactory.create());

        this.disabled = typeof config.disabled === "boolean" ? config.disabled : false;
        this.disabledUpdates = new Subject<boolean>();
        this.disabledUpdates.subscribe((value: boolean) => this.disabled = value);
    }

    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(value: boolean) {
        this._disabled = value;
    }

    get hasErrorMessages(): boolean {
        return typeof this.errorMessages === "object" && this.errorMessages !== null;
    }

    toJSON() {
        return serialize(this);
    }

    static isValidatorDescriptor(value: any): boolean {

        if (value !== null && typeof value === "object") {
            return value.hasOwnProperty("name") && value.hasOwnProperty("args");
        }

        return false;
    }
}