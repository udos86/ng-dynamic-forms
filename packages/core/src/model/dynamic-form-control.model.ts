import { FormHooks } from "@angular/forms/src/model";
import { Subject } from "rxjs/Subject";
import { DynamicFormControlLayout } from "./misc/dynamic-form-control-layout.model";
import { DynamicPathable } from "./misc/dynamic-form-control-path.model";
import { DynamicFormControlRelationGroup } from "./misc/dynamic-form-control-relation.model";
import { DynamicValidatorsConfig } from "./misc/dynamic-form-control-validation.model";
import { serializable, serialize } from "../decorator/serializable.decorator";

export interface DynamicFormControlModelConfig {

    asyncValidators?: DynamicValidatorsConfig;
    disabled?: boolean;
    errorMessages?: DynamicValidatorsConfig;
    id: string;
    label?: string;
    name?: string;
    relation?: DynamicFormControlRelationGroup[];
    updateOn?: FormHooks;
    validators?: DynamicValidatorsConfig;
}

export abstract class DynamicFormControlModel implements DynamicPathable {

    @serializable() asyncValidators: DynamicValidatorsConfig | null;
    @serializable() cls: DynamicFormControlLayout | null;
    @serializable("disabled") _disabled: boolean;
    disabledUpdates: Subject<boolean>;
    @serializable() errorMessages: DynamicValidatorsConfig | null;
    @serializable() id: string;
    @serializable() label: string | null;
    @serializable() name: string;
    parent: DynamicPathable | null = null;
    @serializable() relation: DynamicFormControlRelationGroup[];
    @serializable() updateOn: FormHooks | null;
    @serializable() validators: DynamicValidatorsConfig | null;

    abstract readonly type: string;

    constructor(config: DynamicFormControlModelConfig, layout: DynamicFormControlLayout | null = null) {

        this.asyncValidators = config.asyncValidators || null;
        this.cls = layout;
        this.errorMessages = config.errorMessages || null;
        this.id = config.id;
        this.label = config.label || null;
        this.name = config.name || config.id;
        this.relation = Array.isArray(config.relation) ? config.relation : [];
        this.updateOn = typeof config.updateOn === "string" ? config.updateOn : null;
        this.validators = config.validators || null;

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
}