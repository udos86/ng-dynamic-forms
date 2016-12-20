import { DynamicFormControlRelationGroup } from "./dynamic-form-control-relation.model";
import { Subject } from "rxjs/Subject";
import { serializable, serialize } from "../decorator/serializable.decorator";
import { getValue, isEmptyString } from "../utils";

export type DynamicValidatorsMap = {[validatorName: string]: any};

export interface Cls {

    container?: string;
    control?: string;
    errors?: string;
    label?: string;
    hint?: string;
}

export interface ClsConfig {

    element?: Cls;
    grid?: Cls;
}

export interface DynamicFormControlModelConfig {

    disabled?: boolean;
    id?: string;
    label?: string;
    relation?: Array<DynamicFormControlRelationGroup>;
}

export abstract class DynamicFormControlModel {

    @serializable() cls: any = {};
    @serializable("disabled") _disabled: boolean;
    disabledUpdates: Subject<boolean>;
    @serializable() id: string;
    @serializable() label: string | null;
    @serializable() name: string;
    @serializable() relation: Array<DynamicFormControlRelationGroup>;

    abstract readonly type: string;

    constructor(config: DynamicFormControlModelConfig, cls?: ClsConfig) {

        if (isEmptyString(config.id)) {
            throw new Error("string id must be specified for DynamicFormControlModel");
        }

        this.cls.element = getValue(cls, "element", {container: "", control: "", errors: "", label: "", hint: ""});
        this.cls.grid = getValue(cls, "grid", {container: "", control: "", errors: "", label: "", hint: ""});

        this._disabled = getValue(config, "disabled", false);
        this.id = config.id;
        this.label = getValue(config, "label", null);
        this.name = this.id;
        this.relation = getValue(config, "relation", []);

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