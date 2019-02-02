import { FormHooks } from "@angular/forms/src/model";
import { Subject } from "rxjs";
import { DynamicFormControlLayout } from "./misc/dynamic-form-control-layout.model";
import { DynamicPathable } from "./misc/dynamic-form-control-path.model";
import { DynamicFormControlRelationGroup } from "./misc/dynamic-form-control-relation.model";
import { DynamicValidatorsConfig } from "./misc/dynamic-form-control-validation.model";
import { serializable, serialize } from "../decorator/serializable.decorator";
import { isBoolean, isObject, isString } from "../utils/core.utils";

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
    relation?: DynamicFormControlRelationGroup[];
    updateOn?: FormHooks;
    validators?: DynamicValidatorsConfig;
}

export abstract class DynamicFormControlModel implements DynamicPathable {

    @serializable() asyncValidators: DynamicValidatorsConfig | null;
    @serializable("disabled") _disabled: boolean;
    disabledUpdates: Subject<boolean>;
    @serializable() errorMessages: DynamicValidatorsConfig | null;
    @serializable() hidden: boolean;
    @serializable() id: string;
    @serializable() label: string | null;
    @serializable() labelTooltip: string | null;
    @serializable() controlTooltip: string | null;
    @serializable() layout: DynamicFormControlLayout | null;
    @serializable() name: string;
    parent: DynamicPathable | null = null;
    @serializable() relation: DynamicFormControlRelationGroup[];
    @serializable() updateOn: FormHooks | null;
    requiredUpdates: Subject<boolean>;
    @serializable() validators: DynamicValidatorsConfig | null;

    abstract readonly type: string;

    protected constructor(config: DynamicFormControlModelConfig, layout: DynamicFormControlLayout | null = null) {

        this.asyncValidators = config.asyncValidators || null;
        this.errorMessages = config.errorMessages || null;
        this.hidden = isBoolean(config.hidden) ? config.hidden : false;
        this.id = config.id;
        this.label = config.label || null;
        this.labelTooltip = config.labelTooltip || null;
        this.controlTooltip = config.controlTooltip || null;
        this.layout = layout;
        this.name = config.name || config.id;
        this.relation = Array.isArray(config.relation) ? config.relation : [];
        this.updateOn = isString(config.updateOn) ? config.updateOn : null;
        this.validators = config.validators || null;

        this.disabled = isBoolean(config.disabled) ? config.disabled : false;
        this.disabledUpdates = new Subject<boolean>();
        this.disabledUpdates.subscribe(disabled => this.disabled = disabled);
        this.requiredUpdates = new Subject<boolean>();
        this.requiredUpdates.subscribe(required => {
            if (required) {
                this.validators ?  this.validators = { ...this.validators, required: null} : this.validators = {required: null};
            } else {
                this.validators ? delete this.validators["required"] : undefined;
            }
        });
    }

    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(value: boolean) {
        this._disabled = value;
    }

    get hasErrorMessages(): boolean {
        return isObject(this.errorMessages);
    }

    toJSON() {
        return serialize(this);
    }
}