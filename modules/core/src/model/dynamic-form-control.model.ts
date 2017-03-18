import { DynamicFormControlRelationGroup } from "./dynamic-form-control-relation.model";
import { Subject } from "rxjs/Subject";
import { serializable, serialize } from "../decorator/serializable.decorator";
import { getValue, isBoolean, isEmptyString } from "../utils";

export type DynamicValidatorsMap = {[validatorName: string]: any};

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
    id?: string;
    label?: string;
    relation?: DynamicFormControlRelationGroup[];
}

export abstract class DynamicFormControlModel {

    @serializable() cls: any = {};
    @serializable("disabled") _disabled: boolean;
    disabledUpdates: Subject<boolean>;
    @serializable() id: string;
    @serializable() label: string | null;
    @serializable() name: string;
    @serializable() relation: DynamicFormControlRelationGroup[];

    abstract readonly type: string;

    constructor(config: DynamicFormControlModelConfig, cls?: ClsConfig) {

        if (isEmptyString(config.id)) {
            throw new Error("string id must be specified for DynamicFormControlModel");
        }

        this.cls.element = getValue(cls, "element", {container: "", control: "", errors: "", hint: "", label: ""});
        this.cls.grid = getValue(cls, "grid", {container: "", control: "", errors: "", hint: "", label: ""});

        this._disabled = isBoolean(config.disabled) ? config.disabled : false;
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

    toJSON() {
        return serialize(this);
    }
}