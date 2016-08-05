import {getValue, isEmptyString} from "../utils";

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
}

export abstract class DynamicFormControlModel {

    cls: any = {};
    disabled: boolean;
    id: string;
    label: string;
    name: string;
    type: string = null; // must be defined by child class

    constructor(config: DynamicFormControlModelConfig, cls?: ClsConfig) {

        if (isEmptyString(config.id)) {
            throw new Error("string id must be specified for DynamicFormControlModel");
        }

        this.cls.element = getValue(cls, "element", {container: "", control: "", label: ""});
        this.cls.grid = getValue(cls, "grid", {container: "", control: "", label: ""});

        this.disabled = getValue(config, "disabled", false);
        this.id = config.id;
        this.label = getValue(config, "label", null);
        this.name = this.id; // TODO remove any time soon due to redundancy
    }
}