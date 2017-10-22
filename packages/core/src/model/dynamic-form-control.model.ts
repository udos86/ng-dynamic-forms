import { DynamicFormControlRelationGroup } from "./dynamic-form-control-relation.model";
import { Subject } from "rxjs/Subject";
import { serializable, serialize } from "../decorator/serializable.decorator";
import { Utils } from "../utils/core.utils";
import { DynamicClsConfig, DynamicClsConfigFactory } from "../utils/cls.utils";
import { DynamicValidatorDescriptor } from "../utils/validation.utils";

export type DynamicValidatorsConfig = { [validatorKey: string]: any | DynamicValidatorDescriptor };

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
    id?: string;
    label?: string;
    relation?: DynamicFormControlRelationGroup[];
    updateOn?: string;
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
    @serializable() name: string;
    parent: DynamicPathable | null = null;
    @serializable() relation: DynamicFormControlRelationGroup[];
    @serializable() updateOn: string | null;
    @serializable() validators: DynamicValidatorsConfig | null;

    abstract readonly type: string;

    constructor(config: DynamicFormControlModelConfig, clsConfig: DynamicFormControlClsConfig = {}) {

        if (typeof config.id === "string" && config.id.length > 0) {
            this.id = config.id;
        } else {
            throw new Error("string id must be specified for DynamicFormControlModel");
        }

        this.cls.element = Utils.merge(clsConfig.element, DynamicClsConfigFactory.create());
        this.cls.grid = Utils.merge(clsConfig.grid, DynamicClsConfigFactory.create());

        this.asyncValidators = config.asyncValidators || null;
        this.errorMessages = config.errorMessages || null;
        this.label = config.label || null;
        this.name = this.id;
        this.relation = Array.isArray(config.relation) ? config.relation : [];
        this.updateOn = typeof config.updateOn === "string" ? config.updateOn : null;
        this.validators = config.validators || null;

        this._disabled = typeof config.disabled === "boolean" ? config.disabled : false;
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
}