import {Validators} from "@angular/forms";
import {getValue} from "../utils";

export interface DynamicFormControlLabel {

    hidden?: boolean;
    text?: string;
}

export abstract class DynamicFormControlModel<T> {

    cls: any = {};
    disabled: boolean;
    help: string;
    id: string;
    label: DynamicFormControlLabel;
    name: string;
    required: boolean;
    type: string = null; // must be defined by child class
    validators: Array<any>;
    validatorsAsync: Array<any>;
    value: T;

    constructor(config: {

        disabled?: boolean,
        help?: string,
        id: string,
        label?: DynamicFormControlLabel,
        name?: string,
        required?: boolean,
        validators?: Array<any>;
        validatorsAsync?: Array<any>,
        value?: T

    }, cls?: {

        container?: string
        control?: string,
        grid?: {
            container?: string,
            control?: string,
            label?: string
        },
        label?: string,
        validation?: {
            invalid?: string,
            valid?: string
        }
    }) {

        if (config.id) {
            this.id = config.id
        } else {
            throw("id must be specified for DynamicFormControlModel");
        }

        this.disabled = getValue(config, "disabled", false);
        this.help = getValue(config, "help", null);
        this.label = getValue(config, "label", {hidden: false, text: ""});
        this.name = getValue(config, "name", this.id || "");
        this.required = getValue(config, "required", false);
        this.validators = getValue(config, "validators", []);
        this.validatorsAsync = getValue(config, "validatorsAsync", []);
        this.value = getValue(config, "value", null);

        if (this.required) {
            this.validators.push(Validators.required);
        }

        this.cls.container = getValue(cls, "container", "");
        this.cls.control = getValue(cls, "control", "");
        this.cls.grid = getValue(cls, "grid", {container: "", control: "", label: ""});
        this.cls.label = getValue(cls, "label", "");
        this.cls.validation = getValue(cls, "validation", {invalid: "", valid: ""});
    }
}