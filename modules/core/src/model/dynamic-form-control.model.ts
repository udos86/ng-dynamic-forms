import {getValue, isEmptyString} from "../utils";
import {DynamicFormControlRelationGroup} from "./dynamic-form-control-relation.model";

export interface Cls {

    container?: string;
    control?: string;
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

    cls: any = {};
    disabled: boolean;
    id: string;
    label: string | null;
    name: string;
    relation: Array<DynamicFormControlRelationGroup>;

    abstract readonly type: string;

    constructor(config: DynamicFormControlModelConfig, cls?: ClsConfig) {

        if (isEmptyString(config.id)) {
            throw new Error("string id must be specified for DynamicFormControlModel");
        }

        this.cls.element = getValue(cls, "element", {container: "", control: "", label: ""});
        this.cls.grid = getValue(cls, "grid", {container: "", control: "", label: ""});

        this.disabled = getValue(config, "disabled", false);
        this.id = config.id;
        this.label = getValue(config, "label", null);
        this.name = this.id;
        this.relation = getValue(config, "relation", []);
    }
}