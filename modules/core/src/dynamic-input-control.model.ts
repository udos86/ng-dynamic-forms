import {DynamicFormControlModel} from "./dynamic-form-control.model";

export const DYNAMIC_FORM_CONTROL_TYPE_INPUT = "INPUT";

export abstract class DynamicInputControlModel<T> extends DynamicFormControlModel<T> {

    autoComplete: boolean;
    autoFocus: boolean;
    inputType: string; // must be defined by child class
    maxLength: number;
    placeholder: string;
    prefix: string;
    showLength: boolean;
    suffix: string;
    
    constructor(configObject: {} = {}) {

        super(configObject);

        this.autoComplete = configObject["autoComplete"] === undefined ? true : configObject["autoComplete"];
        this.autoFocus = configObject["autoFocus"] === undefined ? true : configObject["autoFocus"];
        this.maxLength = configObject["maxLength"] || 100;
        this.placeholder = configObject["placeholder"] || "";
        this.prefix = configObject["prefix"] || null;
        this.showLength = configObject["showLength"] === undefined ? false : configObject["showLength"];
        this.suffix = configObject["suffix"] || null;
        this.type = DYNAMIC_FORM_CONTROL_TYPE_INPUT;
    }
}