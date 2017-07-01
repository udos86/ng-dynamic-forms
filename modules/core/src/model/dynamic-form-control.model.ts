import { DynamicFormControlRelationGroup } from "./dynamic-form-control-relation.model";
import { Subject } from "rxjs/Subject";
import { serializable, serialize } from "../decorator/serializable.decorator";
import { Utils } from "../core.utils";

export interface DynamicValidatorConfig {

    name: string;
    args: any;
}

export type DynamicValidatorsMap = { [validatorName: string]: any | DynamicValidatorConfig };

export interface Cls {

    container?: string;
    control?: string;
    errors?: string;
    hint?: string;
    label?: string;
}

export interface ClsConfig {

    element?: Cls;
    grid?: Cls;
}

export interface DynamicFormControlModelConfig {

    disabled?: boolean;
    errorMessages?: DynamicValidatorsMap;
    id?: string;
    label?: string;
    relation?: DynamicFormControlRelationGroup[];
}

export abstract class DynamicFormControlModel {

    @serializable() cls: any = {};
    @serializable("disabled") _disabled: boolean;
    disabledUpdates: Subject<boolean>;
    @serializable() errorMessages: DynamicValidatorsMap | null;
    @serializable() id: string;
    @serializable() label: string | null;
    @serializable() name: string;
    @serializable() relation: DynamicFormControlRelationGroup[];

    abstract readonly type: string;

    constructor(config: DynamicFormControlModelConfig, cls: ClsConfig = {}) {

        if (Utils.isEmptyString(config.id)) {
            throw new Error("string id must be specified for DynamicFormControlModel");
        }

        this.cls.element = Utils.merge(cls.element, {container: "", control: "", errors: "", hint: "", label: ""});
        this.cls.grid = Utils.merge(cls.grid, {container: "", control: "", errors: "", hint: "", label: ""});

        this._disabled = Utils.isBoolean(config.disabled) ? config.disabled : false;
        this.errorMessages = config.errorMessages || null;
        this.id = config.id;
        this.label = config.label || null;
        this.name = this.id;
        this.relation = Array.isArray(config.relation) ? config.relation : [];

        this.disabledUpdates = new Subject<boolean>();
        this.disabledUpdates.subscribe((value: boolean) => this.disabled = value);
    }

    set disabled(value: boolean) {
        this._disabled = value;
    }

    get disabled(): boolean {
        return this._disabled;
    }

    get hasErrorMessages(): boolean {
        return Utils.isDefined(this.errorMessages);
    }

    toJSON() {
        return serialize(this);
    }
}