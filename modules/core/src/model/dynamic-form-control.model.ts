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

    constructor(modelConfig: {

        disabled?: boolean,
        help?: string,
        id?: string,
        label?: DynamicFormControlLabel,
        name?: string,
        required?: boolean,
        validators?: Array<any>;
        validatorsAsync?: Array<any>,
        value?: T

    } = {}, clsConfig: {

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
    } = {}) {

        this.disabled = getValue(modelConfig, "disabled", false);
        this.help = getValue(modelConfig, "help", null);
        this.id = getValue(modelConfig, "id", null);
        this.label = getValue(modelConfig, "label", {hidden: false, text: ""});
        this.name = getValue(modelConfig, "name", this.id || "");
        this.required = getValue(modelConfig, "required", false);
        this.validators = getValue(modelConfig, "validators", []);
        this.validatorsAsync = getValue(modelConfig, "validatorsAsync", []);
        this.value = getValue(modelConfig, "value", null);

        this.cls.container = getValue(clsConfig, "container", "");
        this.cls.control = getValue(clsConfig, "control", "");
        this.cls.grid = getValue(clsConfig, "grid", {container: "", control: "", label: ""});
        this.cls.label = getValue(clsConfig, "label", "");
        this.cls.validation = getValue(clsConfig, "validation", {invalid: "", valid: ""});

        if (this.required) {
            this.validators.push(Validators.required);
        }
    }
}