import {Validators} from "@angular/common";

export abstract class DynamicFormControlModel<T> {

    disabled: boolean;
    hideLabel: boolean;
    id: string;
    label: string;
    name: string;
    order: number;
    required: boolean;
    type: string = null; // must be defined by child class
    validators: Array<any>;
    validatorsAsync: Array<any>;
    value: T;

    constructor(configObject: {

        disabled?: boolean,
        hideLabel?: boolean,
        id?: string,
        label?: string,
        name?: string,
        order?: number,
        required?: boolean,
        validators?: Array<any>;
        validatorsAsync?: Array<any>,
        value?: T

    } = {}) {

        this.disabled = configObject.disabled === undefined ? false : configObject.disabled;
        this.hideLabel = configObject.hideLabel === undefined ? false : configObject.hideLabel;
        this.id = configObject.id || null;
        this.label = configObject.label || "";
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