import {Validators} from "@angular/forms";
import {getValue} from "../utils";

export interface DynamicFormControlLabel {
    
    hidden?: boolean;
    text?: string;
}

export interface DynamicFormControlGridCls {
    
    container?: string;
    control?: string;
    label?: string;
}

export interface DynamicFormControlCls {
    
    control?: string;
    grid?: DynamicFormControlGridCls;
    invalid?: string;
    label?: string;
    valid?: string;
}

export abstract class DynamicFormControlModel<T> {

    cls: DynamicFormControlCls;
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

    constructor(configObject: {

        cls?: DynamicFormControlCls,
        disabled?: boolean,
        help?: string,
        id?: string,
        label?: DynamicFormControlLabel,
        name?: string,
        required?: boolean,
        validators?: Array<any>;
        validatorsAsync?: Array<any>,
        value?: T

    } = {}) {

        this.cls = getValue(configObject, "cls", {
            
            control: "",
            grid: {
                container: "",
                control: "",
                label: ""
            },
            invalid: "",
            label: "",
            valid: ""
        });
        
        this.disabled = getValue(configObject, "disabled", false);
        this.help = getValue(configObject, "help", null);
        this.id = getValue(configObject, "id", null);
        this.label = getValue(configObject, "label", {hidden: false, text: ""});
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