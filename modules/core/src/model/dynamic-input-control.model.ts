import {DynamicFormControlModel} from "./dynamic-form-control.model";
import {getValue} from "../utils";

export const DYNAMIC_FORM_INPUT_AUTOCOMPLETE_OFF = "off";
export const DYNAMIC_FORM_INPUT_AUTOCOMPLETE_ON = "on";

export abstract class DynamicInputControlModel<T> extends DynamicFormControlModel<T> {

    autoComplete: boolean;
    autoFocus: boolean;
    maxLength: number;
    placeholder: string;
    prefix: string;
    readonly: boolean;
    showLength: boolean;
    suffix: string;

    constructor(configObject: {} = {}) {

        super(configObject);

        this.autoComplete = getValue(configObject, "autoComplete", DYNAMIC_FORM_INPUT_AUTOCOMPLETE_OFF);
        this.autoFocus = getValue(configObject, "autoFocus", false);
        this.maxLength = getValue(configObject, "maxLength", 100);
        this.placeholder = getValue(configObject, "placeholder", "");
        this.prefix = getValue(configObject, "prefix", null);
        this.readonly = getValue(configObject, "readonly", false);
        this.showLength = getValue(configObject, "showLength", false);
        this.suffix = getValue(configObject, "suffix", null);
    }
}