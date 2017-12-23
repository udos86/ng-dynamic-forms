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
    hidden?: boolean;
    errorMessages?: DynamicValidatorsMap;
    id?: string;
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
    @serializable("disabled") _disabled: boolean;
    @serializable("hidden") _hidden: boolean;
    disabledUpdates: Subject<boolean>;
    @serializable() errorMessages: DynamicValidatorsConfig | null;
    hiddenUpdates: Subject<boolean>;
    @serializable() errorMessages: DynamicValidatorsMap | null;
    @serializable() id: string;
    @serializable() label: string | null;
    @serializable() layout: DynamicFormControlLayout | null;
    @serializable() name: string;
    parent: DynamicPathable | null = null;
    @serializable() relation: DynamicFormControlRelationGroup[];
    @serializable() updateOn: FormHooks | null;
    @serializable() validators: DynamicValidatorsConfig | null;

    /*@deprecated*/ readonly cls: DynamicFormControlLayout | null;

    abstract readonly type: string;

    constructor(config: DynamicFormControlModelConfig, layout: DynamicFormControlLayout | null = null) {

        this.asyncValidators = config.asyncValidators || null;
        this.errorMessages = config.errorMessages || null;
        this.id = config.id;
        this.label = config.label || null;
        this.layout = layout;
        this.name = config.name || config.id;
        this.relation = Array.isArray(config.relation) ? config.relation : [];
        this.updateOn = typeof config.updateOn === "string" ? config.updateOn : null;
        this.validators = config.validators || null;

        this.disabled = typeof config.disabled === "boolean" ? config.disabled : false;
        this.disabledUpdates = new Subject<boolean>();
        this.disabledUpdates.subscribe((value: boolean) => this.disabled = value);

        this.hiddenUpdates = new Subject<boolean>();
        this.hiddenUpdates.subscribe((value: boolean) => this.hidden = value);
    }

    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(value: boolean) {
        this._disabled = value;
    }

    get hidden(): boolean {
        return this._hidden;
    }

    set hidden(value: boolean) {
        this._hidden = value;
    }

    get hasErrorMessages(): boolean {
        return typeof this.errorMessages === "object" && this.errorMessages !== null;
    }

    toJSON() {
        return serialize(this);
    }
}