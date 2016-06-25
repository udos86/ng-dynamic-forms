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

    constructor(config: {id: string}, cls?: {}) {

        super(config, cls);

        this.autoComplete = getValue(config, "autoComplete", DYNAMIC_FORM_INPUT_AUTOCOMPLETE_OFF);
        this.autoFocus = getValue(config, "autoFocus", false);
        this.maxLength = getValue(config, "maxLength", 100);
        this.placeholder = getValue(config, "placeholder", "");
        this.prefix = getValue(config, "prefix", null);
        this.readonly = getValue(config, "readonly", false);
        this.showLength = getValue(config, "showLength", false);
        this.suffix = getValue(config, "suffix", null);
    }
}