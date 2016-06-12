import {Validators} from "@angular/common";

export interface DynamicFormControlLabel {

    cls?: string;
    hidden?: boolean;
    text?: string;
}

export abstract class DynamicFormControlModel<T> {

    id: string;
    label: DynamicFormControlLabel = {cls: null, hidden: false, text: ""};
    disabled: boolean;
    name: string;
    order: number;
    required: boolean;
    type: string = null; // must be defined by child class
    validators: Array<any>;
    validatorsAsync: Array<any>;
    value: T;

    constructor(configObject: {

        disabled?: boolean,
        id?: string,
        label?: DynamicFormControlLabel,
        name?: string,
        order?: number,
        required?: boolean,
        validators?: Array<any>;
        validatorsAsync?: Array<any>,
        value?: T

    } = {}) {

        this.disabled = configObject.disabled === undefined ? false : configObject.disabled;
        this.id = configObject.id || null;
        this.label = configObject.label === undefined ? this.label : Object.assign(this.label, configObject.label);
        this.name = configObject.name || configObject.id || "";
        this.order = configObject.order === undefined ? 1 : configObject.order;
        this.required = configObject.required === undefined ? false : configObject.required;
        this.validators = configObject.validators || [];
        this.validatorsAsync = configObject.validatorsAsync || [];
        this.value = configObject.value === undefined ? null : configObject.value;
        
        if (this.required) {
            this.validators.push(Validators.required);
        }
    }
}