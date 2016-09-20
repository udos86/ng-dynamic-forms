import {FormGroup} from "@angular/forms";
import {getValue, isEmptyString} from "../utils";
import {DynamicFormControlDependencyGroup} from "./dynamic-form-control-dependency.model";

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
    depends?: Array<DynamicFormControlDependencyGroup>;
    id?: string;
    label?: string;
}

export abstract class DynamicFormControlModel {

    cls: any = {};
    disabled: boolean;
    depends: Array<DynamicFormControlDependencyGroup>;
    id: string;
    label: string | null;
    name: string;

    abstract readonly type: string;

    constructor(config: DynamicFormControlModelConfig, cls?: ClsConfig) {

        if (isEmptyString(config.id)) {
            throw new Error("string id must be specified for DynamicFormControlModel");
        }

        this.cls.element = getValue(cls, "element", {container: "", control: "", label: ""});
        this.cls.grid = getValue(cls, "grid", {container: "", control: "", label: ""});

        this.depends = getValue(config, "depends", []);
        this.disabled = getValue(config, "disabled", false);
        this.id = config.id;
        this.label = getValue(config, "label", null);
        this.name = this.id;
    }
}