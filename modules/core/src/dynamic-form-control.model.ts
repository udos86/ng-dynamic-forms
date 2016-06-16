import {Validators} from "@angular/common";
import {getValue} from "./utils";

export interface DynamicFormControlLabel {

    cls?: string;
    hidden?: boolean;
    text?: string;
}

export abstract class DynamicFormControlModel<T> {

    cls: string;
    disabled: boolean;
    id: string;
    label: DynamicFormControlLabel;
    name: string;
    required: boolean;
    type: string = null; // must be defined by child class
    validators: Array<any>;
    validatorsAsync: Array<any>;
    value: T;

    constructor(configObject: {

        cls?: string,
        disabled?: boolean,
        id?: string,
        label?: DynamicFormControlLabel,
        name?: string,
        required?: boolean,
        validators?: Array<any>;
        validatorsAsync?: Array<any>,
        value?: T

    } = {}) {

        this.cls = getValue(configObject, "cls", null);
        this.disabled = getValue(configObject, "disabled", false);
        this.id = getValue(configObject, "id", null);
        this.label = getValue(configObject, "label", {cls: null, hidden: false, text: ""});
        this.name = getValue(configObject, "name", this.id || "");
        this.required = getValue(configObject, "required", false);
        this.validators = getValue(configObject, "validators", []);
        this.validatorsAsync = getValue(configObject, "validatorsAsync", []);
        this.value = getValue(configObject, "value", null);
        
        if (this.required) {
            this.validators.push(Validators.required);
        }
    }
}