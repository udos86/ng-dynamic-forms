import {Validators} from "@angular/forms";
import {getValue, isEmptyString} from "../utils";

export interface Cls {

    container: string;
    control: string;
    label: string;
}

export abstract class DynamicFormControlModel<T> {

    cls: any = {};
    disabled: boolean;
    help: string;
    id: string;
    label: string;
    name: string;
    required: boolean;
    type: string = null; // must be defined by child class
    validators: Array<any>;
    validatorsAsync: Array<any>;
    value: T;

    constructor(config: {

        disabled?: boolean,
        help?: string,
        id?: string,
        label?: string,
        required?: boolean,
        validators?: Array<any>;
        validatorsAsync?: Array<any>,
        value?: T

    }, cls?: {

        element?: Cls
        grid?: Cls,
    }) {

        if (isEmptyString(config.id)) {
            throw new Error("string id must be specified for DynamicFormControlModel");
        }

        this.cls.element = getValue(cls, "element", {container: "", control: "", label: ""});
        this.cls.grid = getValue(cls, "grid", {container: "", control: "", label: ""});

        this.disabled = getValue(config, "disabled", false);
        this.help = getValue(config, "help", null);
        this.id = config.id;
        this.label = getValue(config, "label", null);
        this.name = this.id; // TODO remove any time soon due to redundancy
        this.required = getValue(config, "required", false);
        this.validators = getValue(config, "validators", []);
        this.validatorsAsync = getValue(config, "validatorsAsync", []);
        this.value = getValue(config, "value", null);
    }
}