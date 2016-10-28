import {DynamicFormControlRelationGroup} from "./dynamic-form-control-relation.model";
import {Subject} from "rxjs/Subject";
import {serializable} from "../decorator/serialize.decorator";
import {getValue, isEmptyString, serialize} from "../utils";

export interface Cls {

    container?: string;
    control?: string;
    errors?: string;
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

        this.cls.element = getValue(cls, "element", {container: "", control: "", errors: "", label: ""});
        this.cls.grid = getValue(cls, "grid", {container: "", control: "", errors: "", label: ""});

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