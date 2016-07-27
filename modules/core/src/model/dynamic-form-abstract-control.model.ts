import {getValue, isEmptyString} from "../utils";

export interface Cls {

    container: string;
    control: string;
    label: string;
}

export abstract class DynamicFormAbstractControlModel {

    cls: any = {};
    disabled: boolean;
    id: string;
    name: string;
    type: string = null; // must be defined by child class

    constructor(config: {id?: string}, cls?: {element?: Cls, grid?: Cls}) {

        if (isEmptyString(config.id)) {
            throw new Error("string id must be specified for DynamicFormControlModel");
        }

        this.cls.element = getValue(cls, "element", {container: "", control: "", label: ""});
        this.cls.grid = getValue(cls, "grid", {container: "", control: "", label: ""});

        this.disabled = getValue(config, "disabled", false);
        this.id = config.id;
        this.name = this.id; // TODO remove any time soon due to redundancy
    }
}